import express from 'express';
// Router con todas las rutas de la versión 1 de la API (/api/v1/...)
import apiV1Routes from '../v1/routes/guitarras.routes.js';
// Middleware que registra en consola cada request con método URL y tiempo de respuesta
import { requestInfo } from '../middlewares/requestInfo.js'
// Middleware que añade cabeceras Cache-Control a las respuesta GET
import { cacheForGetRequest } from '../middlewares/cacheHeaders.js';
// Middleware que captura todos los errores lanzados por la APP y devuelve una respuesta standar
import { errorHandler } from '../middlewares/errorHandler.js';
// Middleware que va a responder 404 cuando ninguna ruta coincide con la petición
import { notFoundHandler } from '../middlewares/notFound.js'

class Server {

    constructor(){
        this.app = express()
        this.port = process.env.PORT || 3000;
        this.apiVersion = process.env.API_VERSION || 'v1';

        // Segundos que el cliente puede cachear las respuestas GET (Leido desde el .env)
        this.cacheSeconds = Number ( process.env.API_CACHE_MAX_AGE || 60 );

        // Objeto centralizado con los prefijos de ruta para evitar strings dispersos en el código
        this.paths = {
            api : `/api/${this.apiVersion}` // /api/v1
        }

        // vamos registrar los middleware globales
        this.middlewares();

        // Registramos las rutas
        this.routes();

        // registramos los middlewares de error
        this.errorMiddlewares();
    }

    middlewares(){
        // Elimna la cabecera "X-Powered-By:Express" para no exponer el stack tecnologico
        this.app.disable('x-powered-by');

        // vamos a permitir recibir y parsear cuerpos de petición tipo JSON
        this.app.use(express.json());

        // Activar el middleware logger: imprime metodo URL y duración de cada petición
        this.app.use(requestInfo);

        // Aplica cabeceras Cache-Control en todas las respuestas según el método HTTP
        this.app.use(cacheForGetRequest(this.cacheSeconds))
    }

    routes(){
        // Ruta Raiz GET /: Devuelve bienvenida y la URL de la documentación de la API
        // http:localhost:3000
        this.app.get('/',(req, res)=>{
            return res.status(200).json({
                status:'success' , // Indica que la petición fue existosa
                code : 200,
                message : 'Bienvenido a la API RESTfull de guitarras.',
                data:{
                    // Contruir la URL dinámicamente según el protocolo (http/https) y el host
                    docs: `${req.protocol}://${req.get('host')}${this.paths.api}`
                }
            })
        })

        // Vamos montar la ruta versionada en /api/v1; todas las rutas de guitarras.routes.js
        // quedan disponibles bajo ese prefijo
        this.app.use( this.paths.api , apiV1Routes)
    }x

    errorMiddlewares(){
        // captura peticiones a rutas no definidas y responde con 404
        this.app.use( notFoundHandler );

        // Capturar cualquier error lanzado con next(error) en toda la aplicación
        // DEBE ser el último middleware registrado para que funcione correctamente 
        this.app.use(errorHandler)
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en http://localhost:${this.port}`)
        })
    }
}

export default Server;