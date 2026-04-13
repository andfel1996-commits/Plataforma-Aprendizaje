// Clases y POO con errores
class Usuario {
    constructor(nombre, email, tipoUsuario) {
        this.nombre = nombre;
        this.email = email;
        this.tipoUsuario = tipoUsuario;
    }
    mostrarInfo() {
        console.log(`Usuario: ${this.nombre} - Email: ${this.email}`);
    }
}
class Administrador extends Usuario {
    constructor(nombre, email) {
        super(nombre, email, `admin`);
    }
    gestionarEventos() {
        console.log(`${this.nombre} esta gestionando eventos.`);
    }
}
// Uso de arrow functions y template literals
const mostrarEventos = (eventos) => {
    const listaEventos = document.getElementById(`lista-eventos`);
    listaEventos.innerHTML = eventos.map(({ nombre, fecha }) => `<li>${nombre}
        -${fecha}</li>`).join("");
};
// Función asíncrona con async/await
const obtenerEventos = async () => {
    try {
        mostrarLoader(true);
        const respuesta = await fetch('https://api.example.com/eventos');
        const eventos = await respuesta.json();
        mostrarEventos(eventos);
    } catch (error) {
        console.error(`error al cargar evento`, error);
    } finally {
        mostrarLoader(false)
    }
};
document.getElementById(`cargar-eventos`).addEventListener(`click`,
    obtenerEventos);



// Clases y POO con errores
Usuario.prototype.mostrarInfo = function () {
    console.log("Usuario: " + this.nombre + " - Email: " + this.email);
};
function Administrador(nombre, email) {
    Usuario.call(this, nombre, email, 'admin');
}
Administrador.prototype = Object.create(Usuario.prototype);
Administrador.prototype.gestionarEventos = function () {
    console.log(this.nombre + " está gestionando eventos.");
};
// Manipulación del DOM sin buenas prácticas
function mostrarEventos(eventos) {
    var listaEventos = document.getElementById('lista-eventos');
    listaEventos.innerHTML = "";
    for (var i = 0; i < eventos.length; i++) {

        var evento = document.createElement('li');
        evento.innerText = eventos[i].nombre + " - " + eventos[i].fecha;
        listaEventos.appendChild(evento);
    }
}
// Carga de eventos sin manejo de errores adecuado
function obtenerEventos() {
    mostrarLoader(true);
    fetch('https://api.example.com/eventos')
        .then(function (respuesta) {
            return respuesta.json();
        })
        .then(function (eventos) {
            mostrarEventos(eventos);
        })
        .catch(function (error) {
            console.log("Error al cargar eventos: " + error);
        })
        .finally(function () {
            mostrarLoader(false);
        });
}
document.getElementById('cargar-eventos').addEventListener('click',
    obtenerEventos);