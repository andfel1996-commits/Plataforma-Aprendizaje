const fs = require('fs');
const path = './usuarios.json';

// Función para leer usuarios
function leerUsuarios() {
  const data = fs.readFileSync(path, 'utf-8');
  return JSON.parse(data);
}

// Función para guardar usuarios
function guardarUsuarios(usuarios) {
  fs.writeFileSync(path, JSON.stringify(usuarios, null, 2));
}

// Función para actualizar la edad de un usuario por ID
function actualizarEdad(id, nuevaEdad) {
  const usuarios = leerUsuarios();
  const usuario = usuarios.find(u => u.id === id);
  if (usuario) {
    usuario.edad = nuevaEdad;
    guardarUsuarios(usuarios);
    return true;
  }
  return false;
}

// Función para eliminar un usuario por ID
function eliminarUsuario(id) {
  let usuarios = leerUsuarios();
  const longitudOriginal = usuarios.length;
  usuarios = usuarios.filter(u => u.id !== id);
  if (usuarios.length < longitudOriginal) {
    guardarUsuarios(usuarios);
    return true;
  }
  return false;
}

module.exports = {
  leerUsuarios,
  actualizarEdad,
  eliminarUsuario
};
