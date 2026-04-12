const express = require('express');
const app = express();
app.use(express.json());
const pool = require('./db'); // Importa el pool de conexiones desde db.js
// Obtener todos los usuarios
app.get('/usuarios', async (req, res) => {
try {
const resultado = await pool.query('SELECT * FROM usuarios');
res.json(resultado.rows);
} catch (err) {
res.status(500).json({ error: err.message });
}
});
// Consultar un usuario por ID (consulta parametrizada)
app.get('/usuarios/:id', async (req, res) => {
const { id } = req.params;
try {
const resultado = await pool.query('SELECT * FROM usuarios WHERE id = $1',
[id]);
res.json(resultado.rows[0]);
} catch (err) {
res.status(500).json({ error: err.message });
}
});
// Insertar un nuevo usuario
app.post('/usuarios', async (req, res) => {
const { nombre, correo, edad } = req.body;
try {
const resultado = await pool.query(
'INSERT INTO usuarios (nombre, correo, edad) VALUES ($1, $2, $3) RETURNING *',
[nombre, correo, edad]
);
res.json(resultado.rows[0]);
} catch (err) {
res.status(500).json({ error: err.message });
}
});
// Actualizar el correo de un usuario
app.put('/usuarios/:id', async (req, res) => {
const { id } = req.params;
const { correo } = req.body;
try {
const resultado = await pool.query(
'UPDATE usuarios SET correo = $1 WHERE id = $2 RETURNING *',
[correo, id]
);
res.json(resultado.rows[0]);
} catch (err) {
res.status(500).json({ error: err.message });
}
});
// Eliminar un usuario por ID
app.delete('/usuarios/:id', async (req, res) => {
const { id } = req.params;
try {
await pool.query('DELETE FROM usuarios WHERE id = $1', [id]);
res.json({ message: 'Usuario eliminado exitosamente' });
} catch (err) {
res.status(500).json({ error: err.message });
}
});
// ========================
// USO DE CURSORES PARA PROCESAR RESULTADOS POR LOTES
// ========================
const { Client } = require('pg');
const Cursor = require('pg-cursor');
app.get('/usuarios-cursor', async (req, res) => {
const client = new Client({
host: process.env.DB_HOST,
user: process.env.DB_USER,
password: process.env.DB_PASSWORD,
database: process.env.DB_NAME,
port: process.env.DB_PORT
});
await client.connect();
const cursor = client.query(new Cursor('SELECT * FROM usuarios'));
cursor.read(10, (err, rows) => {
if (err) {
res.status(500).json({ error: err.message });
} else {
res.json(rows);
}
cursor.close(() => client.end());
});
});
// ========================
// INICIAR EL SERVIDOR
// ========================
app.listen(3000, () => {
console.log('Servidor corriendo en http://localhost:3000');
});