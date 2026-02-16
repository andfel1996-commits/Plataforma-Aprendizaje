// selector => document.querySelectorAll( selector )
export const funcionQuerySelectorAll =  ( selector ) => document.querySelectorAll( selector )

// otra forma sleccionado por getElementById
export function porId(id){
    return document.getElementById(id)
}

// Mostrar estados en la Interfaz UI por ejemplo cargado / OK / error 
export function mostrarEstado(  {texto , tipo}  ){
    const caja = porId("estado-ui")
    caja.textContent = texto || "";
    caja.classList.remove("cargando", "ok", "error");
    if(tipo ) caja.classList.add(tipo)
}

// Funcion para crear Elemento Tarea que esta dentro de un li
function crearElementoTarea( tarea ){

   // const obj = { id:"6363", texto:"Pasear al perro", estado:"completada"}

    const li = document.createElement("li");
    li.className = "item";
    if( tarea.estado === "completada") li.classList.add("completada")
    li.dataset.id = tarea.id

    li.dataset.id = tarea.id
    li.dataset.estado = tarea.estado

    // <li data-id="1769819237795-5176" data-estado="completada">
    //      <span class="texto-tarea">Correr</span>
    // </li>

    li.setAttribute("aria-label", "Esto es otra tarea")
    li.getAttribute("aria-label") // Esto es otra tarea

    // Texto Principal
    const spanTexto = document.createElement('span')
    spanTexto.className = "texto-tarea";
    spanTexto.textContent = tarea.texto;

    const badge = document.createElement('span');
    badge.className = "badge";
    badge.textContent = tarea.estado === "completada" ? "Completada" : "Activa";

    const btnCompletar = document.createElement("button") // <button></button>
    btnCompletar.type = "button"; // <button type="button"></button>
    btnCompletar.className = "btn-accion" // <button type="button" class="btn-accion">  </button>
    btnCompletar.textContent = tarea.estado === "completado" ? "Reabrir" : "Completar" // <button type="button" class="btn-accion"> Reabrir </button>
    btnCompletar.dataset.accion = "toggle";

    // Eliminar
    const btnEliminar = document.createElement("button");
    btnEliminar.type = "button";
    btnEliminar.className = "btn-accion";
    btnEliminar.textContent = "Eliminar";
    btnEliminar.dataset.accion = "eliminar"

    li.appendChild(spanTexto);
    li.appendChild(badge);
    li.appendChild(btnCompletar);
    li.appendChild(btnEliminar);

    return li
}


export function renderizarLista( tareas ){
    // {}
    const ul = porId("lista-tareas")
    ul.textContent = ""

    if( !tareas || tareas.length === 0){
        const liVacio = document.createElement("li")
        liVacio.className = "muted";
        liVacio.textContent = "No hay tareas aun. Agrega la primera"
        ul.appendChild(liVacio)
        return 
    }

    for(const tarea of tareas){
        ul.appendChild( crearElementoTarea( tarea ) );
    }



}










