require('dotenv').config();
const express = require('express');
const path = require('path');
const db = require('./config/database'); // Tu conexión a la BD
const userRoutes = require('./routes/userRoutes'); // Tus rutas del Paso 2 y 3
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// 1. Configuración de Vistas (EJS)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 2. Middlewares Globales
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); // Necesario para leer JSON en POST/PUT
app.use(express.urlencoded({ extended: true }));

// 3. Definición de Rutas (Paso 2 y 3)
app.use('/usuarios', userRoutes);

// 4. Manejo de Rutas No Encontradas (404)
app.use((req, res, next) => {
    res.status(404).json({
        status: "error",
        message: "La ruta solicitada no existe."
    });
});

// 5. Middleware de Manejo de Errores Global
app.use(errorHandler);

// 6. Inicio del Servidor y Conexión a la BD
const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        // Autenticar conexión
        await db.authenticate();
        console.log('✅ Conexión a la base de datos establecida.');

        // Sincronizar modelos (alter: true para no borrar datos al cambiar modelos)
        await db.sync({ alter: true });
        console.log('✅ Modelos sincronizados con la base de datos.');

        app.listen(PORT, () => {
            console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
            console.log(`💡 Usa 'npm run dev' para reinicio automático con Nodemon`);
        });
    } catch (error) {
        console.error('❌ No se pudo conectar a la base de datos:', error);
        process.exit(1);
    }
};

startServer();