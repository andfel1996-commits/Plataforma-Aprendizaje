/**
 * ============================================================
 * 01 - LEVANTAR UNA APLICACIÓN NODE.JS
 * ============================================================
 *
 * CÓMO EJECUTAR ESTE ARCHIVO:
 *   Opción A (directo):  node src/app.js
 *   Opción B (con npm):  npm start          (lee el package.json)
 *
 * ¿QUÉ ES UN PROCESO?
 *   Cuando ejecutas "node src/app.js", el sistema operativo crea un
 *   PROCESO: un programa en ejecución con su propio PID (número de
 *   identificación). Puedes verlo con: ps aux | grep node
 *
 * CONCEPTO CLAVE — El Event Loop:
 *   Node.js NO corre línea a línea y se va. En realidad, después de
 *   ejecutar el código, revisa si hay "tareas pendientes":
 *
 *   ┌─────────────────────────────────────────────────────┐
 *   │  ¿Hay timers, servidores o I/O activos?             │
 *   │  NO  →  Node termina solo (proceso muere, PID libre)│
 *   │  SÍ  →  Node se queda esperando (proceso vivo)      │
 *   └─────────────────────────────────────────────────────┘
 *
 * EJEMPLOS de cosas que mantienen vivo a Node:
 *   - setInterval / setTimeout  (timers)
 *   - server.listen(puerto)     (servidor HTTP)
 *   - fs.watch(ruta)            (vigilar archivos)
 *   - conexiones de base de datos abiertas
 *
 * DEMO DE CLASE:
 *   Paso 1 → Ejecuta con mantenerVivo = true   (proceso queda vivo)
 *   Paso 2 → Cambia a  mantenerVivo = false    (proceso termina solo)
 *   Así verás la diferencia de comportamiento EN VIVO.
 */

/**
 * Le explicas una sola idea central, demostrada en vivo con dos casos:

La idea central
"Node.js no siempre termina cuando llega al final del archivo. Depende de si dejó trabajo pendiente."

Lo que dices y haces en orden
1. Antes de ejecutar nada, señalas el código y explicas:

"Este archivo tiene un interruptor: mantenerVivo. Con true simula lo que hace un servidor real. Con false simula un script simple que hace su trabajo y se va."

2. Ejecutas con true (npm start):

"Miren, la terminal quedó bloqueada. Node está vivo. Puedo ver los ticks cada 3 segundos. Si cierro VS Code ahora, el proceso sigue corriendo en el sistema operativo porque el Event Loop tiene un timer activo."

Presionas Ctrl+C y la terminal vuelve.

3. Cambias a false y ejecutas de nuevo:

"Ahora Node arranca, imprime los mensajes, llega al final, ve que no hay nada pendiente en el Event Loop... y muere solo. La terminal quedó libre sin que yo hiciera nada."

4. Cierras con la pregunta a los alumnos:

"¿Un servidor web debería comportarse como true o como false?"

La respuesta es true — porque necesita estar vivo para recibir peticiones. Y eso conecta directamente con las demos 3, 4 y 5 del guión.
 */

console.log("============================================================");
console.log("01 - Levantar una app Node.js con `node app.js`");
console.log("============================================================\n");

console.log("Paso 1) Node cargó este archivo y empezó a ejecutarlo.");
console.log("Paso 2) El código corre en orden (arriba -> abajo).\n");

console.log("Paso 3) ¿Por qué un proceso queda corriendo?");
console.log("- Si NO hay timers/servidores/I-O pendiente => Node termina.");
console.log("- Si SÍ hay algo activo => Node queda 'vivo' (no termina).\n");

// ─────────────────────────────────────────────────────────────
// INTERRUPTOR PARA LA DEMO
// Cambia este valor para ver los dos comportamientos:
//   true  → el proceso queda corriendo indefinidamente
//   false → el proceso termina en cuanto llega al final del archivo
// ─────────────────────────────────────────────────────────────
const mantenerVivo = true;

if (mantenerVivo) {
  // ── CASO A: proceso que no termina ──────────────────────────
  // setInterval registra una función que se repite cada X ms.
  // Mientras ese timer esté activo, el Event Loop tiene trabajo
  // pendiente, por lo que Node NO cierra el proceso.
  // Para detenerlo manualmente: Ctrl + C  (envía señal SIGINT).
  console.log("DEMO: Dejaremos un setInterval activo.");
  console.log("      Resultado: Node NO termina (verás logs cada 3 segundos).");
  console.log("      Detén con Ctrl + C.\n");

  let contador = 0; // lleva la cuenta de cuántas veces corrió el timer

  setInterval(() => {
    contador++;
    // Cada 3 000 ms (3 segundos) se imprime un tick.
    // El proceso sigue vivo mientras este timer esté registrado.
    console.log(`⏱️  Proceso vivo... (tick #${contador})`);
  }, 3000); // 3000 ms = 3 segundos

} else {
  // ── CASO B: proceso que termina solo ────────────────────────
  // No hay timers ni servidores activos.
  // Node ejecuta estas líneas y, al no encontrar trabajo pendiente,
  // cierra el proceso automáticamente (exit code 0 = sin errores).
  console.log("DEMO desactivada (mantenerVivo=false).");
  console.log("Resultado: el proceso termina inmediatamente.");
  // Node llega aquí, revisa el Event Loop, no hay nada → sale solo.
}
