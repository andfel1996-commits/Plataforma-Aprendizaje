/**
 * ============================================================
 * 02 - process.argv + VALIDACIÓN DE ENTRADA
 * ============================================================
 *
 * CONEXIÓN CON EL ARCHIVO ANTERIOR (01-levantar-app-node):
 *   En la demo anterior vimos que Node crea un PROCESO al ejecutarse
 *   y que ese proceso puede vivir o morir según el Event Loop.
 *   Ahora exploramos otro aspecto del mismo proceso:
 *   ¿Cómo ese proceso sabe con qué datos fue invocado?
 *   La respuesta es: process.argv
 *
 * ¿QUÉ ES `process`?
 *   Es un objeto GLOBAL que Node expone automáticamente en todo
 *   archivo .js. No necesitas importarlo. Representa al proceso
 *   actual que está corriendo y te da acceso a información del
 *   sistema operativo.
 *
 *   Propiedades útiles de `process`:
 *     process.argv    → argumentos con que fue invocado el proceso
 *     process.exit()  → mata el proceso con un código de salida
 *     process.pid     → número de identificación del proceso (PID)
 *     process.env     → variables de entorno del sistema
 *
 * ¿QUÉ ES process.argv?
 *   Es un ARREGLO con todo lo que se escribió en la terminal para
 *   lanzar este proceso. El sistema operativo se lo entrega a Node
 *   en el momento del lanzamiento.
 *
 *   Ejemplo de invocación:
 *     node src/app.js Juan 25
 *
 *   Contenido de process.argv:
 *   [
 *     "/usr/local/bin/node",  → argv[0]  ruta del ejecutable Node
 *     "/ruta/src/app.js",     → argv[1]  ruta del archivo que corre
 *     "Juan",                 → argv[2]  primer argumento del usuario
 *     "25"                    → argv[3]  segundo argumento del usuario
 *   ]
 *
 *   REGLA: argv[0] y argv[1] SIEMPRE existen.
 *          Los datos del usuario empiezan en argv[2].
 *          Todos los valores son STRINGS (aunque escribas un número).
 *
 * ¿QUÉ ES process.exit(código)?
 *   Mata el proceso inmediatamente y devuelve un código al sistema:
 *     process.exit(0)  → todo salió bien  (éxito)
 *     process.exit(1)  → algo salió mal   (error)
 *   Esto conecta con la Demo 1: es otra forma de terminar un proceso,
 *   pero controlada por el propio programa, no por el Event Loop.
 *
 * ─────────────────────────────────────────────────────────────
 * LO CENTRAL QUE APRENDEMOS EN ESTE ARCHIVO (3 ideas)
 * ─────────────────────────────────────────────────────────────
 *
 * 1) EL PROCESO SABE CÓMO FUE INVOCADO
 *    Cuando escribes "node src/app.js Juan 25", el sistema operativo
 *    le entrega esos datos al proceso en process.argv. El proceso
 *    tiene acceso a su propio contexto de lanzamiento desde el
 *    primer instante en que existe.
 *
 * 2) TODO LO QUE ENTRA POR argv ES TEXTO (string)
 *    Aunque escribas 25 en la terminal, llega como "25".
 *    Si lo usas directo en un cálculo, obtienes resultados incorrectos.
 *    Por eso SIEMPRE hay que convertir y validar antes de usar los datos.
 *
 * 3) TÚ CONTROLAS CÓMO Y CUÁNDO MUERE EL PROCESO
 *    Con process.exit() terminas el proceso en cualquier punto del
 *    código. Esto amplía lo visto en la Demo 1:
 *
 *    ┌──────────────────────┬──────────────────────────────┐
 *    │ Forma de morir       │ Quién decide                 │
 *    ├──────────────────────┼──────────────────────────────┤
 *    │ Event Loop vacío     │ Node automáticamente         │
 *    │ process.exit()       │ Tu propio código             │
 *    │ Ctrl + C             │ El humano en la terminal     │
 *    │ kill <PID>           │ Otro proceso del sistema     │
 *    └──────────────────────┴──────────────────────────────┘
 *    Las cuatro formas las verás todas al terminar la clase de hoy.
 *
 * ─────────────────────────────────────────────────────────────
 * CÓMO EJECUTAR ESTA DEMO:
 *   ✅ Correcto:   npm start -- Juan 25
 *   ❌ Sin datos:  npm start
 *   ❌ Edad texto: npm start -- Juan ABC
 *   ❌ Edad negat: npm start -- Juan -5
 */

console.log("============================================================");
console.log("02 - process.argv + validación");
console.log("============================================================\n");

// ─────────────────────────────────────────────────────────────
// PASO 1: Capturar el arreglo completo
// Guardarlo en una variable es solo para hacer el código más legible.
// process.argv ya existe desde que el proceso arrancó.
// ─────────────────────────────────────────────────────────────
const argv = process.argv;

// Mostramos el arreglo completo: así los alumnos ven las posiciones
// y entienden por qué los datos del usuario empiezan en [2].
console.log("process.argv completo:");
console.log(argv);
console.log("");

// ─────────────────────────────────────────────────────────────
// PASO 2: Extraer los argumentos del usuario
// argv[2] = nombre  (primer dato que escribió el usuario)
// argv[3] = edad    (segundo dato, llega como STRING siempre)
// ─────────────────────────────────────────────────────────────
const nombre  = argv[2];  // ej: "Juan"
const edadStr = argv[3];  // ej: "25"  <- OJO: es texto, no número

// ─────────────────────────────────────────────────────────────
// PASO 3: Validación 1 — ¿faltan argumentos?
// Si el usuario no pasó nombre o edad, argv[2] o argv[3] serán
// undefined, que es falsy en JavaScript.
// process.exit(1) termina el proceso con código de error,
// igual que si el Event Loop quedara vacío, pero de forma forzada.
// ─────────────────────────────────────────────────────────────
if (!nombre || !edadStr) {
  console.log("❌ Error: Faltan argumentos.");
  console.log("Uso correcto: node src/app.js <nombre> <edad>");
  console.log("Ejemplo:      node src/app.js Juan 25");
  process.exit(1); // código 1 = el proceso murió con error
}

// ─────────────────────────────────────────────────────────────
// PASO 4: Convertir edad de STRING a NUMBER
// Todo lo que llega por argv es texto. Debemos convertirlo.
//   Number("25")  => 25      ✅ conversión exitosa
//   Number("ABC") => NaN     ❌ Not a Number (no es un número)
// ─────────────────────────────────────────────────────────────
const edad = Number(edadStr);

// ─────────────────────────────────────────────────────────────
// PASO 5: Validación 2 — ¿la edad es un número válido?
// Number.isNaN(valor) devuelve true si el valor es NaN.
// ─────────────────────────────────────────────────────────────
if (Number.isNaN(edad)) {
  console.log("❌ Error: La edad debe ser un número.");
  console.log('Ejemplo: node src/app.js Juan 25');
  process.exit(1);
}

// ─────────────────────────────────────────────────────────────
// PASO 6: Validación 3 — ¿la edad tiene sentido?
// Un número válido puede ser negativo o cero, lo cual no tiene
// sentido como edad. Esta validación es de lógica de negocio.
// ─────────────────────────────────────────────────────────────
if (edad <= 0) {
  console.log("❌ Error: La edad debe ser mayor que 0.");
  process.exit(1);
}

// ─────────────────────────────────────────────────────────────
// PASO 7: Todo OK — mostrar resultado
// Si el código llegó hasta aquí, pasó todas las validaciones.
// El proceso termina solo (exit code 0) al no haber más código.
// ─────────────────────────────────────────────────────────────
console.log(`✅ OK: Usuario recibido → Nombre: ${nombre} | Edad: ${edad}`);

// Extra pedagógico: ver la diferencia de tipos antes y después
// de convertir. Refuerza por qué fue necesario usar Number().
console.log("\nDetalle de tipos (importante para entender la conversión):");
console.log("- typeof nombre  :", typeof nombre);   // "string"
console.log("- typeof edadStr :", typeof edadStr);  // "string"  <- llegó así por argv
console.log("- typeof edad    :", typeof edad);     // "number"  <- después de Number()
