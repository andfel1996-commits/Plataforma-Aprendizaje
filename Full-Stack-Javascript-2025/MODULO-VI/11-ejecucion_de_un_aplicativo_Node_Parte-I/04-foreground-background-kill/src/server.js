/**
 * 04 - Foreground / Background / kill (script de práctica)
 * ------------------------------------------------------------
 * Este script es simple a propósito:
 * - imprime un mensaje cada 3 segundos
 * - se queda corriendo
 *
 * El foco de este ejercicio es aprender a controlarlo desde terminal:
 * - cómo ejecutarlo en background (&)
 * - cómo listar jobs (jobs)
 * - cómo obtener PID (ps)
 * - cómo detenerlo (kill)
 */

console.log("============================================================");
console.log("04 - Foreground / Background / kill (script de práctica)");
console.log("============================================================\n");

console.log("🚀 Proceso iniciado. Logs cada 3 segundos.");
console.log("📌 Si lo ejecuxtas en background, la terminal queda libre.");
console.log("🛑 Para detener: Ctrl + C (foreground) o kill <PID> (background).\n");

let i = 0;
setInterval(() => {
  i++;
  console.log(`Proceso vivo... (tick #${i})`);
}, 3000);
