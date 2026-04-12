import express from "express";
import db from '../db/connection.js'
import { create } from "express-handlebars";

// Rutas Publicaciones
import apiRootPostPublicacionRoute       from '../routes/apiRootPostPublicacion.routes.js';
import apiRootGetPublicacionRoute        from '../routes/apiRootGetPublicacion.routes.js';
import apiRootPutDeletePublicacionRoute  from '../routes/apiRootPutDeletePublicacion.routes.js';

// Rutas Usuario
import apiRootPostUsuarioRoute from '../routes/apiRootPostUsuario.routes.js';
import apiRootGetUsuarioRoute from '../routes/apiRootGetUsuario.routes.js';

// Ruta a interaccion
import apiRootInteraccionRoute from '../routes/apiRootInteraccion.routes.js'

import vistaRouteHome from '../routes/vistaRouteHome.routes.js'

// Creación de variables de entorno
import { fileURLToPath } from 'url'
import { dirname } from "path";

const __filename = fileURLToPath( import.meta.url )
const __dirname = dirname( __filename );

class Server{

    constructor() {

        this.app = express();
        this.port = process.env.PORT || 8000;
        // Rutas para las API
        this.apiPaths = {
            publicacion : '/api/publicacion',
            usuario : '/api/usuario',
            interaccion : '/api/interaccion',
            // Ruta para el front end
            rootHome:'/'
        }

        this.dbConnection();
        this.middlewares();
        this.routes();
    }

    async dbConnection(){
        try {
            /*
                https://sequelize.org/docs/v6/core-concepts/model-basics/#model-synchronization
                Método sync()
                Sincronisa los modelos que son mis tablas
                -db.sync() - Esto crea la tabla si no existe (y no hace nada si ya existe)
                -db.sync({ force: true })- Esto crea la tabla, soltándola primero si ya existía
                -db.sync({ alter: true })- Esto verifica cuál es el estado actual de la tabla en la base de datos (qué columnas tiene, cuáles son sus tipos de datos, etc.), y luego realiza los cambios necesarios en la tabla para que coincida con el modelo.
            */
            await db.authenticate();
            await db.sync({ alter: true });
            console.log('[BASE DE DATOS] : Funcionando')


        } catch ( error ) {
            console.error(`No se pudo conectar a la base de datos:`, error)
        }
    }

    middlewares(){
        this.app.use( express.json() );
        this.app.use( express.static('public') );
        this.app.use('/bootstrapjs',express.static(  `${__dirname}/../node_modules/bootstrap/dist/js`  ));
        this.app.use('/bootstrap',express.static( `${__dirname}/../node_modules/bootstrap/dist/css`));
        this.app.use('/bootstrapicons',express.static( `${__dirname}/../node_modules/bootstrap-icons/font`));
        this.app.use('/css',express.static( `${__dirname}/../public/assets/css`));
        this.app.use('/img',express.static( `${__dirname}/../public/assets/img`));
        this.app.use('/js',express.static( `${__dirname}/../public/assets/js`));
        this.app.use('/font',express.static(  `${__dirname}/../public/assets/font`  ));
    }

    routes(){
        // RUTA para la vista del home
        this.app.use( this.apiPaths.rootHome, vistaRouteHome )
        
        // Ruta para crear usuarios
        this.app.use(this.apiPaths.usuario, apiRootPostUsuarioRoute )
        this.app.use(this.apiPaths.usuario, apiRootGetUsuarioRoute )

        // Ruta para crear publicaciones
        this.app.use( this.apiPaths.publicacion,  apiRootPostPublicacionRoute )
        this.app.use( this.apiPaths.publicacion,  apiRootGetPublicacionRoute )
        this.app.use( this.apiPaths.publicacion,  apiRootPutDeletePublicacionRoute )

        // Rutas para la tabla intermedia (interacciones N:M)
        this.app.use( this.apiPaths.interaccion, apiRootInteraccionRoute )
    }

    listen(){
        this.app.listen(this.port, ()=> console.log(`Servidor corriendo en puerto ${this.port}`))
    }

    initHandlebars(){

        this.hbs = create({
            partialsDir:[
                "views/"
            ]
        });
        
        this.app.engine( "handlebars", this.hbs.engine );
        this.app.set("view engine","handlebars");
    }

   
}

export default Server