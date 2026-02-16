/**
 * EJERCICIO 03 — Clases y Módulos (mini práctica)
 * ----------------------------------------------
 * Objetivo:
 * 1) Crear una clase Producto con constructor(nombre, precio)
 * 2) Agregar método info() que retorne: "<nombre> - $<precio>"
 * 3) Crear una clase Carrito que:
 *    - tenga un array items
 *    - método add(producto)
 *    - método total() que sume precios
 *
 * Nota: acá no usamos módulos separados para no enredar;
 * la demo sí tiene módulos reales.
 */

export function runExercise03() {
  console.log("=== EJERCICIO 03 ===");

  // TODO 1: crea class Producto
  class Producto {
    // TODO: constructor...
    // TODO: info()...
  }

  // TODO 2: crea class Carrito
  class Carrito {
    // TODO: constructor...
    // TODO: add(producto)...
    // TODO: total()...
  }

  const mouse = new Producto("Mouse", 12990);
  const teclado = new Producto("Teclado", 24990);

  console.log(mouse.info());
  console.log(teclado.info());

  const carrito = new Carrito();
  carrito.add(mouse);
  carrito.add(teclado);

  console.log("Total carrito:", carrito.total());

  console.log("=== FIN EJERCICIO 03 ===");
}
