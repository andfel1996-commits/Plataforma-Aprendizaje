/**
 * main.js
 * -------
 * Punto de entrada de la demo.
 * - Conecta botones del HTML con cada sección.
 * - Importa cada demo como módulo.
 *
 * Nota: Esto es ES Modules (import/export).
 */

import { clearOutput, logTitle, logLine } from "./utils/logger.js";

// Importamos cada sección (cada una exporta una función runXXX)
import { run01_VariablesFunciones } from "./sections/01-variables-funciones.js";
import { run02_DestructuringSpreadRest } from "./sections/02-destructuring-spread-rest.js";
import { run03_ClasesYModulos } from "./sections/03-clases-modulos/run.js";
import { run04_SetsMapsIteradores } from "./sections/04-sets-maps-iteradores.js";
import { run05_PromesasAsyncAwait } from "./sections/05-async.js";

// Helpers: obtenemos botones (solo existe en navegador)
const byId = (id) => document.getElementById(id);

byId("btn-01").addEventListener("click", () => run01_VariablesFunciones());
byId("btn-02").addEventListener("click", () => run02_DestructuringSpreadRest());
byId("btn-03").addEventListener("click", () => run03_ClasesYModulos());
byId("btn-04").addEventListener("click", () => run04_SetsMapsIteradores());
byId("btn-05").addEventListener("click", () => run05_PromesasAsyncAwait());
byId("btn-clear").addEventListener("click", () => {
  clearOutput();
  logTitle("Salida limpia ✅");
  logLine("Listo. Ahora ejecuta otra sección.");
});

// Mensaje inicial
logTitle("Bienvenida/o a la Demo ECMA6 (ES6+) — Clase II");
logLine("Usa los botones para ejecutar cada sección.");
logLine("Tip: abre la consola (F12) para ver el mismo output.");
