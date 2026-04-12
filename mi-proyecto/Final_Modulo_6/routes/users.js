const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = './data/users.json';

// Función para leer usuarios desde archivo
function readUsers() {
  if (!fs.existsSync(path)) return [];
  const data = fs.readFileSync(path);
  return JSON.parse(data);
}

// Función para guardar usuarios en archivo
function saveUsers(users) {
  fs.writeFileSync(path, JSON.stringify(users, null, 2));
}

// Ruta para mostrar todos los usuarios (vista)
router.get('/', (req, res) => {
  const users = readUsers();
  res.render('users', { users });
});

// Ruta para crear un usuario (desde formulario o API)
router.post('/', (req, res) => {
  const users = readUsers();
  const newUser = req.body;

  // Validación simple
  if (!newUser.name || !newUser.email) {
    return res.status(400).send('Faltan datos obligatorios: name y email');
  }

  users.push(newUser);
  saveUsers(users);
  res.redirect('/users'); // Redirige a la lista de usuarios
});

module.exports = router;
