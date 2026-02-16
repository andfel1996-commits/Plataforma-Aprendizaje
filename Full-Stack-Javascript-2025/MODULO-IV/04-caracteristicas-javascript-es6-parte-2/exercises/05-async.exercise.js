/**
 * EJERCICIO 05 — Promesas y Async/Await
 * ------------------------------------
 * Objetivo:
 * 1) Crear una función fakeApi() que retorne una Promise y resuelva con datos
 * 2) Consumirla con then/catch
 * 3) Consumirla con async/await + try/catch
 *
 * Pista:
 * new Promise((resolve, reject) => { setTimeout(() => resolve(datos), 800); })
 */

export function runExercise05() {
  console.log("=== EJERCICIO 05 ===");

  // TODO 1: implementa fakeApi()
  const fakeApi = null;

  // TODO 2: consumir con then/catch
  // fakeApi().then(...).catch(...)

  // TODO 3: consumir con async/await
  async function main() {
    // try { const data = await fakeApi(); ... } catch(err) { ... }
  }

  main();

  console.log("=== FIN EJERCICIO 05 ===");
}
