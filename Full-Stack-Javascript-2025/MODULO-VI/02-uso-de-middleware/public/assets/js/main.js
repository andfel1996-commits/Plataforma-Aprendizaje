// app.js

// Esperamos a que cargue el DOM antes de buscar elementos
document.addEventListener("DOMContentLoaded", () => {
  const btnSaludar = document.getElementById("btnSaludar");
  const estado = document.getElementById("estado");

  const formDemo = document.getElementById("formDemo");
  const inputNombre = document.getElementById("nombre");
  const resultado = document.getElementById("resultado");

  // 1) Botón: probar JS
  btnSaludar.addEventListener("click", () => {
    const ahora = new Date();
    estado.textContent = `JS funcionando ✅ (${ahora.toLocaleTimeString()})`;
  });

  // 2) Formulario: captura y muestra mensaje
  formDemo.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = inputNombre.value.trim();
    if (!nombre) return;

    resultado.classList.remove("d-none");
    resultado.textContent = `Hola ${nombre}, tu formulario se procesó con JS (sin recargar).`;

    // Limpia el input y enfoca de nuevo
    inputNombre.value = "";
    inputNombre.focus();
  });
});
