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
        this.tareas = JSON.parse(localStorage.getItem('tareas')) || [];
        this.apiUrl = 'https://jsonplaceholder.typicode.com/posts'; // API de prueba
    }

    async agregarTarea(descripcion, fechaLimite) {
        // --- VALIDACIÓN DE FECHA ---
        const ahora = new Date();
        const limite = new Date(fechaLimite);

        if (limite <= ahora) {
            this.mostrarNotificacion("¡Error! La fecha debe ser futura.");
            return;
        }

        try {
            console.log("Sincronizando con la API...");

            // --- CONSUMO DE API (FETCH) ---
            const respuesta = await fetch(this.apiUrl, {
                method: 'POST',
                body: JSON.stringify({ title: descripcion, userId: 1 }),
                headers: { 'Content-type': 'application/json; charset=UTF-8' }
            });

            if (!respuesta.ok) throw new Error("Error en el servidor");

            const datosApi = await respuesta.json();
            console.log("Respuesta API:", datosApi);

            // Crear y guardar tarea localmente
            const nuevaTarea = new Tarea(Date.now(), descripcion, fechaLimite);
            this.tareas.push(nuevaTarea);

            this.guardarEnLocalStorage(); //
            this.mostrarNotificacion("¡Tarea guardada y sincronizada!");
            renderizarLista();

        } catch (error) {
            // --- MANEJO DE ERRORES ---
            console.error("Fallo al conectar:", error);
            this.mostrarNotificacion("Error de conexión. Se guardó localmente.");

            // Backup: Guardar local aunque la API falle
            const nuevaTarea = new Tarea(Date.now(), descripcion, fechaLimite);
            this.tareas.push(nuevaTarea);
            this.guardarEnLocalStorage();
            renderizarLista();
        }
    }

    async completarTarea(id) {
        const tarea = this.tareas.find(t => t.id === id);
        if (tarea) {
            tarea.estado = "completada"; // Cambia el estado
            this.guardarEnLocalStorage(); // Persistencia
            this.mostrarNotificacion("¡Tarea completada!");
            renderizarLista();
        }
    }

    async editarTarea(id) {
        const tarea = this.tareas.find(t => t.id === id);
        if (tarea) {
            const nuevaDesc = prompt("Edita la descripción de la tarea:", tarea.descripcion);
            if (nuevaDesc && nuevaDesc.trim() !== "") {
                tarea.descripcion = nuevaDesc;
                this.guardarEnLocalStorage();
                this.mostrarNotificacion("Tarea actualizada");
                renderizarLista();
            }
        }
    }
    mostrarNotificacion(mensaje) {
        const nota = document.querySelector('#notificacion');
        if (nota) {
            nota.textContent = mensaje;
            nota.classList.remove('oculto');
            setTimeout(() => nota.classList.add('oculto'), 3000);
        }
    }
guardarEnLocalStorage() {
        localStorage.setItem('tareas', JSON.stringify(this.tareas));
    }

    eliminarTarea(id) {
        this.tareas = this.tareas.filter(t => t.id !== id);
        this.guardarEnLocalStorage();
        this.mostrarNotificacion("Tarea eliminada correctamente");
        renderizarLista();
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

    miGestor.tareas.forEach(({ id, descripcion, estado, fechaCreacion, fechaLimite }) => {
        const tareaDiv = document.createElement('div');
        // Usamos la clase estado para dar estilos CSS (ej. tachado si es completada)
        tareaDiv.className = `tarea ${estado}`; 
        
        tareaDiv.innerHTML = `
            <div class="tarea-info">
                <span style="${estado === 'completada' ? 'text-decoration: line-through;' : ''}">
                    <strong>${descripcion}</strong>
                </span>
                <br><small>Creada: ${fechaCreacion}</small>
            </div>

            ${estado === 'pendiente' 
                ? `<div class="tiempo-restante" data-limite="${fechaLimite}">Calculando...</div>` 
                : `<div class="status-finalizado">✅ Finalizada</div>`}

            <div class="acciones">
                ${estado === 'pendiente' 
                    ? `<button onclick="marcarCompletada(${id})" title="Completar">✔️</button>` 
                    : ''}
                <button onclick="editar(${id})" title="Editar">✏️</button>
                <button onclick="borrar(${id})" title="Eliminar">🗑️</button>
            </div>
        `;
        listaContenedor.appendChild(tareaDiv);
    });
};

// Función para calcular el tiempo restante
const actualizarContadores = () => {
    const ahora = new Date().getTime();
    const elementos = document.querySelectorAll('.tiempo-restante');

    elementos.forEach(el => {
        const fechaLimiteStr = el.dataset.limite;
        if (!fechaLimiteStr) return; // Salta si no hay fecha

        const limite = new Date(fechaLimiteStr).getTime();
        const distancia = limite - ahora;

        if (distancia < 0) {
            el.textContent = "¡Plazo vencido!";
            el.style.color = "red";
        } else {
            const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
            const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

            el.textContent = `Quedan: ${horas}h ${minutos}m ${segundos}s`;
        }
    });
};

// Iniciar el intervalo
setInterval(actualizarContadores, 1000);

// Bloquear fechas pasadas en el selector al cargar la página
const fechaInput = document.getElementById('fechaInput');
const ahora = new Date();
ahora.setMinutes(ahora.getMinutes() - ahora.getTimezoneOffset());
fechaInput.min = ahora.toISOString().slice(0, 16);
formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    const texto = input.value.trim();
    const fecha = document.querySelector('#fechaInput').value;

    if (texto && fecha) {
        miGestor.agregarTarea(texto, fecha);
        input.value = '';
        document.querySelector('#fechaInput').value = '';
    } else {
        alert("Por favor, completa todos los campos.");
    }
});

// Eventos adicionales para interactividad
// Evento keyup para el input
input.addEventListener('keyup', () => {
    input.style.backgroundColor = input.value.length > 0 ? '#e8f0fe' : 'white';
});

// Evento mouseover usando delegación de eventos para las tareas
listaContenedor.addEventListener('mouseover', (e) => {
    const tarea = e.target.closest('.tarea');
    if (tarea) {
        tarea.style.borderLeft = "5px solid #007bff"; // Resalte azul al pasar el mouse
    }
});

listaContenedor.addEventListener('mouseout', (e) => {
    const tarea = e.target.closest('.tarea');
    if (tarea) {
        tarea.style.borderLeft = "none";
    }
});
// Funciones globales para los botones
window.marcarCompletada = (id) => miGestor.completarTarea(id);
window.editar = (id) => miGestor.editarTarea(id);
window.borrar = (id) => miGestor.eliminarTarea(id); 
// Carga inicial
renderizarLista();