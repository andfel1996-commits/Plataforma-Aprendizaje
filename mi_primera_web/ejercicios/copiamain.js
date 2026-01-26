/**
 * Usamos un objeto o clase para evitar variables globales
 * y mantener la lógica agrupada.
 */
const GestorTareas = {
    lista: [],

    // Usamos parámetros claros y validaciones
    agregar(nombreTarea) {
        if (!nombreTarea) return "Error: La tarea no puede estar vacía.";
        
        this.lista.push(nombreTarea);
        return `Tarea "${nombreTarea}" agregada.`;
    },

    // Uso de forEach para mayor claridad y rendimiento
    mostrar() {
        if (this.lista.length === 0) {
            console.log("No hay tareas pendientes.");
            return;
        }
        
        this.lista.forEach((tarea, idx) => {
            console.log(`${idx + 1}. ${tarea}`);
        });
    },

    // Refactorización con validación de índice
    eliminar(indice) {
        // Validamos que el índice exista dentro del arreglo
        if (indice >= 0 && indice < this.lista.length) {
            const eliminada = this.lista.splice(indice, 1);
            return `Eliminada: ${eliminada}`;
        }
        return "Error: Índice no válido.";
    },

    // Eliminamos la variable global totalTareas y usamos una función
    obtenerTotal() {
        return this.lista.length;
    }
};
// Ejemplo de uso:
GestorTareas.agregar("Aprender Git");
GestorTareas.agregar("Practicar jQuery");
GestorTareas.mostrar();
console.log("Total:", GestorTareas.obtenerTotal());