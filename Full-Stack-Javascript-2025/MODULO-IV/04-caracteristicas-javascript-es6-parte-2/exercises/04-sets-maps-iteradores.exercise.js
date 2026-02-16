/**
 * EJERCICIO 04 — Sets, Maps e Iteradores
 * -------------------------------------
 * Objetivo:
 * 1) Usar Set para eliminar duplicados de un array
 * 2) Usar Map para asociar clave → valor
 * 3) Recorrer con for...of
 * 4) Crear un generator simple
 */

export function runExercise04() {
  console.log("=== EJERCICIO 04 ===");

  const tags = ["js", "css", "js", "html", "css", "react"];

  // TODO 1: crea un Set a partir de tags para eliminar duplicados
  const tagsUnicos = null;

  // TODO 2: convierte el Set a array nuevamente (spread)
  const tagsArray = null;

  console.log("Tags únicos:", tagsArray);

  // TODO 3: crea un Map llamado stockPorProducto
  const stockPorProducto = null;

  // TODO 4: agrega 2 productos al map (ej: "Mouse" → 5, "Teclado" → 2)
  // stockPorProducto.set(...)

  // TODO 5: recorre el map con for...of e imprime:
  // "Mouse tiene stock 5"
  // ...

  // TODO 6: crea un generator idGenerator() que retorne "ID-1", "ID-2", etc.
  function* idGenerator() {
    // ...
  }

  const gen = idGenerator();
  console.log(gen.next().value);
  console.log(gen.next().value);

  console.log("=== FIN EJERCICIO 04 ===");
}
