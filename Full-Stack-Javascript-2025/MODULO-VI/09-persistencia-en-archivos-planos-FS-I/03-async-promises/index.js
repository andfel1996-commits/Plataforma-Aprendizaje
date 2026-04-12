/**
 * 03-async-promises/index.js (ES Modules)
 * ------------------------------------------------------------
 * DEMO: Persistencia en archivos planos con File System (ASYNC + Promises)
 * ------------------------------------------------------------
 * Usamos:
 *   import fs from "node:fs/promises"
 *
 * Ventaja:
 * - Podemos usar async/await para escribir código más legible que callbacks.
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const archivo = path.join(__dirname, "data-promises.txt");
const keep = process.argv.includes("--keep");

function titulo(texto) {
  console.log("\n" + "=".repeat(60));
  console.log(texto);
  console.log("=".repeat(60));
}

async function main() {
  titulo("DEMO PROMISES (fs/promises + async/await)");

  // PASO 1: writeFile (promises)
  console.log("\n1) writeFile -> creando/sobrescribiendo data-promises.txt");
  const contenidoInicial =
    "Listado de usuarios (promises)\n" +
    "- Ana\n" +
    "- Bruno\n";

  await fs.writeFile(archivo, contenidoInicial, "utf8");
  console.log("   OK: archivo creado/sobrescrito.");

  // PASO 2: appendFile
  console.log("\n2) appendFile -> agregando una línea al final");
  await fs.appendFile(archivo, "- Camila\n", "utf8");
  console.log("   OK: línea agregada.");

  // PASO 3: readFile
  console.log("\n3) readFile -> leyendo archivo y mostrando en consola");
  const data = await fs.readFile(archivo, "utf8");

  console.log("   Contenido actual:");
  console.log("-".repeat(60));
  console.log(data);
  console.log("-".repeat(60));

  // PASO 4: unlink (opcional)
  console.log("\n4) unlink -> eliminando data-promises.txt");
  if (keep) {
    console.log("   SKIP: usaste --keep, el archivo queda guardado.");
  } else {
    await fs.unlink(archivo);
    console.log("   OK: archivo eliminado.");
  }

  console.log("\nFin demo PROMISES ✅");
}

// Ejecutamos main() y capturamos errores
main().catch((err) => {
  console.error("\n❌ Ocurrió un error en la demo PROMISES:");
  console.error(err.message);
});
