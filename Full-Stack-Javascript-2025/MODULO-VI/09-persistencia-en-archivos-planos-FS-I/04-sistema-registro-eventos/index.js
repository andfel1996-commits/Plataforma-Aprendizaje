/**
 * 04-sistema-registro-eventos/index.js (ES Modules)
 * ------------------------------------------------------------
 * Mini proyecto: Registro de eventos en un archivo (events.log)
 *
 * Qué aprendemos aquí:
 * - appendFile: agregar líneas sin borrar lo anterior
 * - readFile: leer el archivo completo
 * - writeFile: reescribir el archivo (para "dejar solo los últimos 5")
 * - unlink: borrar el archivo (simular reinicio)
 *
 * Comandos:
 *   node index.js add "mensaje"
 *   node index.js list
 *   node index.js trim
 *   node index.js reset
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Guardamos el log junto a este script
const LOG_PATH = path.join(__dirname, "events.log");

// ------------------------------------------------------------
// Helpers de consola
// ------------------------------------------------------------
function titulo(texto) {
  console.log("\n" + "=".repeat(60));
  console.log(texto);
  console.log("=".repeat(60));
}

function uso() {
  console.log(`
Uso:
  node index.js add "mensaje"
  node index.js list
  node index.js trim
  node index.js reset
`);
}

// ------------------------------------------------------------
// 1) addEvent: agrega una línea al log
// ------------------------------------------------------------
async function addEvent(mensaje) {
  // Generamos un "timestamp" simple para el log
  const fecha = new Date().toLocaleString();

  // Definimos el formato de cada línea:
  // [fecha] mensaje
  const linea = `[${fecha}] ${mensaje}\n`;

  // appendFile agrega al final (crea el archivo si no existe)
  await fs.appendFile(LOG_PATH, linea, "utf8");
  console.log("OK: evento agregado.");
}

// ------------------------------------------------------------
// 2) listEvents: muestra el contenido del log
// ------------------------------------------------------------
async function listEvents() {
  try {
    const data = await fs.readFile(LOG_PATH, "utf8");
    titulo("EVENTOS REGISTRADOS");
    console.log(data.trim() === "" ? "(sin eventos todavía)" : data);
  } catch (err) {
    // Si el archivo no existe, readFile lanza error
    if (err.code === "ENOENT") {
      titulo("EVENTOS REGISTRADOS");
      console.log("(aún no existe events.log)");
      return;
    }
    throw err;
  }
}

// ------------------------------------------------------------
// 3) trimEvents: conserva solo los últimos N eventos
// ------------------------------------------------------------
async function trimEvents(max = 5) {
  try {
    const data = await fs.readFile(LOG_PATH, "utf8");

    // Separamos por líneas, quitamos vacías
    const lineas = data.split("\n").filter(Boolean);

    // Nos quedamos con las últimas N
    const ultimas = lineas.slice(-max);

    // Reescribimos el archivo COMPLETO con solo esas líneas
    // (writeFile sobrescribe)
    await fs.writeFile(LOG_PATH, ultimas.join("\n") + "\n", "utf8");

    console.log(`OK: se conservaron los últimos ${max} eventos.`);
  } catch (err) {
    if (err.code === "ENOENT") {
      console.log("No hay nada que recortar: events.log no existe.");
      return;
    }
    throw err;
  }
}

// ------------------------------------------------------------
// 4) resetLog: borra el archivo (simular “reiniciar el sistema”)
// ------------------------------------------------------------
async function resetLog() {
  try {
    await fs.unlink(LOG_PATH);
    console.log("OK: events.log eliminado (reset).");
  } catch (err) {
    if (err.code === "ENOENT") {
      console.log("events.log no existe, nada que borrar.");
      return;
    }
    throw err;
  }
}

// ------------------------------------------------------------
// Router de comandos (muy simple)
// ------------------------------------------------------------
async function main() {
  const [comando, ...resto] = process.argv.slice(2);

  if (!comando || comando === "help" || comando === "--help") {
    uso();
    return;
  }

  if (comando === "add") {
    const mensaje = resto.join(" ").trim();
    if (!mensaje) {
      console.log("Debes escribir un mensaje. Ej: node index.js add \"Usuario inició sesión\"");
      return;
    }
    await addEvent(mensaje);
    return;
  }

  if (comando === "list") {
    await listEvents();
    return;
  }

  if (comando === "trim") {
    await trimEvents(5);
    return;
  }

  if (comando === "reset") {
    await resetLog();
    return;
  }

  console.log(`Comando desconocido: ${comando}`);
  uso();
}

main().catch((err) => {
  console.error("\n❌ Error:", err.message);
});
