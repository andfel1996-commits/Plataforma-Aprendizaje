import { generarId, normalizarTexto, logDocente } from "./utils.js";
import { mostrarEstado, renderizarLista } from "./dom.js";
import { guardarTareas, obtenerTareas } from "./fakeApi.js";

let tareas = []

const formulario = document.getElementById("formulario-tarea");
const lista = document.getElementById("lista-tareas");
const entrada = document.getElementById("entrada-tarea");
const btnCargarDemo = document.getElementById("btn-cargar-demo");

function render() {
    renderizarLista(tareas)
}

function agregarTareaDesdeInput() {
    const texto = normalizarTexto(entrada.value)

    if (!texto) {
        mostrarEstado({ texto: "Escribe una tarea antes de agregar", tipo: "error" })
        entrada.focus();
        return
    }

    tareas.unshift({
        id: generarId(),
        texto,
        estado: "activa"
    })

    entrada.value = "";
    mostrarEstado({ texto: "Tarea agregado", tipo: "ok" })
    render();
    guardarEnServidorAsync()
}

async function cargarTareasDemoAsync() {

    mostrarEstado({ texto: "Cragando tareas demo ...", tipo: "cargando" })

    try {
        tareas = await obtenerTareas()
        logDocente("Cargar OK", { total: tareas.length })
        mostrarEstado({ texto: "Tareas demo cargadas ...", tipo: "ok" })
        render()
    } catch (error) {
        console.error("[ERROR] cargarTareasDemoAsync:", error);
        mostrarEstado({ texto: "Error al cargar tareas demo.", tipo: "error" });
    }
}

async function guardarEnServidorAsync() {

    mostrarEstado({ texto: "Guardando ...", tipo: "cargando" })

    try {
        const resultado = await guardarTareas(tareas)
        logDocente("Guardar OK", resultado)
        mostrarEstado({ texto: "Guardado OK.", tipo: "ok" });
    } catch (error) {
        console.error("[ERROR] guardarEnServidorAsync()", error)
        mostrarEstado({ texto: "No se pudo guardar (local OK).", tipo: "error" })
    }
}



function menejarClickEnLista(evento) {

    evento.preventDefault()

    logDocente("Click lista",{
        target : evento.target.tagName,
        currentTarget: evento.currentTarget.tagName
    })

    const boton = evento.target.closest("button[data-accion]");
    if (!boton) return

    const li = boton.closest("li.item")
    if (!li) return

    const id = li.dataset.id
    const accion = boton.dataset.accion

    console.log('Salida de mierda-->', id)
    if (accion === "toggle") toggleEstado(id)
    if (accion === "eliminar") eliminarTarea(id, li)

}

function toggleEstado(id) {
    // console,log( 'Salida de id-->', id )
    const tarea = tareas.find(t => t.id === id)
    if (!tarea) return
    // Cambiar el estado 
    tarea.estado = tarea.estado === "activa" ? "completada" : "activa";
    // FeedBack
    mostrarEstado({ texto: "Estado Actualizado.", tipo: "Ok" })
    //Actulizamos UI
    render()
    // Nos Falta guardar en el server la tarea simulando la Asyncronia
    guardarEnServidorAsync();
}

function eliminarTarea(id, nodoLi) {
    tareas = tareas.filter(t => t.id !== id)
    // Quitando el li con remove()
    if (nodoLi?.remove) nodoLi.remove()

    if (!nodoLi?.remove && lista.contains(nodoLi)) {
        lista.removeChild(nodoLi)
    }

    mostrarEstado({ texto: "Tarea Eliminada ", tipo: "Ok" })
    render()
    // Nos Falta guardar en el server la tarea simulando la Asyncronia
    guardarEnServidorAsync();
}


function iniciar() {
    logDocente("App iniciada", "Abre la consola")
    render()
    mostrarEstado({ texto: "Listo. Agrega una tarea o carga demo", tipo: "ok" })

    formulario.addEventListener('submit', (e) => {
        e.preventDefault()
        agregarTareaDesdeInput();
    })

    btnCargarDemo.addEventListener("click", cargarTareasDemoAsync)

    lista.addEventListener('click', menejarClickEnLista)

}

iniciar()


