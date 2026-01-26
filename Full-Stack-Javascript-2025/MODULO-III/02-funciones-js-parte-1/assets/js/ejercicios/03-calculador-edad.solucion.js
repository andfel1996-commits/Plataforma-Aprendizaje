/* ==========================================================
   EJERCICIO 3 — CALCULADOR DE EDAD (SOLUCIÓN)
   ========================================================== */

console.log("\n=== EJERCICIO 3 (SOLUCIÓN): Calculador de edad ===\n");

// 1) Función con nombre + parámetro
function calcularEdad(anioNacimiento) {
  // 2) Obtenemos el año actual
  const anioActual = new Date().getFullYear();

  // 3) Calculamos la edad
  const edad = anioActual - anioNacimiento;

  // 4) Devolvemos el valor
  return edad;
}

// 5) Usamos la función
const edadEjemplo = calcularEdad(2000);

// 6) Mostramos el resultado
console.log("Edad calculada:", edadEjemplo);

console.log("\n=== FIN EJERCICIO 3 (SOLUCIÓN) ===\n");
