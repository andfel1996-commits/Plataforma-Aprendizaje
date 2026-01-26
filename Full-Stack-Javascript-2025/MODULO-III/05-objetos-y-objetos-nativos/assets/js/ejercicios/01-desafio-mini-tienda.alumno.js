/* ==========================================================
   DESAFÍO (ALUMNO) — MINI TIENDA: PERFIL + CUPÓN + TICKET
   ----------------------------------------------------------
   CONTEXTO:
   Estás construyendo una mini app en consola para una tienda.
   La tienda quiere:
   1) Registrar un usuario (objeto) con métodos.
   2) Elegir un producto aleatorio desde un catálogo (array de objetos).
   3) Generar un “ticket” de compra (objeto) con un método resumen().
   4) Usar Math y String (objetos nativos) para:
      - Aleatorios (Math.random + Math.floor)
      - Redondeos (Math.round)
      - Limpieza de texto (trim, toLowerCase, replace)
      - Quitar acentos (normalize + regex)
      - Extraer números desde texto (match)
   ----------------------------------------------------------
   OBJETIVO:
   Integrar TODO lo visto en las dos clases:
   - Objetos (propiedades/métodos), punto/corchetes, delete
   - Objetos nativos: Math + String (+ Date opcional)
   - Arrays y funciones
   ----------------------------------------------------------
   INSTRUCCIONES:
   Completa los TODO en orden.
   Al final, descomenta los casos de prueba.
   ========================================================== */

const catalogo = [
  { id: 1, nombre: "Café Molido", categoria: "Bebidas", precioTexto: "$3.490", stock: 12 },
  { id: 2, nombre: "Galletas de Avena", categoria: "Snacks", precioTexto: "$1.990", stock: 8 },
  { id: 3, nombre: "Chocolate 70%", categoria: "Snacks", precioTexto: "$2.790", stock: 5 },
  { id: 4, nombre: "Té Verde", categoria: "Bebidas", precioTexto: "$2.490", stock: 10 },
];

function enteroAleatorio(min, max) {
  // TODO
}

function normalizarTexto(texto) {
  // TODO
}

function extraerNumeroDesdeTexto(textoPrecio) {
  // TODO
}

function crearUsuario(nombre, apellido) {
  // TODO
}

function seleccionarProductoAleatorio(catalogo) {
  // TODO
}

function crearTicketCompra(params) {
  // TODO
}

// const usuario = crearUsuario("  José  ", "  Pérez  ");
// const producto = seleccionarProductoAleatorio(catalogo);
// const cantidad = enteroAleatorio(1, 3);
// const descuento = enteroAleatorio(5, 20);

// const ticket = crearTicketCompra({
//   usuario,
//   producto,
//   cantidad,
//   descuentoPorcentaje: descuento,
// });

// console.log(ticket.resumen());
// console.log(extraerNumeroDesdeTexto("$12.990"));
// console.log(extraerNumeroDesdeTexto("Precio: 4990 CLP"));
