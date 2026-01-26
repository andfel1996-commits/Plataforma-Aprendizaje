/* ==========================================================
   DESAFÍO (SOLUCIÓN) — MINI TIENDA: PERFIL + CUPÓN + TICKET
   ========================================================== */

const catalogo = [
  { id: 1, nombre: "Café Molido", categoria: "Bebidas", precioTexto: "$3.490", stock: 12 },
  { id: 2, nombre: "Galletas de Avena", categoria: "Snacks", precioTexto: "$1.990", stock: 8 },
  { id: 3, nombre: "Chocolate 70%", categoria: "Snacks", precioTexto: "$2.790", stock: 5 },
  { id: 4, nombre: "Té Verde", categoria: "Bebidas", precioTexto: "$2.490", stock: 10 },
];

function enteroAleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function normalizarTexto(texto) {
  let t = String(texto);
  t = t.trim();
  t = t.toLowerCase();
  t = t.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  t = t.replace(/\s+/g, ".");
  t = t.replace(/\.+/g, ".");
  return t;
}

function extraerNumeroDesdeTexto(textoPrecio) {
  const grupos = String(textoPrecio).match(/\d+/g);
  if (!grupos) return NaN;
  return Number(grupos.join(""));
}

function crearUsuario(nombre, apellido) {
  return {
    nombre: nombre,
    apellido: apellido,
    "nombre completo": nombre + " " + apellido,

    getUsername: function () {
      const base = normalizarTexto(this.nombre) + "." + normalizarTexto(this.apellido);
      const num = String(enteroAleatorio(0, 999)).padStart(3, "0");
      return base + num;
    },
  };
}

function seleccionarProductoAleatorio(catalogo) {
  const idx = enteroAleatorio(0, catalogo.length - 1);
  return catalogo[idx];
}

function crearTicketCompra(params) {
  return {
    idTicket: "TCK-" + String(enteroAleatorio(0, 999999)).padStart(6, "0"),
    fecha: new Date().toLocaleString(),

    usuario: params.usuario,
    producto: params.producto,
    cantidad: params.cantidad,

    precioUnitario: extraerNumeroDesdeTexto(params.producto.precioTexto),
    descuentoPorcentaje: params.descuentoPorcentaje,

    calcularTotal: function () {
      const subtotal = this.precioUnitario * this.cantidad;
      const descuento = subtotal * (this.descuentoPorcentaje / 100);
      return Math.round(subtotal - descuento);
    },

    resumen: function () {
      return (
        "Ticket: " + this.idTicket + "\n" +
        "Fecha: " + this.fecha + "\n" +
        "Cliente: " + String(this.usuario["nombre completo"]).trim() + "\n" +
        "Producto: " + this.producto.nombre + " (" + this.producto.categoria + ")\n" +
        "Cantidad: " + this.cantidad + "\n" +
        "Precio unitario: " + this.precioUnitario + "\n" +
        "Descuento: " + this.descuentoPorcentaje + "%\n" +
        "TOTAL: " + this.calcularTotal() + "\n"
      );
    },
  };
}

/* PRUEBA */
const usuario = crearUsuario("  José  ", "  Pérez  ");
const producto = seleccionarProductoAleatorio(catalogo);
const cantidad = enteroAleatorio(1, 3);
const descuento = enteroAleatorio(5, 20);

const ticket = crearTicketCompra({
  usuario,
  producto,
  cantidad,
  descuentoPorcentaje: descuento,
});

console.log(ticket.resumen());
console.log(extraerNumeroDesdeTexto("$12.990"));
console.log(extraerNumeroDesdeTexto("Precio: 4990 CLP"));
