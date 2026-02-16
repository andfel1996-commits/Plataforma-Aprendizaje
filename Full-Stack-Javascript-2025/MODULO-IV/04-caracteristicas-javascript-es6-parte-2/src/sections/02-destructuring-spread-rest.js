/**
 * 02-destructuring-spread-rest.js
 * ------------------------------
 * Objetivo: manipular datos de forma moderna y expresiva:
 * - Destructuring (arrays/objetos)
 * - Spread (...) para copiar/combinar
 * - Rest (...) para recoger "lo que sobra"
 *
 * Contexto: tenemos productos y queremos construir un carrito simple.
 */

import { logTitle, logLine, logObject } from "../utils/logger.js";

export function run02_DestructuringSpreadRest() {
  logTitle("2) Destructuring, Spread y Rest");

  const productos = [
    { id: 1, nombre: "Mouse", precio: 12990, stock: 5 },
    { id: 2, nombre: "Teclado", precio: 24990, stock: 2 },
    { id: 3, nombre: "Monitor", precio: 129990, stock: 1 },
  ];

  logObject("Productos (base)", productos);

  /**
   * (A) Destructuring de objetos
   * - Extraemos propiedades a variables con el mismo nombre.
   * - También podemos RENOMBRAR variables.
   */
  const primerProducto = productos[0];

  // Extraemos nombre y precio. También renombramos stock -> stockDisponible
  const { nombre, precio, stock: stockDisponible } = primerProducto;

  logLine(`Destructuring objeto → nombre: ${nombre}, precio: ${precio}, stockDisponible: ${stockDisponible}`);

  /**
   * (B) Destructuring de arrays
   * - Extraemos por posición.
   */
  const [p1, p2] = productos; // toma los 2 primeros
  logLine(`Destructuring array → p1: ${p1.nombre}, p2: ${p2.nombre}`);

  /**
   * (C) Spread (...) para copiar/combinar
   * - Muy usado para no mutar el original (inmutabilidad).
   */

  // Copia superficial (shallow copy) del array
  const productosCopia = [...productos];

  // Copia superficial de un objeto, y además cambiamos stock
  const monitorSinStock = { ...productos[2], stock: 0 };

  logObject("productosCopia (array)", productosCopia);
  logObject("monitorSinStock (obj)", monitorSinStock);

  /**
   * (D) Spread para combinar arrays
   */
  const nuevosProductos = [
    { id: 4, nombre: "Webcam", precio: 39990, stock: 3 },
  ];

  const catalogoCompleto = [...productos, ...nuevosProductos];
  logObject("Catálogo completo (productos + nuevosProductos)", catalogoCompleto);

  /**
   * (E) Rest (...) para capturar "lo que sobra"
   * - En arrays: capturamos el resto.
   * - En objetos: capturamos las propiedades restantes.
   */

  // Rest en arrays
  const [primero, ...resto] = catalogoCompleto;
  logLine(`Primero: ${primero.nombre}`);
  logLine(`Resto (cantidad): ${resto.length}`);

  // Rest en objetos
  const { id, ...detalleSinId } = primero;
  logObject("detalleSinId (objeto sin id)", detalleSinId);

  /**
   * (F) Rest en parámetros de función
   * - Permite recibir una cantidad variable de argumentos.
   */
  const totalCarrito = (...items) => {
    // items es un array con todo lo que pasó como argumento
    return items.reduce((acc, item) => acc + item.precio, 0);
  };

  const total = totalCarrito(p1, p2);
  logLine(`Total carrito (p1 + p2): ${total}`);

  logLine("");
  logLine("Idea clave: destructuring/spread/rest simplifican manejar datos (muy común en React/Next.js).");
}
