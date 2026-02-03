// Class Tarea: define como es una sola tarea
class Tarea {
    constructor(id, descripcion) {
        this.id = id;
        this.descripcion = descripcion;
        this.estado = "pendiente"; // Estado inicial
        this.fechaCreacion = new Date().toLocaleDateString();
    }

    // Método para cambiar el estado
    completar() {
        this.estado = "completada";
        console.log(`Tarea ${this.id} marcada como completada.`);
    }
}
class GestorTareas {
    constructor() {
        this.tareas = []; // Lista de tareas
    }

    agregarTarea(descripcion) {
        console.log("Agregando tarea...");
        //simla un retardo de 2 segundos
        setTimeout(() => {
            const nuevaTarea = new Tarea(this.tareas.length + 1, descripcion);
            this.tareas.push(nuevaTarea);
            console.log(`Tarea Agregada: ${descripcion}`);
            this.mostrarNotificacion(); // notificacion tras 2 segundos
        }, 2000);
    }

    eliminarTarea(id) {
        this.tareas = this.tareas.filter(t => t.id !== id);
        console.log(`Tarea con id ${id} eliminada.`);
    }
    // funcion de notificacion asincrona
    mostrarNotificacion() {
        alert("!Nueva tarea registrada exitosamente");
    }
}
// Ejemplo de instanciación
const miGestor = new GestorTareas();
miGestor.agregarTarea("Aprender POO en js");
miGestor.agregarTarea("Configurar repositorio git");

