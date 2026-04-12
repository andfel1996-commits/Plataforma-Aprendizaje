// Cargar variables de entorno desde .env
require('dotenv').config();

const { Pool } = require('pg');

// Crear un pool de conexiones usando las variables del .env
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// Función para probar la conexión
async function testConnection() {
  try {
    const client = await pool.connect();
    console.log('Conexión exitosa a la base de datos');
    client.release();
  } catch (err) {
    console.error('Error conectando a la base de datos', err);
  }
}

testConnection();

module.exports = pool;
