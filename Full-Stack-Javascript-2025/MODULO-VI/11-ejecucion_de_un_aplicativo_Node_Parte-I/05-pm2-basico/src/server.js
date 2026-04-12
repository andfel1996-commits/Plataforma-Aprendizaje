/**
 * 05 - PM2 (script de práctica)
 * ------------------------------------------------------------
 * PM2 es un "Process Manager" (gestor de procesos).
 * Lo usamos para:
 * - mantener apps vivas
 * - reiniciar si se caen
 * - ver logs y estado
 *
 * Este script solo imprime mensajes cada 3 segundos.
 * Lo importante es el uso de PM2.
 */

console.log("============================================================");
console.log("05 - PM2 básico (script de práctica)");
console.log("============================================================\n");

console.log("🚀 Proceso corriendo (ideal para manejar con PM2).");
console.log("⏱️  Logs cada 3 segundos...\n");

let i = 0;
setInterval(() => {
  i++;
  console.log(`PM2 demo: proceso vivo... (tick #${i})`);
}, 3000);

/**
 * BONUS: SIGTERM
 * ------------------------------------------------------------
 * Cuando PM2 (o el sistema) pide detener un proceso,
 * normalmente envía SIGTERM (señal de terminación).
 * Capturarla permite cerrar de forma ordenada.
 */
process.on("SIGTERM", () => {
  console.log("\n🛑 SIGTERM recibido (PM2/OS). Cerrando limpio...");
  process.exit(0);
});
