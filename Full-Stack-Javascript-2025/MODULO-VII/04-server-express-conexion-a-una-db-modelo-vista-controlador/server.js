import 'dotenv/config';
import express from 'express';
import chalk from 'chalk';
import tareasRouter from './routes/tareas.routes.js'
import db from './config/db.js';

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

// MONTAJE DE RUTAS
// =============================================================================
// Todas las rutas de tareas quedan bajo el prefijo /api/tareas.
// El Router interno de tareas.routes.js define el resto del path:
//
//   GET    /api/tareas/date   → obtenerFecha
//   GET    /api/tareas        → obtenerTareas
//   POST   /api/tareas        → crearTarea
//   PUT    /api/tareas/:id    → actualizarTarea
//   DELETE /api/tareas/:id    → borrarTarea
app.use('/api/tareas', tareasRouter )





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



