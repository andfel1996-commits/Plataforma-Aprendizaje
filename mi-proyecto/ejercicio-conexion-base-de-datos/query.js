const pool = require('./db/db');

async function obtenerUsuarios() {
  const client = await pool.connect(); // Obtenemos un cliente del pool
  try {
    const res = await client.query('SELECT * FROM usuarios');
    console.table(res.rows);
  } catch (err) {
    console.error('Error al ejecutar la consulta:', err.message);
  } finally {
    client.release(); // Liberamos la conexión al pool
  }
}

obtenerUsuarios();