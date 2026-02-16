import * as UI from "./dom/interfaz.js"

import {
  mostrarSpinner,
  ocultarSpinner,
  abrirModal,
  limpiarCards,
  pintarPeliculas
 } from "./utils/utilidades.js"

UI.spinner.style.display = "none";

// CONFIG
const apiKey = "4994b03d";
const PLACEHOLDER = "https://placehold.jp/300x400.png";

// ESTADO INICAL DE CARGA
let queryActual = "Queen"
let paginaActual = 1;
let cargando = false;



// BUSCAR PELICULAS
async function buscarPeliculas({ query, reset = false } = {} ){
  // Si hay una petición en curso , no hago otra 
  if( cargando ) return;
  // Si viene query , la guardo como queryActual
  if( query !== undefined) queryActual = query
  // reset = nueva busqueda => Limpio y vuelvo a page 1
  if(reset){
    paginaActual = 1;
    limpiarCards();
  }

  cargando = true;
  mostrarSpinner();

  try {
    // URL para la busqueda 
    const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${queryActual}&page=${paginaActual}`
    const resp = await fetch(url);
    if(!resp.ok){
      throw new Error(`Error HTTP: ${resp.status}`);
    }

    const data = await resp.json()
    if(data.Response === "False"){
      abrirModal(`<p>${data.Error || "No se encontraron resultados."}</p>`)
      return
    }

    pintarPeliculas(data.Search || [])

  } catch (error) {
      abrirModal(`<p>${error.message}</p>`)
  } finally{
    ocultarSpinner();
    cargando = false
  }

}

// EVENTOS
formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    const texto = input.value.trim()

    if(!texto){
      abrirModal("<p>Debes escribir un título o palabra para buscar</p>")
      input.focus();
      return
    }

    // Nueva Busqueda:
    buscarPeliculas({ query:texto, reset:true });


})

function cargarMas(){
  paginaActual += 1;
  buscarPeliculas();
}

async function verDetalle(imdbID){
  if(!imdbID) return 
  mostrarSpinner();

  try {
    const url = `https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}&plot=full`;
  const resp = await fetch(url);
  if(!resp.ok){
    throw new Error(`Error HTTP: ${resp.status}`);
  }
  const data = await resp.json()
  if(data.Response === "False"){
    abrirModal(`<p>${data.Error || "No se pudo cargar el detalle"}</p>`)
    return
  }

  const titulo = data.Title || "Sin título";
  const year   = data.Year || "-";
  const plot  = data.Plot || "Sin Resumen";
  const poster = data.Poster === "N/A" ? PLACEHOLDER : data.Poster

  abrirModal(`
       <div class="contenInfo">
        <img class="imgFitFullDetail" src="${poster}" alt="${titulo}">
        <div class="contentInfo__data">
          <div class="contentInfo__header">${titulo} (${year})</div>
        </div>
        <div class="contentInfo__data">
          <div class="contentInfo__header">Resumen</div>
          <div class="contentInfo__text">${plot}</div>
        </div>
      </div>
  `)
  } catch (error) {
     abrirModal(`<p>${error.message}</p>`)
  } finally{
    ocultarSpinner();
  }

  
}

window.addEventListener("scroll", () => {

  // Si ya esta cargando no disparo otra carga
  if(cargando) return 

  // Estoy cerca del final de la página ?
  const cercaDelFinal = window.innerHeight + window.scrollY >= document.body.offsetHeight - 50

  if(cercaDelFinal){
    cargarMas()
  }
})

UI.btnCargarMas.addEventListener("click", (e) => {
  e.preventDefault();
   cargarMas()
})

// Delegación de Eventos , para hacer click en "Ver Información"
UI.contenedor.addEventListener("click",(e) =>{
  const btn = e.target.closest("button[data-imdbid]")
  if(!btn) return
  const imdbid = btn.dataset.imdbid
  verDetalle(imdbid)
})

document.addEventListener("DOMContentLoaded", () => {
  UI.input.value = queryActual;
  buscarPeliculas({query:queryActual, reset:true})
})












