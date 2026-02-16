import * as UI from "../dom/interfaz.js"

// Funciones UI
export function mostrarSpinner(){
  UI.spinner.style.display = "flex"
}

export function ocultarSpinner(){
    UI.spinner.style.display = "none"
}

export function abrirModal(html){
  UI.mensaje.innerHTML = html
  UI.modal.show();
}

export function limpiarCards(){
  UI.contenedor.innerHTML = "";
}

// Funcion de render 
export function pintarPeliculas( lista ){

  let html = "";
  lista.forEach(( peli ) => {

    const titulo = peli.Title;
    const year   = peli.Year;
    const poster = peli.Poster === "N/A" ? PLACEHOLDER : peli.Poster
    const imdbID = peli.imdbID

  
    html += `<div class="col-12 col-md-3 my-3">
        <div class="card mb-4 h-100">
          <img class="imgFitFull" src="${poster}" alt="${titulo}">
          <div class="card-body">
            <div class="info-card">
              <h5 class="card-title">${titulo}</h5>
              <img src="./assets/img/estrellas.png" class="d-block my-3" alt="Estrellas">
              <p class="precio"><span class="u-pull-right">Año ${year}</span></p>
              <hr>
              <div class="d-grid gap-2">
                <!-- Guardamos el imdbID en data-imdbid -->
                <button type="button" class="btn btn-warning" data-imdbid="${imdbID}">
                  Ver información
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>`
  })

  UI.contenedor.insertAdjacentHTML("beforeend", html )
}

