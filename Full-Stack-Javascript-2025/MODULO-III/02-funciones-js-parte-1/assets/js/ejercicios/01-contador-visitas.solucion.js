/* ==========================================================
   EJERCICIO 1 — CONTADOR DE VISITAS (SOLUCIÓN)
   ========================================================== */

console.log("\n=== EJERCICIO 1 (SOLUCIÓN): Contador de visitas ===\n");

// 1) Variable GLOBAL (afuera de la función)
// - Se puede usar desde cualquier parte del archivo.
let visitas = 0;

// 2) Función declarada con un nombre claro
function incrementarVisitas() {
  // 3) Incrementamos visitas en 1
  // Forma larga:
  visitas = visitas + 1;

  // (Ojo: también existe visitas++ pero aquí lo dejamos súper explícito)

  // 4) Mostramos el resultado
  console.log("Número de visitas:", visitas);
}

// 5) Probamos llamando la función varias veces
incrementarVisitas(); // 1
incrementarVisitas(); // 2
incrementarVisitas(); // 3

console.log("\n=== FIN EJERCICIO 1 (SOLUCIÓN) ===\n");
