/* ==========================================================
   APP.DEMO.JS — FUNCIONES EN JAVASCRIPT (PARTE II) — AE3.4
   ----------------------------------------------------------
   ✅ OBJETIVO DIDÁCTICO:
   - Parámetros (obligatorios / opcionales)
   - Return
   - Scope (local vs global)
   - Operador Rest (...)
   - Callbacks
   - Funciones anidadas
   ----------------------------------------------------------
   🧠 RECORDATORIOS:
   - Si NO pasas un parámetro: vale undefined.
   - Matemáticas con undefined → NaN.
   - Sin return → devuelve undefined.
   ========================================================== */

/* ----------------------------------------------------------
   0) Consola en pantalla (#output)
---------------------------------------------------------- */
const output = document.querySelector("#output");

function logEnPantalla(mensaje) {
  const texto = String(mensaje);
  console.log(texto);
  if (output) output.textContent += texto + "\n";
}

function limpiarPantalla() {
  console.clear();
  if (output) output.textContent = "";
}

/* ----------------------------------------------------------
   1) DEMO: Parámetro obligatorio + validación
---------------------------------------------------------- */
function demoParametroObligatorio() {
  logEnPantalla("=== DEMO 1: Parámetro obligatorio + validación ===");

  function saludar(nombrePersona) {
    if (!nombrePersona) {
      logEnPantalla("Error: Se requiere un nombre para saludar.");
      return;
    }
    logEnPantalla("Hola, " + nombrePersona + " 👋");
  }

  saludar("Sofía");
  saludar(); // sin parámetro → undefined
  logEnPantalla("");
}

/* ----------------------------------------------------------
   2) DEMO: Parámetro opcional + valor por defecto
---------------------------------------------------------- */
function demoParametroPorDefecto() {
  logEnPantalla("=== DEMO 2: Parámetro opcional + valor por defecto ===");

  function saludarConCiudad(nombrePersona, ciudad = "Santiago") {
    if (!nombrePersona) {
      logEnPantalla("Error: falta el nombre.");
      return;
    }
    logEnPantalla("Hola " + nombrePersona + " desde " + ciudad + " 🏙️");
  }

  saludarConCiudad("Luis", "Valparaíso");
  saludarConCiudad("Luis");
  logEnPantalla("");
}

/* ----------------------------------------------------------
   3) DEMO: Múltiples parámetros + return
---------------------------------------------------------- */
function demoMultiplesParametrosYReturn() {
  logEnPantalla("=== DEMO 3: Múltiples parámetros + return ===");

  function sumar(numeroA, numeroB) {
    return numeroA + numeroB;
  }

  logEnPantalla("sumar(5,3) = " + sumar(5, 3));
  logEnPantalla("sumar(10,20) = " + sumar(10, 20));
  logEnPantalla("");
}

/* ----------------------------------------------------------
   4) DEMO: Operador Rest (...) + reduce
---------------------------------------------------------- */
function demoOperadorRest() {
  logEnPantalla("=== DEMO 4: Operador Rest (...) + reduce ===");

  function sumarMuchos(...numeros) {
    const total = numeros.reduce(function (acc, n) {
      return acc + n;
    }, 0);
    return total;
  }

  logEnPantalla("sumarMuchos(1,2,3,4) = " + sumarMuchos(1, 2, 3, 4));
  logEnPantalla("sumarMuchos(10,5) = " + sumarMuchos(10, 5));
  logEnPantalla("");

  function mostrarDatos(nombre, ...hobbies) {
    logEnPantalla("Nombre: " + nombre);
    logEnPantalla("Hobbies: " + hobbies.join(", "));
  }

  mostrarDatos("Sofía", "Música", "Cine", "Leer");
  logEnPantalla("");
}

/* ----------------------------------------------------------
   5) DEMO: Callback (función como parámetro)
---------------------------------------------------------- */
function demoCallback() {
  logEnPantalla("=== DEMO 5: Callback (función como parámetro) ===");

  function procesar(valor, callback) {
    return callback(valor);
  }

  function doble(n) { return n * 2; }
  function triple(n) { return n * 3; }

  logEnPantalla("procesar(5, doble) = " + procesar(5, doble));
  logEnPantalla("procesar(5, triple) = " + procesar(5, triple));

  const res = procesar(10, function (n) { return n + 100; });
  logEnPantalla("procesar(10, (n)=>n+100) = " + res);
  logEnPantalla("");
}

/* ----------------------------------------------------------
   6) DEMO: Scope + función anidada
---------------------------------------------------------- */
let contadorGlobal = 0;

function demoScopeYAnidada() {
  logEnPantalla("=== DEMO 6: Scope (local vs global) + anidada ===");

  function incrementarContadorGlobal() {
    contadorGlobal = contadorGlobal + 1;
  }

  incrementarContadorGlobal();
  incrementarContadorGlobal();
  logEnPantalla("contadorGlobal = " + contadorGlobal);

  function ejemploLocal() {
    let mensajeLocal = "Yo soy local 👀";
    logEnPantalla(mensajeLocal);

    function interna() {
      logEnPantalla("Interna ve mensajeLocal: " + mensajeLocal);
    }

    interna();
  }

  ejemploLocal();
  logEnPantalla("");
}

/* ----------------------------------------------------------
   7) Ejecutar todo (resumen)
---------------------------------------------------------- */
function demoTodo() {
  limpiarPantalla();
  demoParametroObligatorio();
  demoParametroPorDefecto();
  demoMultiplesParametrosYReturn();
  demoOperadorRest();
  demoCallback();
  demoScopeYAnidada();
  logEnPantalla("✅ Fin del resumen.");
}

/* ----------------------------------------------------------
   8) Conectar botones
---------------------------------------------------------- */
const btnLimpiar = document.querySelector("#btn-limpiar");
const btnDemo1 = document.querySelector("#btn-demo-1");
const btnDemo2 = document.querySelector("#btn-demo-2");
const btnDemo3 = document.querySelector("#btn-demo-3");
const btnDemo4 = document.querySelector("#btn-demo-4");
const btnDemo5 = document.querySelector("#btn-demo-5");
const btnDemo6 = document.querySelector("#btn-demo-6");
const btnDemoTodo = document.querySelector("#btn-demo-todo");

if (btnLimpiar) btnLimpiar.addEventListener("click", limpiarPantalla);
if (btnDemo1) btnDemo1.addEventListener("click", demoParametroObligatorio);
if (btnDemo2) btnDemo2.addEventListener("click", demoParametroPorDefecto);
if (btnDemo3) btnDemo3.addEventListener("click", demoMultiplesParametrosYReturn);
if (btnDemo4) btnDemo4.addEventListener("click", demoOperadorRest);
if (btnDemo5) btnDemo5.addEventListener("click", demoCallback);
if (btnDemo6) btnDemo6.addEventListener("click", demoScopeYAnidada);
if (btnDemoTodo) btnDemoTodo.addEventListener("click", demoTodo);

logEnPantalla("👋 Listo. Presiona un botón del panel de demos (izquierda).");


