import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './src/routes/auth.routes.js';
import protectedRoutes from './src/routes/protected.routes.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON en el Body de las request o peticiones
app.use(express.json())

// Miiddleware de loggin simple para ver el método HTTP y ruta de cada request
app.use(( req, res, next )=>{
    console.log(`${req.method} ${req.path}`);
    next();
})

// Ruta publica base : Sirve como bienvenida y docuemntación minima de endpoints
app.get('/',(req, res )=>{
    res.json({
        mensaje : 'Aplicación 05-JWT-intro-MVC funcionando',
        endpoint : {
            publicos : ['GET /', 'POST /auth/login'],
            protegidos : ['GET /perfil']
        }
    })
})

// health
app.get('/health', ( req, res ) => {
    res.json({
        status : 'OK',
        mensaje : 'Servidor funcionado'
    })
})

// Montamos las rutas publicas de autentificación (ejemplo login)
app.use('/auth',  authRoutes )

// Montamos las rutas protegidas por JWT
app.use('/', protectedRoutes );

// Middleware 404: se ejecuta si ninguna ruta anterior coincide
app.use((req, res)=>{
    res.status(404).json({
        status : 'error',
        code : 404,
        mensaje : 'ruta no encontrada',
        path : req.path
    })
})

// Middleware global de errrores: centraliza el formato de respuesta de error
app.use((error, req, res , next ) => {

    console.log('Error:', error.message);

    // En desarrollo mostramos detalles técnicos; en producción los ocultanos
    res.status(error.status || 500).json({
        status: 'error',
        code : error.status || 500,
        mensaje : error.mensaje || 'Error interno del servidor',
        detalles : process.env.NODE_ENV === 'development' ? error.message : undefined
    })
})



app.listen( PORT , () =>{
    console.log(`Servidor listo en http://localhost:${PORT}`)
})