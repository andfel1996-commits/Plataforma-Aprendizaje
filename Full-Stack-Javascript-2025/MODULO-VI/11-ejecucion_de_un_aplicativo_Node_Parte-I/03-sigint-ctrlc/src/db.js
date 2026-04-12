/**
 * src/db.js
 * ============================================================
 * “Base de datos” simulada para practicar cierre limpio.
 * ============================================================
 *
 * En un proyecto real, connect/disconnect serían:
 * - conectar a Postgres/MySQL/Mongo
 * - cerrar pool de conexiones
 *
 * Aquí lo simulamos con:
 * - una variable `connected`
 * - demoras artificiales con setTimeout (para “ver” el orden)
 */

// Estado interno (privado del módulo)
// - true  => “DB conectada”
// - false => “DB desconectada”
let connected = false;

/**
 * connect()
 * ------------------------------------------------------------
 * Simula conectarse a una DB.
 * - En la vida real: abrir conexión / pool.
 * - Aquí: esperamos un poco y marcamos connected=true.
 */
export async function connect() {
  // Si ya está conectada, no hacemos nada (idempotente)
  if (connected) return;

  // Simulamos tiempo de conexión (latencia)
  await delay(600);

  connected = true;
}

/**
 * disconnect()
 * ------------------------------------------------------------
 * Simula desconectarse de la DB.
 * - En la vida real: cerrar pool, liberar recursos.
 * - Aquí: esperamos un poco y marcamos connected=false.
 */
export async function disconnect() {
  // Si ya está desconectada, no hacemos nada
  if (!connected) return;

  // Simulamos tiempo de desconexión
  await delay(600);

  connected = false;
}

/**
 * isConnected()
 * ------------------------------------------------------------
 * Permite consultar desde server.js el estado actual.
 * Útil para responder en una ruta de prueba.
 */
export function isConnected() {
  return connected;
}

/**
 * delay(ms)
 * ------------------------------------------------------------
 * Helper para “esperar” sin bloquear el hilo de Node.
 * Ojo: esto es asíncrono (no bloqueante).
 */
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}