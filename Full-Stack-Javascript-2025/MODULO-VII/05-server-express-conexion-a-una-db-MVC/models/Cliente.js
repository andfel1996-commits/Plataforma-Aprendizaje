// Importamos la instancia singleton de ConecionDB
import db from '../config/db.js';

const pool = db.pool;

// Creamnos una función interna que nos permitá 
// Mostrar un error de forma detallada
// Recibe el error original de PG y el nombre de la operación detallada que falló
const construirErrorDetallado = ( error, operacion) => {

    const err = new Error(`[${operacion}], ${error.message}`);

    err.codigoPg = error.code ?? 'N/A'  // Código de error de PostgreSQL (e.g. '23505' = duplicado) N/A Not Available
    err.detallePg = error.detail ?? null  // Detalle adicional que da pg (e.g. qué constraint falló)
    err.stack = error.stack  // Stack trace original para debugging
    err.operacion = operacion // Nombre legible de la operación fallida

    if( error.code === '23503' ){
        err.statusCode = 409;
        err.message = 'No se puede completar la operación por que el registro está relacionado con otros datos'
    }

    return err
}

// Esta es una consulta de prueba , para obtener la hora actual
// Del servidor de PostgresSQL
// útil para verificar que la conexión y el pool funcionan
// Esto se va a ejecutar en una ruta en el server.js GET / date
export const getDate = async () => {

    let client
    try {
        client = await pool.connect();
        const result = await client.query('SELECT NOW() AS hora_servidor;');
        return result.rows[0];

    } catch (error) {
        // Contruimos y lanzamos un error enriquecido para que server.js lo maneje 
        throw construirErrorDetallado( error, 'getDate');
    } finally {
        // finally funciona si entramos en try o catch
        // Liberar al cliente devuelve la conexión al pool para que sea reutilizada
        if (client) client.release()
    }
}

// OBTENEMOS TODAS LOS  CLIENTES "SELECT"
export const todosLosClientes = async () => {
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
}

// CREAMOS UN CLIENTE POST "INSERT"
export const nuevoCliente = async ( { nombre, apellido, email, saldo } ) => {
    let client

    // la consulta parametrizada protege de SQL Injection
    const consulta = {
        text: 'INSERT INTO usuarios ( first_name, last_name, email, saldo ) VALUES ( $1, $2, $3, $4 ) RETURNING *;',
        values : [ nombre, apellido, email, saldo ]
    }

    try {
        client = await pool.connect();
        const result = await pool.query(consulta);

        return result.rows[0];

    } catch (error) {
        throw construirErrorDetallado(error, 'nuevoCliente')
    } finally {
        if (client) client.release();
    }

};

// EDITAR UN CLIENTE PUT "UPDATE"
export const editarCliente = async ({ id, nombre, apellido, email, saldo } ) => {

    let client;
   

    const consulta = {
        text: 'UPDATE usuarios SET first_name = $2, last_name = $3, email = $4, saldo = $5 WHERE id = $1 RETURNING *;',
        values : [ id, nombre, apellido, email, saldo ]
    }

    try {
        client = await pool.connect();
        const result = await pool.query(consulta);
        // Si rowCount es 0 la tarea con ese id no existe en la DB
        if (result.rowCount === 0) {
            const err = new Error(`No se encontró ninguna tarea con id=${tarea.id}`)
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
}

// ELIMINAR UN CLIENTE DELETE "DELETE"
export const eliminarCliente = async ( id ) => {
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
}