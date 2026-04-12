import express from 'express';
import fileUpload from 'express-fileupload';
import path from 'path';
import { fileURLToPath } from 'url';
import { requestInfoMiddleware } from '../middlewares/requestInfo.js';
import uploadsRoutes from '../routes/uploads.routes.js';
import { notFoundMiddleware } from '../middlewares/notFound.js';
// import errorHandlerMiddleware from '../middlewares/errorHandler.js'
import { errorHandlerMiddleware } from '../middlewares/errorHandler.js'
// No olvidar importar los middlewares una vez creados


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class Server{

    constructor(){

        this.app = express();
        this.port = process.env.PORT || 3000;

        this.uploadsPath = '/api/v1/uploads';

        this.middlewares();
        this.routes();

    }


    middlewares(){
        // Middleware que acepta objeto json
        this.app.use(express.json());

        // Middleware de archivos
        this.app.use(fileUpload({
            limits : { fileSize: 5000000 }, // 5 MB
            abortOnLimit : true,
            responseOnLimit:
            'El peso del archivo que deseas subir supera el limite permitido'
        }))

        // Middleware de información de la request
        this.app.use( requestInfoMiddleware )

        // Servir archivos estáticos
        const publicPath = path.join(__dirname, '../public');
        const uploadsPath = path.join(__dirname, '../uploads');
        this.app.use(express.static( publicPath ))
        this.app.use('/uploads', express.static( uploadsPath ) )

        // Configurar vistas con Handlebars
        this.app.set('view engine', 'hbs');
        const viewsPath = path.join(__dirname, '../views');
        this.app.set('views', viewsPath )

    }

    routes(){
        // RUTA del HOME
        this.app.get('/', (req, res) => {
            res.render('index', {
                title : 'Gestor de Carga de Archivos',
                breadcrumb: 'Home'
            })
        })

        // RUTA de API
        this.app.use( this.uploadsPath, uploadsRoutes )

        // Página no encontrada
        this.app.use(notFoundMiddleware)

        // manejo de errores
        this.app.use(errorHandlerMiddleware)
    }

    listen(){
        this.app.listen( this.port , () => {
            console.clear();
            console.log(`✅ Servidor corriendo en puerto ${this.port}`);
            console.log(`✅ Base URL: http://localhost: ${this.port}`);
            console.log(`✅ API Uploads: http://localhost:${this.port}/api/v1/uploads`)
        })
    }

}