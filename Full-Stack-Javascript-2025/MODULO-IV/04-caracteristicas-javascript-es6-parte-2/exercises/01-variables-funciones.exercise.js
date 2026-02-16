/**
 * EJERCICIO 01 — Variables y Funciones (ES6+)
 * ------------------------------------------
 * Objetivo:
 * 1) Reemplazar var por let/const correctamente
 * 2) Usar template literals
 * 3) Crear 2 arrow functions
 * 4) Usar parámetros por defecto
 *
 * Instrucciones:
 * - Completa los TODO.
 * - Al final ejecuta runExercise01() y revisa consola.
 */

export function runExercise01() {
  console.log("=== EJERCICIO 01 ===");

  // TODO 1: cambia var por const (no se reasigna)
  var curso = "JavaScript Moderno";
  // curso = "Otro curso"; // (descomenta si quieres probar reasignación)

  // TODO 2: cambia var por let (sí se reasigna)
  var claseNumero = 2;
  claseNumero = 3;

  // TODO 3: usa template literal para construir un mensaje:
  // "Curso: JavaScript Moderno | Clase: 3"
  const mensaje = "TODO";
  console.log(mensaje);

  // TODO 4: crea una arrow function llamada "multiplicar" que retorne a*b
  const multiplicar = null;

  // TODO 5: crea una función con parámetro por defecto:
  // saludar(nombre = "Invitado") → "Hola, <nombre>"
  const saludar = null;

  console.log("multiplicar(4, 5) =", multiplicar(4, 5));
  console.log(saludar("Ana"));
  console.log(saludar());

  console.log("=== FIN EJERCICIO 01 ===");
}
