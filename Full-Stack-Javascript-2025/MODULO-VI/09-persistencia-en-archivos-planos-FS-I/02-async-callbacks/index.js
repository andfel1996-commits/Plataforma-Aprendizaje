/**
 * 02-async-callbacks/index.js (ES Modules)
 * ------------------------------------------------------------
 * DEMO: Persistencia en archivos planos con File System (ASYNC callbacks)
 * ------------------------------------------------------------
 * Objetivo pedagógico:
 * - Ver el mismo flujo que en SYNC, pero usando callbacks.
 *
 * ¿Qué significa ASYNC aquí?
 * - La operación se inicia y Node sigue vivo.
 * - Cuando termina, se ejecuta el callback.
 *
 * Firma típica (error-first callback):
 *   (err) => { ... }
 *   (err, data) => { ... }
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const archivo = path.join(__dirname, "data-callbacks.txt");
const keep = process.argv.includes("--keep");

function titulo(texto) {
  console.log("\n" + "=".repeat(60));
  console.log(texto);
  console.log("=".repeat(60));
}

/**
 * Pequeño helper:
 * - si hay error, lo mostramos y cortamos el flujo.
 */
function siError(err, paso) {
  if (!err) return false;
  console.error(`\n❌ Error en el paso "${paso}":`, err.message);
  return true;
}

titulo("DEMO CALLBACKS (writeFile / appendFile / readFile / unlink)");

/**
 * PASO 1: writeFile (async)
 * - Crea o sobrescribe el archivo
 */
console.log("\n1) writeFile -> creando data-callbacks.txt");

const contenidoInicial =
  "Listado de usuarios (callback)\n" +
  "- Ana\n" +
  "- Bruno\n";

fs.writeFile(archivo, contenidoInicial, "utf8", (err) => {
  if (siError(err, "writeFile")) return;
  console.log("   OK: archivo creado/sobrescrito.");

  /**
   * PASO 2: appendFile (async)
   * - Agrega al final
   */
  console.log("\n2) appendFile -> agregando una línea");
  fs.appendFile(archivo, "- Camila\n", "utf8", (err2) => {
    if (siError(err2, "appendFile")) return;
    console.log("   OK: línea agregada.");

    /**
     * PASO 3: readFile (async)
     * - Lee el archivo y entrega el contenido en el callback
     */
    console.log("\n3) readFile -> leyendo archivo y mostrando en consola");
    fs.readFile(archivo, "utf8", (err3, data) => {
      if (siError(err3, "readFile")) return;

      console.log("   Contenido actual:");
      console.log("-".repeat(60));
      console.log(data);
      console.log("-".repeat(60));

      /**
       * PASO 4: unlink (async) (opcional)
       * - Borra el archivo
       */
      console.log("\n4) unlink -> eliminando data-callbacks.txt");
      if (keep) {
        console.log("   SKIP: usaste --keep, el archivo queda guardado.");
        console.log("\nFin demo CALLBACKS ✅");
        return;
      }

      fs.unlink(archivo, (err4) => {
        if (siError(err4, "unlink")) return;
        console.log("   OK: archivo eliminado.");
        console.log("\nFin demo CALLBACKS ✅");
      });
    });
  });
});
