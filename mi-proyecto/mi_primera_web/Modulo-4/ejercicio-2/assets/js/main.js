// usuarios.js
export default class Usuario {
constructor(nombre, edad, email) {
this.nombre = nombre;
this.edad = edad;
this.email = email;
}
}   

// Paso 2: Crear el archivo principal app.js
// Aquí implementaremos todas las funcionalidades usando ES6+.
import Usuario from "./usuarios.js";

// Inicializamos el array de usuarios desde localStorage o vacío
let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
// Agregar un usuario
const agregarUsuario = (nombre, edad, email) => {
const nuevoUsuario = new Usuario(nombre, edad, email);
usuarios.push(nuevoUsuario);
localStorage.setItem("usuarios", JSON.stringify(usuarios));
console.log(`Usuario ${nombre} agregado con éxito.`);
};

// Listar usuarios con destructuring
const listarUsuarios = () => {
console.log("Lista de usuarios:");
usuarios.forEach(({ nombre, edad, email }, index) => {
console.log(`${index + 1}. ${nombre} - ${edad} años - ${email}`);
});
};
// Filtrar usuarios mayores de 18 con filter
const usuariosMayores = () => {
const mayores = usuarios.filter(({ edad }) => edad >= 18);
console.log("Usuarios mayores de 18:");
mayores.forEach(({ nombre, edad }) => console.log(`${nombre} - ${edad}
años`));
};
// Simulación de carga asíncrona con Promesas y Async/Await
const cargarUsuariosAsync = async () => {
console.log("Cargando usuarios...");
return new Promise((resolve) => {
setTimeout(() => {
resolve(listarUsuarios());
}, 2000);
});
};
// Llamado de prueba
agregarUsuario("Juan Pérez", 25, "juan@example.com");
agregarUsuario("Ana Gómez", 17, "ana@example.com");

agregarUsuario("Carlos Ruiz", 30, "carlos@example.com");
listarUsuarios();
usuariosMayores();
cargarUsuariosAsync();