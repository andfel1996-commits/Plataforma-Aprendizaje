// Importamos la instancia singleton de ConecionDB
import db from './db/connection.js';

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
        if (client) client.release
    }
}

// OBTENEMOS TODAS LAS TAREAS ASOCIADO A UN GET EN EL SERVER
export const todasLasTareas = async () => {
    let client
    try {
        client = await pool.connect();
        const resultado = await client.query('SELECT * FROM tareas ORDER BY id DESC;');
        return resultado.rows
    } catch (error) {
        throw construirErrorDetallado(error, 'todasLasTareas')
    } finally {
        if (client) client.release();
    }
}

// NUEVA TAREA ESTA ASOCIADA A UN POST--> app.post('/tarea', (req,res)=>{})
export const nuevaTarea = async ( tarea ) => {
    console.log('Salida de tarea-->',tarea )
    let client;
    const values = Object.values( tarea ) // ['Task 1', 'Descripción 1']
    console.log('Salida de values-->',values )
    // la consulta parametrizada protege de SQL Injection
    const consulta = {
        text: 'INSERT INTO tareas (titulo, descripcion) VALUES ($1, $2) RETURNING *;',
        values
    }

    try {
        client = await pool.connect();
        const result = await pool.query(consulta);
        return result.rows[0];
    } catch (error) {
        throw construirErrorDetallado( error, 'nuevaTarea')
    } finally {
        if (client) client.release();
    }

};

// Editar una tarea existente app.put('/tarea', (req,res)=>{})
export const editarTarea = async (tarea) => {

    let client;
    const values = Object.values(tarea) //  [ id, titulo, descripcion ]

    const consulta = {
        text: 'UPDATE tareas SET titulo = $2, descripcion = $3 WHERE id = $1 RETURNING *;',
        values
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
        throw construirErrorDetallado(error, 'editarTarea')
    } finally {
        if (client) client.release();
    }
}

// Eliminar una tarea
export const eliminarTarea = async (id) => {
    let client
    try {
        client = await pool.connect();
        const result = await client.query(
            'DELETE FROM tareas WHERE id = $1 RETURNING *;',
            [id]
        )
        if (result.rowCount === 0) {
            const err = new Error(`No se encontró ninguna tarea con id=${tarea.id}`)
            err.statusCode = 404;
            throw err
        }
        return result.rows[0];

    } catch (error) {
        if (error.statusCode) throw error
        throw construirErrorDetallado(error, 'eliminarTarea')
    } finally {
        if (client) client.release();
    }
}