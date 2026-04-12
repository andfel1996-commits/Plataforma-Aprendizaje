const path = require('path');
const dotenv = require('dotenv');

// Intentamos cargar manualmente
const result = dotenv.config({ path: path.resolve(__dirname, '../.env') });

if (result.error) {
    console.log("❌ Error crítico: No se pudo cargar el archivo .env");
}

const { Sequelize } = require('sequelize');

// Esto nos dirá qué variables encontró dotenv dentro del archivo
console.log("--- DEBUG TOTAL ---");
console.log("Variables cargadas:", Object.keys(result.parsed || {}));

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD || "error_clave_vacia", 
    {
        host: process.env.DB_HOST || '127.0.0.1',
        dialect: 'postgres',
        logging: false,
    }
);

module.exports = sequelize;