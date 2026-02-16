/**
 * EJERCICIO 02 — Destructuring, Spread, Rest
 * -----------------------------------------
 * Contexto: tenemos un carrito de compras.
 *
 * Objetivo:
 * 1) Destructuring de objetos y arrays
 * 2) Spread para copiar y combinar
 * 3) Rest para capturar el resto
 * 4) Rest parameters en función
 */

export function runExercise02() {
  console.log("=== EJERCICIO 02 ===");

  const productos = [
    { id: 1, nombre: "Mouse", precio: 12990 },
    { id: 2, nombre: "Teclado", precio: 24990 },
    { id: 3, nombre: "Monitor", precio: 129990 },
  ];

  // TODO 1: destructuring del primer producto para obtener nombre y precio
  const primerProducto = productos[0];
  const nombre = "TODO";
  const precio = "TODO";
  console.log("Primer producto:", nombre, precio);

  // TODO 2: destructuring del array para obtener p1 y p2
  const p1 = null;
  const p2 = null;
  console.log("p1:", p1.nombre, "| p2:", p2.nombre);

  // TODO 3: usa spread para crear un nuevo array que incluya productos + uno nuevo
  const nuevo = { id: 4, nombre: "Webcam", precio: 39990 };
  const catalogo = null;
  console.log("Catálogo:", catalogo.length);

  // TODO 4: usa rest para separar el primero del resto del catálogo
  const primero = null;
  const resto = null;
  console.log("Primero:", primero.nombre, "| resto:", resto.length);

  // TODO 5: crea una función total(...items) que sume precios usando rest parameters
  const total = null;

  console.log("Total (p1, p2):", total(p1, p2));

  console.log("=== FIN EJERCICIO 02 ===");
}
