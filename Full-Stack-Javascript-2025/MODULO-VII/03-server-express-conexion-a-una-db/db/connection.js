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
