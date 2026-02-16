/**
 * logger.js
 * ----------
 * Un mini "logger" para imprimir:
 * - En la consola (console.log)
 * - Y también en el panel del HTML (para que se vea en vivo en proyector)
 *
 * ¿Por qué esto ayuda en la demo?
 * - El alumnado ve el resultado aunque no tenga abierta la consola.
 * - Pero igual podemos enseñar a usar la consola.
 */

const outputEl = typeof document !== "undefined" ? document.getElementById("output") : null;

/**
 * Imprime una línea de texto.
 */
export function logLine(text = "") {
  console.log(text);

  if (outputEl) {
    outputEl.textContent += String(text) + "\n";
  }
}

/**
 * Imprime un título visible (sección o subtítulo).
 */
export function logTitle(title) {
  const line = "=".repeat(60);
  logLine("");
  logLine(line);
  logLine(title);
  logLine(line);
}

/**
 * Formatea objetos de manera legible (JSON).
 * - Esto es útil para que el alumnado vea estructuras claramente.
 */
export function logObject(label, obj) {
  const pretty = JSON.stringify(obj, null, 2);
  logLine(`${label}:\n${pretty}`);
}

/**
 * Limpia salida en pantalla (si existe).
 */
export function clearOutput() {
  if (outputEl) outputEl.textContent = "";
  console.clear();
}
