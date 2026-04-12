const imprimir = async () => {
    try {
        const response = await fetch('/tareas');
        // Si el backend responde con error (404/500/etc), evitamos fallar en silencio
    
        if(!response.ok){
            throw new Error(`Error HTTP ${response.status} al cargar las tareas`);
        }

        const data = await response.json();
        console.log('Salida de data->', data);

        const printTareas = document.querySelector("#printTareas")
        printTareas.innerHTML = "";
        
        let numEdit = 0;
        let html = "";
        data.forEach( element =>{
      
            numEdit++
            html +=`<tr>
          <td class="whiteSpace">${element.titulo}</td>
          <td>${element.descripcion}</td>
          <td class="whiteSpace">
            <div class="containerButton">
              <button
                data-editarTareas-number="${numEdit}"
                type="button"
                class="btn btn-warning btn-sm d-block me-2 editarTarea"
              >
                <i class="bi bi-pencil-square me-2"></i>Editar
              </button>

              <button
                data-eliminarTarea-number="${numEdit}"
                type="button"
                class="btn btn-danger btn-sm d-block eliminarTarea"
              >
                <i class="bi bi-trash3 me-2"></i>Eliminar
              </button>
            </div>
          </td>
        </tr>`
        })
        printTareas.innerHTML = html;
    } catch (error) {
        console.log(error)
    }
}

export default imprimir