"use strict";

// -----------------------------
// Estado
// -----------------------------
let productos = [];

// -----------------------------
// Selectores
// -----------------------------
const imgProductos   = document.querySelectorAll("#productos img");
const ecomerce       = document.querySelector("#ecomerce");
const cargarProductos = document.querySelector("#mostrarProductos .modal-body");

// -----------------------------
// Helpers Storage
// -----------------------------
function leerStorage() {
    try {
        productos = JSON.parse(localStorage.getItem("productos")) || [];
    } catch (e) {
        productos = [];
    }
}

function sincronizarStorage() {
    localStorage.setItem("productos", JSON.stringify(productos));
}

function renderProductosEnModal() {
    if (!cargarProductos) return;

    cargarProductos.innerHTML = "";

    productos.forEach((nombre) => {
        cargarProductos.innerHTML += `
            <div class="col-md-4 mb-2">
                <img
                    data-alt="${nombre}"
                    alt="${nombre}"
                    class="imgObjectFit"
                    src="/img/${nombre}.png"
                />
            </div>
        `;
    });
}

function eliminarProducto(alt) {
    productos = productos.filter((p) => p !== alt);
    sincronizarStorage();
    renderProductosEnModal();
}

// -----------------------------
// Inicialización
// -----------------------------
document.addEventListener("DOMContentLoaded", () => {
    leerStorage();

    // Click en imágenes del listado
    imgProductos.forEach((img) => {
        img.addEventListener("click", (e) => {
            e.preventDefault();
            const alt = e.target?.alt;
            if (!alt) return;

            if (!productos.includes(alt)) {
                productos.push(alt);
                sincronizarStorage();
            }
        });
    });

    // Botón e-commerce: abrir modal y renderizar
    if (ecomerce && cargarProductos) {
        ecomerce.addEventListener("click", (e) => {
            e.preventDefault();
            window.$("#mostrarProductos").modal("toggle");
            renderProductosEnModal();
        });

        // Delegación: click en imagen dentro del modal → eliminar
        cargarProductos.addEventListener("click", (e) => {
            const target = e.target;
            if (!(target instanceof HTMLImageElement)) return;
            e.preventDefault();
            const alt = target.dataset.alt || target.alt;
            if (!alt) return;
            eliminarProducto(alt);
        });
    }
});