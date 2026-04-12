/**
 * 01-sync-basico/index.js (ES Modules)
 * ------------------------------------------------------------
 * DEMO: Persistencia en archivos planos con File System (SYNC)
 * ------------------------------------------------------------
 * 
 * IMPORTANTE:
 * - Los métodos SYNC (sincrónicos) BLOQUEAN el hilo.
 * - Son buenos para entender el concepto, pero en servidores se prefiere Async.
 *
 * Ejecutar:
 *   npm start
 *
 * Opcional:
 *   node index.js --keep   // no elimina el archivo al final
 */

// ------------------------------------------------------------
// 1) IMPORTS (Node "core") - no se instala con npm
// ------------------------------------------------------------
import fs from "node:fs";            // File System (sync)
import path from "node:path";        // utilidades de rutas
import { fileURLToPath } from "node:url"; // para obtener __dirname en ES Modules

// ------------------------------------------------------------
// 2) __dirname (porque estamos en ES Modules)
// ------------------------------------------------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ------------------------------------------------------------
// 3) Ruta del archivo de trabajo

//    - Lo creamos dentro de esta misma carpeta para que sea fácil encontrarlo.

/*
    __dirname = la carpeta donde está tu archivo .js (la ruta absoluta del directorio).
    "data-sync.txt" = el nombre del archivo que quieres crear/leer en esa carpeta.

    path.join(...) los pega con el separador correcto:

    En Windows usa \
    En macOS/Linux usa /

    Si __dirname es:

    macOS/Linux: /Users/alejandro/proyecto/01-sync-basico/src
    → queda: /Users/alejandro/proyecto/01-sync-basico/src/data-sync.txt

    Windows: C:\Users\Alejandro\proyecto\01-sync-basico\src
    → queda: C:\Users\Alejandro\proyecto\01-sync-basico\src\data-sync.txt

*/

// ------------------------------------------------------------
const archivo = path.join(__dirname, "data-sync.txt");

// ------------------------------------------------------------
// 4) Flag simple desde CLI
//    - process.argv trae lo que escribiste en la terminal.
// ------------------------------------------------------------
const keep = process.argv.includes("--keep");

// ------------------------------------------------------------
// 5) Pequeña función para separar secciones en consola
// ------------------------------------------------------------
function titulo(texto) {
  console.log("\n" + "=".repeat(60));
  console.log(texto);
  console.log("=".repeat(60));
}

// ------------------------------------------------------------
// 6) DEMO SYNC
//    - Usamos try/catch porque en Sync los errores se lanzan (throw)
// ------------------------------------------------------------
try {
  titulo("DEMO SYNC (writeFileSync / appendFileSync / readFileSync / unlinkSync)");

  // ----------------------------------------------------------
  // PASO 1: writeFileSync
  // - Crea el archivo si NO existe
  // - Si existe, lo SOBRESCRIBE completo
  // ----------------------------------------------------------
  console.log("\n1) writeFileSync -> creando/reescribiendo data-sync.txt");

  const contenidoInicial =
    "Listado de usuarios (sync)\n" +
    "- Ana\n" +
    "- Bruno\n";

  // encoding "utf8" para trabajar con texto
  fs.writeFileSync(archivo, contenidoInicial, "utf8");
  console.log("   OK: archivo creado/sobrescrito.");

  // ----------------------------------------------------------
  // PASO 2: appendFileSync
  // - Agrega contenido al FINAL del archivo
  // - No borra lo anterior
  // ----------------------------------------------------------
  console.log("\n2) appendFileSync -> agregando una línea al final");
  fs.appendFileSync(archivo, "- Camila\n", "utf8");
  console.log("   OK: línea agregada.");

  // ----------------------------------------------------------
  // PASO 3: readFileSync
  // - Lee TODO el archivo y lo devuelve como string (si pasas utf8)
  // ----------------------------------------------------------
  console.log("\n3) readFileSync -> leyendo archivo y mostrando en consola");
  const data = fs.readFileSync(archivo, "utf8");

  console.log("   Contenido actual:");
  console.log("-".repeat(60));
  console.log(data);
  console.log("-".repeat(60));

  // ----------------------------------------------------------
  // PASO 4: unlinkSync (opcional)
  // - Elimina el archivo
  // - Si no quieres borrarlo, ejecuta con --keep
  // ----------------------------------------------------------
  console.log("\n4) unlinkSync -> eliminando data-sync.txt");
  if (keep) {
    console.log("   SKIP: usaste --keep, el archivo queda guardado.");
  } else {
    fs.unlinkSync(archivo);
    console.log("   OK: archivo eliminado.");
  }

  console.log("\nFin demo SYNC ✅");
} catch (error) {
  // Si ocurre un error, lo mostramos de forma controlada
  console.error("\n❌ Ocurrió un error en la demo SYNC:");
  console.error(error.message);
  // Tip extra para alumnos:
  console.error("Tip: revisa que tengas permisos de escritura en esta carpeta.");
}
