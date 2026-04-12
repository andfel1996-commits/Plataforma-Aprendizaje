// Cargar las variables de entorno
import 'dotenv/config';
// Importación del driver de PostGreSQL
import pkg from 'pg';
const { Pool } = pkg;
// Chalk colores en la terminal
import chalk from 'chalk';

class ConexionDB{
    // Definimos las propiedades y las vamos a dejar privadas
    #pool;           // Instancia del Pool pg
    #maxReintentos;  // Número máximo de intentos de conexión al arrancar
    #delayReintento; // Milisegundos entre cada reintento
    #cb;             // Estado del Circuit Breaker

    // Creamos el constructor
    constructor(){
        // Parámetros de reintento leídos desde el .env
        this.#maxReintentos = Number(process.env.DB_MAX_REINTENTOS) || 5;
        this.#delayReintento = Number(process.env.DB_DELAY_REINTENTO) || 3000;

        // Creación del Pool -----------------------------
        this.#pool = new Pool({
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            password : process.env.DB_PASSWORD,
            database : process.env.DB_NAME,
            port : Number(process.env.DB_PORT) || 5432,

            // max de clientes al mismo tiempo
            max: Number(process.env.DB_POOL_MAX) || 10,
            // Destruye clientes inactivos tras este tiempo
            idleTimeoutMillis : Number(process.env.DB_POOL_IDLE_TIMEOUT) || 30000,
            // tiempo máximo para obtener un cliente del pool pasado ese límite PG lanza un error
            connectionTimeoutMillis : Number(process.env.DB_POOL_CONNECTION_TIMEOUT) || 2000
        })

        // vamos a dejar Listener de errores pasivos
        // Cuando se ejecuta ?
        // Se va a ejecutar cuando un cliente INACTIVO pierde su conexión
        // Se va a ejecutar cuando la BD se reinicia
        this.#pool.on('error', ( err )=>{
            console.error(chalk.yellow.bold('[Pool] Error inesperado en cliente inactivo:'));
            console.error(chalk.yellow(`  Mensaje: ${err.message}`));
            console.error(chalk.yellow(`  Código : ${err.code ?? 'N/A'}`))
        })

        // ─────────────────────────────────────────────────────────────
        // Circuit Breaker — estado inicial: CERRADO
        // Guardamos el estado del disyuntor en un objeto con 5 propiedades:
        //
        //  estado             : posición actual del disyuntor
        //                       'cerrado'     → todo funciona, deja pasar las operaciones
        //                       'abierto'     → DB caída, rechaza peticiones al instante
        //                       'semi-abierto'→ probando si la DB ya se recuperó
        //
        //  fallosConsecutivos : contador de cuántas veces seguidas falló la conexión
        //                       se resetea a 0 cuando hay un éxito
        //
        //  umbral             : cuántos fallos seguidos se permiten antes de abrir el circuito
        //                       se lee del .env (CB_UMBRAL_FALLOS) o usa 5 por defecto
        //
        //  tiempoMs           : cuántos milisegundos permanece el circuito ABIERTO
        //                       antes de pasar a SEMI-ABIERTO para probar recuperación
        //                       se lee del .env (CB_TIEMPO_APERTURA) o usa 30000ms (30s)
        //
        //  abiertoDesdeMs     : marca de tiempo (Date.now()) del momento en que se abrió
        //                       sirve para calcular cuánto tiempo lleva abierto
        //                       es null mientras el circuito está cerrado
        // ─────────────────────────────────────────────────────────────
        this.#cb = {
            estado             : 'cerrado',  // 'cerrado' | 'abierto' | 'semi-abierto'
            fallosConsecutivos : 0,
            umbral             : Number(process.env.CB_UMBRAL_FALLOS)   || 5,
            tiempoMs           : Number(process.env.CB_TIEMPO_APERTURA) || 30000,
            abiertoDesdeMs     : null
        }
    }

    // Creamos los metodos
    // vamos a crea un getter público de solo lectura
    // Esto es para que lo utilcemos en consultas.js por ejemplo pool.connect()
    get pool(){
        return this.#pool
    }

    #esperar(ms){
        return new Promise( ( resolve ) => setTimeout( resolve, ms))
    }

    #esCodTransitorio(error) {
        const cod = error.code ?? error.codigoPg
        return ['ECONNRESET','ECONNREFUSED','ETIMEDOUT','57P03','53300','08006','08001','08004'].includes(cod)
    }

    // ─────────────────────────────────────────────────────────────────────
    // ejecutar(fn) — método principal del Circuit Breaker
    //
    // Recibe una función fn (la operación a ejecutar, ej: una consulta SQL)
    // y decide si dejarla pasar o rechazarla inmediatamente según el estado
    // del disyuntor.
    //
    // Flujo de estados:
    //
    //   CERRADO ──── falla N veces seguidas ──▶ ABIERTO
    //     ▲                                        │
    //     │ éxito                          espera 30s
    //     │                                        │
    //   SEMI-ABIERTO ◀──────────────────────────────
    //     │ falla → vuelve a ABIERTO
    //     └─ éxito → vuelve a CERRADO
    // ─────────────────────────────────────────────────────────────────────
    async ejecutar(fn) {

        // ── BLOQUE 1: ¿está el circuito ABIERTO? ──────────────────────────
        if (this.#cb.estado === 'abierto') {

            // Calculamos cuánto tiempo lleva abierto
            const transcurrido = Date.now() - this.#cb.abiertoDesdeMs

            if (transcurrido < this.#cb.tiempoMs) {
                // Aún no pasaron los 30s → rechazamos la petición AL INSTANTE
                // sin ni siquiera intentar conectar a la DB
                // restanteS: cuántos segundos faltan, redondeado hacia arriba
                const restanteS = Math.ceil((this.#cb.tiempoMs - transcurrido) / 1000)
                const err = new Error(`Base de datos no disponible temporalmente. Reintente en ${restanteS}s.`)
                err.statusCode = 503       // Service Unavailable
                err.codigoPg   = 'CB_ABIERTO'
                err.operacion  = 'circuit-breaker'
                throw err
            }

            // Ya pasaron los 30s → cambiamos a SEMI-ABIERTO para dar una oportunidad
            this.#cb.estado = 'semi-abierto'
            console.warn(chalk.yellow.bold('[CircuitBreaker] Estado → SEMI-ABIERTO: probando recuperación...'))
        }

        // ── BLOQUE 2: intentamos ejecutar la operación ────────────────────
        try {
            const resultado = await fn()    // ← aquí se ejecuta la consulta real

            // ¡Éxito! Si el circuito estaba semi-abierto o abierto, lo cerramos
            // y reseteamos el contador de fallos → todo vuelve a la normalidad
            if (this.#cb.estado !== 'cerrado') {
                this.#cb.estado            = 'cerrado'
                this.#cb.fallosConsecutivos = 0
                console.log(chalk.green.bold('[CircuitBreaker] Estado → CERRADO: base de datos recuperada'))
            }

            return resultado

        } catch (error) {

            // ── BLOQUE 3: la operación falló ──────────────────────────────
            if (this.#esCodTransitorio(error)) {

                // Solo contamos fallos de red/conexión, no errores de negocio
                this.#cb.fallosConsecutivos++

                // El circuito debe abrirse si:
                //   a) acumulamos tantos fallos como el umbral (ej: 5 seguidos)
                //   b) estábamos en semi-abierto y la prueba también falló
                const debeAbrir = this.#cb.fallosConsecutivos >= this.#cb.umbral
                               || this.#cb.estado === 'semi-abierto'

                if (debeAbrir) {
                    // Abrimos el circuito y guardamos el momento exacto
                    // para poder calcular cuándo volver a semi-abierto
                    this.#cb.estado         = 'abierto'
                    this.#cb.abiertoDesdeMs = Date.now()
                    console.error(chalk.bgRed.white.bold(
                        `[CircuitBreaker] Estado → ABIERTO: ${this.#cb.fallosConsecutivos} fallos consecutivos. ` +
                        `Suspendido por ${this.#cb.tiempoMs / 1000}s`
                    ))
                }
            }

            // Siempre relanzamos el error para que el controller lo maneje
            throw error
        }
    }

    // Verificamos la conexión
    async verificarConexion(){
        let intentos = 0;
        let client;
        while (intentos < this.#maxReintentos) {
            intentos++;
            try {
                console.log(chalk.cyan(`[DB] Intento de conexión [${intentos}/${this.#maxReintentos}]...`))
                // pool.connect() va extraer un cliente disponible del pool.
                // Si el pool está lleno y se supera connectionTimeoutMillis lanza error
                client = await this.#pool.connect();
                const resultado = await client.query('SELECT NOW() AS hora_servidor;')
                const horaServidor = resultado.rows[0].hora_servidor;

                console.log(chalk.green.bold('[DB] Conexión establecida con PostgresSQL'));
                console.log(chalk.green(`  Hora del servidor DB : ${horaServidor}`));
                console.log(chalk.green(`  Base de datos        : ${process.env.DB_NAME}`));
                console.log(chalk.green(`  Host                 : ${process.env.DB_HOST}:${process.env.DB_PORT}`));

                return true // Exito Server.js puede abrir el puerto

            } catch (error) {
                
                console.error(chalk.red.bold(`[DB] Fallo en intento ${intentos}/${this.#maxReintentos}...`));
                console.error(chalk.red(`Mensaje : ${error.message}`))
                console.error(chalk.red(`Código : ${error.code ?? 'N/A'} `));
                console.error(chalk.red(`Detalle : ${error.detail ?? 'Sin detalle adicional'}`))

                if(intentos < this.#maxReintentos){
                    console.log(chalk.yellow(`[DB] Reintentando en ${this.#delayReintento / 1000}s...`))
                    await this.#esperar(this.#delayReintento);
                }

            }finally{
                if(client) client.release();
            }
        }

        // Todos los intentos fallaron  informamos y devolvemos false
        console.error(chalk.bgRed.white.bold(`[DB] No se pudo conectar a PostgresSQL tras ${this.#maxReintentos} intentos`));
        console.error(chalk.bgRed.white.bold('Verifique que el servidor de BD esté activo y que el .env sea correcto'))
        return false

    }

    // Cerrar la conexión
    async cerrarPool(){
        try {
            await this.#pool.end();
            console.log(chalk.gray('[DB] Pool de conexiones cerrado correctamente.'));
        } catch (error) {
            console.error(chalk.yellow.bold('[DB] Error al cerrar el pool:', chalk.yellow(error.message)));
        }
    }


}

export default new ConexionDB()
