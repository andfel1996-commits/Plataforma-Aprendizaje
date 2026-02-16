/* ==========================================================
   EJERCICIO 02 (ALUMNO) — Productos con Objetos + JSON
   ==========================================================
   Contexto:
   Una tienda online necesita gestionar productos. Usaremos:
   - notación de objetos (objetos literales)
   - un método por producto: aplicarDescuento(porcentaje)
   - conversión a JSON para “guardar/enviar” datos

   Consigna:
   1) Crear un array "productos" con al menos 3 productos (objetos).
      Cada producto debe tener:
      - nombre (string)
      - precio (number)
      - stock  (number)
      - aplicarDescuento(porcentaje) (función)
   2) Aplicar un descuento del 10% al primer producto.
   3) Convertir todo el array a JSON con JSON.stringify()
      - usar null, 2 para formato bonito
   4) Validar el JSON con JSONLint (manual, online)

   Importante:
   - JSON NO guarda métodos (funciones). Al stringify, aplicarDescuento no aparecerá.
   ========================================================== */

function separador() {
  console.log("------------------------------------------------------------");
}

/* ==========================================================
   PASO 1) Crear array de productos (objetos literales)
   ========================================================== */

// TODO 1: Crea el array "productos" con 3 objetos.
// Cada objeto debe tener:
// nombre, precio, stock, aplicarDescuento(porcentaje)
const productos = [
  // TODO: producto 1
  // {
  //   nombre: "...",
  //   precio: 0,
  //   stock: 0,
  //   aplicarDescuento: function(porcentaje){ ... }
  // },
  // TODO: producto 2
  // TODO: producto 3
];

/* ==========================================================
   PASO 2) Aplicar descuento al primer producto
   ========================================================== */

// TODO 2: Aplica 10% de descuento al producto 0
// productos[0].aplicarDescuento(10);

separador();
console.log("Productos luego de aplicar descuento al primero:");
console.log(productos);
separador();

/* ==========================================================
   PASO 3) Convertir a JSON
   ========================================================== */

const productosJSON = JSON.stringify(productos, null, 2);

console.log("JSON generado (nota: no aparecerán métodos):");
console.log(productosJSON);
separador();

/* ==========================================================
   PASO 4) Validar JSON (manual)
   ==========================================================
   1) Copia el JSON de consola
   2) Pégalo en JSONLint
   3) Verifica que sea válido
   ========================================================== */
