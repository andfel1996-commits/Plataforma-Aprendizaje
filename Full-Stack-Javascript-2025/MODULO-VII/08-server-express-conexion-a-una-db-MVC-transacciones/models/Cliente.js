// Importamos la instancia singleton de ConecionDB
import db from '../config/db.js';

const pool = db.pool;

// Códigos de error de red/conexión que justifican un reintento automático


/**
 * 1. DICCIONARIO DE FALLOS RECUPERABLES
 * Usamos un 'Set' por eficiencia (búsqueda instantánea). 
 * Aquí listamos solo errores que son "culpa del entorno" (red, base de datos arrancando)
 * y NO errores de programación (como un error de sintaxis SQL).
 */

const ERRORES_TRANSITORIOS = new Set([
    'ECONNRESET',   // Conexión cortada por el servidor
    'ECONNREFUSED', // Conexión rechazada (BD no arrancó)
    'ETIMEDOUT',    // Timeout de red
    '57P03',        // cannot_connect_now  (BD arrancando)
    '53300',        // too_many_connections
    '08006',        // connection_failure
    '08001',        // unable_to_establish_sqlconnection
    '08004',        // rejected_connection
])

/**
 * 2. VALIDADOR DE ERRORES
 * Esta función decide si vale la pena volver a intentar.
 * Verifica tanto errores de Node.js (.code) como de PostgreSQL (.codigoPg).
 * Si el error está en el Set, devuelve 'true' (es reintentable).
 */
const esErrorTransitorio = (error) =>
    ERRORES_TRANSITORIOS.has(error.code) || ERRORES_TRANSITORIOS.has(error.codigoPg);



// Reintento con backoff exponencial: 300 ms → 600 ms → 1200 ms
// fn          : la operación a ejecutar (ej: consulta a la DB)
// maxIntentos : cuántas veces intentarlo como máximo (por defecto 3)
// delayBaseMs : tiempo base de espera en ms entre intentos (por defecto 300ms)

/**
 * 3. EL "ENVOLTORIO" DE REINTENTO (WRAPPER)
 * Esta es una función de "orden superior": recibe otra función (fn) y la 
 * dota de superpoderes para no rendirse al primer fallo.
 */
const conReintento = async (fn, maxIntentos = 3, delayBaseMs = 300) => {

    // BUCLE DE PERSISTENCIA: Controla el flujo de intentos.
    for (let intento = 1; intento <= maxIntentos; intento++) {
        try {
            // INTENTO DE EJECUCIÓN:
            // Si 'fn()' tiene éxito, 'return' termina todo y entrega el resultado.
            return await fn();

        } catch (error) {
            // MANEJO DE FALLOS: Si llegamos aquí, hubo un error.

            // FILTRO DE RENDICIÓN:
            // Abandonamos inmediatamente si:
            // a) El error es grave/permanente (ej: tabla no existe).
            // b) O ya quemamos nuestro último cartucho (intento 3 de 3).
            if (!esErrorTransitorio(error) || intento === maxIntentos) {
                throw error; // Lanza el error al sistema para que lo registre.
            }

            // ESTRATEGIA DE ESPERA (BACKOFF EXPONENCIAL):
            // No reintentamos de inmediato para no "ahogar" al servidor.
            // Intento 1: 300 * 2^0 = 300ms
            // Intento 2: 300 * 2^1 = 600ms
            // Intento 3: (Ya habría fallado en el 'if' de arriba si maxIntentos es 3)
            const delay = delayBaseMs * Math.pow(2, intento - 1);

            // LOG DE ADVERTENCIA:
            // Informamos qué código falló y cuánto tiempo dormiremos.
            // Usamos '??' para mostrar cualquier código de error que esté disponible.
            console.warn(
                `[Retry] Intento ${intento}/${maxIntentos} ` +
                `(${error.code ?? error.codigoPg}). Reintentando en ${delay}ms...`
            );

            // PAUSA ACTIVA (DORMIR):
            // Detenemos el código por 'delay' milisegundos antes de que 
            // el bucle 'for' pase al siguiente número de intento.
            await new Promise(resolver => setTimeout(resolver, delay));
        }
    }
};

 
// Mostrar un error de forma detallada
// Recibe el error original de PG y el nombre de la operación detallada que falló
/**
 * Transforma un error técnico de PostgreSQL en un error legible y útil.
 * @param {Error} error - El error original lanzado por el driver de la BD.
 * @param {string} operacion - Nombre de la acción que falló (ej: 'CREAR_USUARIO').
 */
const construirErrorDetallado = (error, operacion) => {

    // Creamos un nuevo objeto Error con un mensaje base que identifica dónde falló.
    const err = new Error(`[${operacion}], ${error.message}`);

    // ENRIQUECIMIENTO DEL OBJETO: Guardamos datos técnicos para debugging.
    err.codigoPg = error.code ?? 'N/A';    // El código de 5 dígitos de Postgres (ej: '23505').
    err.detallePg = error.detail ?? null; // Detalles extra (ej: "Key (email)=(test@test.com) already exists").
    err.stack = error.stack;              // La "ruta" del código donde ocurrió el error.
    err.operacion = operacion;            // Guardamos qué acción estábamos haciendo.

    // MAPEADO DE CÓDIGOS POSTGRES A MENSAJES HUMANOS:
    
    // Error 23503: Violación de llave foránea (Foreign Key Violation).
    if (error.code === '23503') {
        err.statusCode = 409; // Conflict
        err.message = 'No se puede completar la operación porque el registro está relacionado con otros datos';
    }

    // Error 23505: Valor duplicado (Unique Violation).
    if (error.code === '23505') {
        err.statusCode = 409; // Conflict
        err.message = 'Ya existe un registro con ese valor. Verifica que el email u otro campo único no esté duplicado.';
    }

    // Error 23502: Valor nulo en campo obligatorio (Not Null Violation).
    if (error.code === '23502') {
        err.statusCode = 400; // Bad Request
        err.message = `El campo '${error.column ?? 'desconocido'}' es obligatorio y no puede ser nulo.`;
    }

    // Error 23514: Falló una restricción CHECK (Check Violation).
    if (error.code === '23514') {
        err.statusCode = 400; // Bad Request
        err.message = 'La operación viola una restricción de la base de datos. Verifica que el saldo no quede negativo.';
    }

    // MANEJO DE ERRORES DE RED/SISTEMA:
    // Si el código está en nuestro Set de ERRORES_TRANSITORIOS definido antes...
    if (ERRORES_TRANSITORIOS.has(error.code)) {
        err.statusCode = 503; // Service Unavailable
        err.message = `Error de conexión con la base de datos (${error.code}). Intente nuevamente en unos momentos.`;
    }

    // Devolvemos el nuevo objeto de error "vitaminado" y listo para ser enviado al frontend o log.
    return err;
}


// Esta es una consulta de prueba , para obtener la hora actual
// Del servidor de PostgresSQL
// útil para verificar que la conexión y el pool funcionan
// Esto se va a ejecutar en una ruta en el server.js GET / date
export const getDate = async () => {

    return db.ejecutar( () =>

        conReintento( async () => {
            let client
            try {
                client = await pool.connect();
                const result = await client.query('SELECT NOW() AS hora_servidor;');
                return result.rows[0];
            } catch (error) {
                // Contruimos y lanzamos un error enriquecido para que server.js lo maneje
                throw construirErrorDetallado( error, 'getDate');
            } finally {
                // Liberar al cliente devuelve la conexión al pool para que sea reutilizada
                if (client) client.release()
            }
        })

    )
}

// OBTENEMOS TODAS LOS  CLIENTES "SELECT"
export const todosLosClientes = async () => {
    return db.ejecutar(() =>
        conReintento(async () => {
            let client
            try {
                client = await pool.connect();
                const resultado = await client.query('SELECT * FROM usuarios ORDER BY id DESC;');
                return resultado.rows
            } catch (error) {
                throw construirErrorDetallado( error, 'todosLosClientes')
            } finally {
                if (client) client.release();
            }
        })
    )
}

// CREAMOS UN CLIENTE POST "INSERT"
export const nuevoCliente = async ( { nombre, apellido, email, saldo } ) => {
    // la consulta parametrizada protege de SQL Injection
    const consulta = {
        text: 'INSERT INTO usuarios ( first_name, last_name, email, saldo ) VALUES ( $1, $2, $3, $4 ) RETURNING *;',
        values : [ nombre, apellido, email, saldo ]
    }

    return db.ejecutar(() =>
        conReintento(async () => {
            let client
            try {
                client = await pool.connect();
                const result = await client.query(consulta);
                return result.rows[0];
            } catch (error) {
                throw construirErrorDetallado(error, 'nuevoCliente')
            } finally {
                if (client) client.release();
            }
        })
    )

};

// EDITAR UN CLIENTE PUT "UPDATE"
export const editarCliente = async ({ id, nombre, apellido, email, saldo } ) => {
    const consulta = {
        text: 'UPDATE usuarios SET first_name = $2, last_name = $3, email = $4, saldo = $5 WHERE id = $1 RETURNING *;',
        values : [ id, nombre, apellido, email, saldo ]
    }

    return db.ejecutar(() =>
        conReintento(async () => {
            let client;
            try {
                client = await pool.connect();
                const result = await client.query(consulta);
                // Si rowCount es 0 el cliente con ese id no existe en la DB
                if (result.rowCount === 0) {
                    const err = new Error(`No se encontró ningún cliente con id=${id}`)
                    err.statusCode = 404;
                    throw err
                }
                return result.rows[0];
            } catch (error) {
                if (error.statusCode) throw error
                throw construirErrorDetallado( error, 'editarCliente')
            } finally {
                if (client) client.release();
            }
        })
    )
}

// ELIMINAR UN CLIENTE DELETE "DELETE"
export const eliminarCliente = async ( id ) => {
    return db.ejecutar(() =>
        conReintento(async () => {
            let client
            try {
                client = await pool.connect();
                const result = await client.query(
                    'DELETE FROM usuarios WHERE id = $1 RETURNING *;',
                    [id]
                )
                if (result.rowCount === 0) {
                    const err = new Error(`No se encontró ningun cliente con id=${id}`)
                    err.statusCode = 404;
                    err.operacion = 'eliminarCliente';
                    err.codigoPg = 'N/A';
                    err.detallePg = 'El id no existe en la tabla usuarios';
                    throw err
                }
                return result.rows[0];
            } catch (error) {
                if (error.statusCode) throw error
                throw construirErrorDetallado( error, 'eliminarCliente')
            } finally {
                if (client) client.release();
            }
        })
    )
}

export const transferirSaldo = async ( { emailOrigen, emailDestino, monto} ) => {
    return db.ejecutar(() =>
        conReintento(async () => {
            // 1. Obtenemos un cliente dedicado que mantendrá el contexto de la transacción
            const client = await pool.connect();

            try {
                // 2. Iniciamos la transacción
                await client.query('BEGIN');

                // 3. Descontar saldo del usuario de origen
                const descontar = {
                    text: `UPDATE usuarios
                            SET saldo = saldo - $1
                          WHERE email = $2
                        RETURNING id, email, saldo;`,
                    values: [ monto, emailOrigen ]
                }

                const resultadoOrigen = await client.query(descontar);

                // Si ninguna fue afectada el email de origen no existe
                if (resultadoOrigen.rowCount === 0) {
                    const err = new Error(`No se encontró ningún usuario con email:${emailOrigen}`);
                    err.statusCode = 404;
                    throw err
                }

                // 4. Acreditar saldo al usuario de destino
                const acreditar = {
                    text  : `UPDATE usuarios SET saldo = saldo + $1 WHERE email = $2 RETURNING id, email, saldo;`,
                    values: [ monto, emailDestino ]
                }

                const resultadoDestino = await client.query(acreditar);

                if (resultadoDestino.rowCount === 0) {
                    const err = new Error(`No se encontró ningún usuario con email:${emailDestino}`);
                    err.statusCode = 404;
                    throw err
                }

                // 5. COMMIT → ambos UPDATE se confirman como una sola unidad atómica
                await client.query('COMMIT');

                return {
                    origen  : resultadoOrigen.rows[0],
                    destino : resultadoDestino.rows[0],
                    monto
                }

            } catch (error) {
                // 6. ROLLBACK si cualquier paso falló
                await client.query('ROLLBACK');
                if (error.statusCode) throw error
                // Errores de la DB los enriquecemos con detalles de PG
                throw construirErrorDetallado(error, 'transferirSaldo')
            } finally {
                client.release()
            }
        })
    )
}