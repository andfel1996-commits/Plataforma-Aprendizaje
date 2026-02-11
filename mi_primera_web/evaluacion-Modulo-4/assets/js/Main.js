// --- 1. ORIENTACIÓN A OBJETOS ---
class Tarea {
    constructor(id, descripcion, fechaLimite) {
        this.id = id;
        this.descripcion = descripcion;
        this.estado = "pendiente";
        this.fechaCreacion = new Date().toLocaleString();
        this.fechaLimite = fechaLimite; // Nuevo campo
    }

    completar() {
        this.estado = "completada";
    }
}

class GestorTareas {
    constructor() {
        this.tareas = JSON.parse(localStorage.getItem('tareas')) || []; // Carga desde LocalStorage
    }

    async agregarTarea(descripcion) {
        console.log("Agregando tarea...");

        // Simular retardo de 2 segundos (Asincronía)
        await new Promise(resolve => setTimeout(resolve, 2000));

        const nuevaTarea = new Tarea(Date.now(), descripcion); // ID único con Date.now()
        this.tareas.push(nuevaTarea);

        this.guardarEnLocalStorage();
        this.mostrarNotificacion("¡Tarea registrada exitosamente!");
        renderizarLista();
    }

    eliminarTarea(id) {
        this.tareas = this.tareas.filter(t => t.id !== id);
        this.guardarEnLocalStorage();
        renderizarLista();
    }

    guardarEnLocalStorage() {
        localStorage.setItem('tareas', JSON.stringify(this.tareas)); // Requerimiento 5
    }

    mostrarNotificacion(mensaje) {
        const nota = document.querySelector('#notificacion');
        nota.textContent = mensaje;
        nota.classList.remove('oculto');
        setTimeout(() => nota.classList.add('oculto'), 3000);
    }
}

// Instancia global
const miGestor = new GestorTareas();

// --- 2. MANIPULACIÓN DEL DOM Y EVENTOS ---
const formulario = document.querySelector('#miFormulario');
const input = document.querySelector('#tareaInput');
const listaContenedor = document.querySelector('#listaTareas');

// Renderizado dinámico (Usando ES6 Template Literals)
const renderizarLista = () => {
    listaContenedor.innerHTML = '';

    // Destructuring en el forEach
    miGestor.tareas.forEach(({ id, descripcion, estado, fechaCreacion }) => {
        const tareaDiv = document.createElement('div');
        tareaDiv.className = `tarea ${estado}`;
        tareaDiv.innerHTML = `
            <span><strong>${descripcion}</strong> (Creada: ${fechaCreacion})</span>
            <button onclick="borrar(${id})">Eliminar</button>
        `;
        listaContenedor.appendChild(tareaDiv);
    });
};
// Función para calcular el tiempo restante
const iniciarContadores = () => {
    setInterval(() => {
        const elementos = document.querySelectorAll('.tiempo-restante');
        elementos.forEach(el => {
            const limite = new Date(el.dataset.limite).getTime();
            const ahora = new Date().getTime();
            const distancia = limite - ahora;

            if (distancia < 0) {
                el.textContent = "¡Plazo vencido!";
                el.style.color = "red";
            } else {
                const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
                const segundos = Math.floor((distancia % (1000 * 60)) / 1000);
                el.textContent = `Quedan: ${horas}h ${minutos}m ${segundos}s`; // Template literals
            }
        });
    }, 1000);
};
// Evento Submit
formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value.trim()) {
        miGestor.agregarTarea(input.value);
        input.value = '';
    }
});

// Eventos adicionales para interactividad
input.addEventListener('keyup', () => {
    input.style.backgroundColor = input.value.length > 0 ? '#e8f0fe' : 'white';
});

// Funciones globales para los botones
window.borrar = (id) => miGestor.eliminarTarea(id);

// Carga inicial
renderizarLista();