// middlewares/errorHandler.js

const errorHandler = (err, req, res, next) => {
    // 1. Log del error en la consola para el desarrollador
    console.error(`[Error detectado]: ${err.message}`);

    // 2. Determinar el código de estado (500 por defecto si no existe uno)
    const statusCode = err.status || 500;

    // 3. Respuesta estructurada al cliente (Postman)
    res.status(statusCode).json({
        status: "error",
        message: err.message || "Error interno del servidor",
        // Opcional: solo mostrar el stack en desarrollo
        stack: process.env.NODE_ENV === 'development' ? err.stack : {}
    });
};

module.exports = errorHandler;