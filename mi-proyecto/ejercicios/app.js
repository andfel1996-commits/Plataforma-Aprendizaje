const gestorUsuarios = require('./gestorUsuarios');

// Mostrar usuarios
console.log('Usuarios actuales:', gestorUsuarios.leerUsuarios());

// Actualizar edad del usuario con id 2
const actualizado = gestorUsuarios.actualizarEdad(2, 35);
console.log(actualizado ? 'Edad actualizada' : 'Usuario no encontrado');

// Eliminar usuario con id 1
const eliminado = gestorUsuarios.eliminarUsuario(1);
console.log(eliminado ? 'Usuario eliminado' : 'Usuario no encontrado');

// Mostrar usuarios después de cambios
console.log('Usuarios después de cambios:', gestorUsuarios.leerUsuarios());
