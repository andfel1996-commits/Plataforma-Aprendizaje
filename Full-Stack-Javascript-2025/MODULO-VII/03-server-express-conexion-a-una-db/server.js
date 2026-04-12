import 'dotenv/config';
import express from 'express';
import chalk from 'chalk';
import {
    nuevaTarea,
    todasLasTareas,
    editarTarea,
    eliminarTarea,
    getDate
} from './consultas.js'
import db from './db/connection.js';

// MANEJADORES GLOBALES DE ERRORES
// Se va a disparar cuando un control de excepción sincrónico no sea capturado
process.on('uncaughtException', (error)=>{
    console.error(chalk.bgRed.white.bold('[PORCESO] uncaughtException - excepción no capturada'));
    console.error(chalk.bgRed.white(` Mensaje : ${error.message}`));
    console.error(chalk.bgRed.white(` Stack : ${error.stack}`));

    // bajada segura : cerramos pool y se termiona con código 1
    db.cerrarPool().finally(()=>process.exit(1))
})

// Se dispara cuando un Promise rechazada no tiene .catch() o no este envuelta en un try catch
process.on('unhandledRejection',( reason, promise ) => {
    console.error(chalk.bgRed.white.bold('[PORCESO] unhandledRejection - promesa rechazada sin capturar'));
    console.error(chalk.magenta(' Promise:'), promise );
    console.error(chalk.magenta(' Razón :'), reason );
})

// Configurar express
const app = express();
// Creamos nuestro primer Middleware
app.use( express.json() );

// vamos a definir nuestras rutas
app.get('/date', async (req, res, next )=>{
    try {
        const fecha = await getDate();
        res.status(200).json(fecha)
    } catch (error) {
        // vamos a definir un middleware de errores global
        next(error)
    }
})

// GET / Tareas
app.get('/tareas', async (req, res , next)=>{
    try {
        const tareas = await todasLasTareas();
        res.status(200).json(tareas)
    } catch (error) {
        next(error)
    }
})

app.post('/tarea', async (req, res, next) => {
    try {
        const { titulo, descripcion } = req.body;

        if( !titulo || !descripcion ){
          //vamos a crear un error con statusCode personalizado para que el
          // middleware de errores devuelva 400 (bad request) y no un 500
          const err = new Error('Los campos "título" y "descripción" son obligatorios');
          err.statusCode = 400;
          throw err;
        }

        const tarea = await nuevaTarea(req.body)
        // 201 Created es el código correcto para recursos creados exitosamente
        res.status(201).json(tarea)

    } catch (error) {
        next(error)
    }
})

// PUT cual es el req.body esperado { "id": 1, "titulo": "...", "descripcion": "..." }
app.put('/tarea/:numId', async (req, res, next) => {
    try {
        const numId = Number(req.params.numId)
        const { id, titulo, descripcion } = req.body

        if(numId !== Number(id)){
            const err = new Error(
                `El id de la url (${numId}) no coincide con el id del body (${id})`
            );
            err.statusCode = 400;
            throw err;
        }
        const tereaActualizada = await editarTarea( {id, titulo, descripcion} );
        res.status(200).json(tereaActualizada)
    } catch (error) {
         next(error)
    }
})

// Eliminar DELETE
app.delete('/tarea/:numId', async ( req, res, next ) =>{
    try {
        const numId = req.params.numId;
        const tareaEliminada = await eliminarTarea(numId)
        res.status(200).json(tareaEliminada)
    } catch (error) {
        next(error)
    }
})

// MIDDLEWARE GOBAL DE MANEJO DE ERRORES
// Express distingue un middleware de errores del resto porque tiene CUATRO
// parámetros: (err, req, res, next). DEBE ir DESPUÉS de todas las rutas.
//
// Aquí centralizamos:
//   • El log del error (con todos los detalles para depuración).
//   • La decisión del código de estado HTTP a devolver.
//   • La respuesta JSON que recibe el cliente (sin exponer el stack trace).

app.use(( err, req, res, next ) => {
    console.log('Salida de err--->', err )
    console.error( chalk.red.bold(`[ERROR] Petición fallida :`));
    console.error( chalk.red(`  Operación : ${err.operacion ?? 'N/A'}`));
    console.error( chalk.red(`  Mensaje : ${err.mensaje}`));
    console.error( chalk.red(`  Código PG : ${err.codigoPg ?? 'N/A'}`));
    console.error( chalk.red(`  Detalle : ${err.detallePg ?? 'N/A'}`));
    console.error( chalk.red(`  Ruta : ${req.method} ${req.originUrl}`));
    console.error( chalk.red(`  Stack : \n${err.stack}`));

    // Definir un Codigo de estado HTTP
    const statusCode = err.statusCode ?? 500;

    // respuesta al cliente 
    // NUNCA enviar el stack trace al cliente en produccíon : Esto
    // Expone detalles internos que facilitan ataques
    res.status(statusCode).json({
        ok: false,
        mensaje : err.message,
        ...(process.env.NODE_ENV !== 'produccion' && {stack:err.stack})
    });
});

const PORT = Number(process.env.PORT) || 3000;
let servidor

const iniciarServidor = async () => {

    console.log(chalk.cyan.bold(`[SEVER] Iniciando servidor ...`));
    const conexionExitosa = await db.verificarConexion();

    if(!conexionExitosa){
        console.error(chalk.bgRed.white.bold('[SERVER] Servidor abortado: no se pudo conectar a la DB.'));
        process.exit(1) // Código 1  indica salida por error
    }

    servidor = app.listen(PORT, ()=>{
        console.log('')
        console.log(chalk.green.bold('===================================================='))
        console.log(chalk.green.bold(`Servidor corriendo en http://localhost:${PORT}`));
        console.log(chalk.green(`Base de datos : ${process.env.DB_NAME}`));
        console.log(chalk.green(`Entorno : ${process.env.NODE_ENV ?? 'development'}`));
        console.log(chalk.green.bold('===================================================='))
        console.log('')
    })
}

const apagarServidor =  async( señal ) => {
    console.log('')
    console.log(chalk.yellow.bold(`[SERVER] Señal recibida:${señal}. Iniciando una bajada segura...`));

    if(servidor){
        servidor.close( async () => {
            console.log(chalk.yellow(`[SERVER] Puerto cerrado. No se aceptan nuevas conexiones.`))
            await db.cerrarPool();
            console.log(chalk.gray.bold('[SERVER] Aplicación detenida correctamente. Hasta luego!'))
            // Salida limpia
            process.exit(0)
        })
    }else{
        // Si el servidor nunca arranco (Fallo antes el listen) cerramos el pool
        await db.cerrarPool();
        process.exit(0)
    }
};

// Registramos los manejadores de señal
process.on('SIGTERM', ()=> apagarServidor('SIGTERM'));
process.on('SIGINT', () => apagarServidor('SIGINT'));

// EJECUTAMOS LA LLAMADA INICIAL
iniciarServidor();



