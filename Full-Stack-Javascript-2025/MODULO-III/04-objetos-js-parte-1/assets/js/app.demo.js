/* ==========================================================
   APP.DEMO.JS — CONCEPTOS BÁSICOS DE OBJETOS (PARTE I) — AE3.5
   ----------------------------------------------------------
   ✅ OBJETIVO DIDÁCTICO:
   - Objeto = propiedades + métodos
   - Punto vs corchetes
   - Agregar / modificar / eliminar (delete)
   - Objetos nativos: Math y String
   - Mini demo: contraseña con Math + String
   ========================================================== */

const output = document.querySelector("#output");

function logEnPantalla(mensaje) {
  const texto = String(mensaje);
  console.log(texto);
  if (output) output.textContent += texto + "\n";
}

function separar() {
  logEnPantalla("----------------------------------------");
}

function limpiarPantalla() {
  console.clear();
  if (output) output.textContent = "";
}

/* ----------------------------------------------------------
   1) DEMO: ¿Qué es un objeto? (propiedades + métodos)
---------------------------------------------------------- */
function demoQueEsUnObjeto() {
  logEnPantalla("=== DEMO 1: ¿Qué es un objeto? ===");

  const persona = {
    nombre: "Sofía",
    edad: 30,
    saludar: function () {
      return "Hola, soy " + this.nombre;
    }
  };

  logEnPantalla("persona.nombre = " + persona.nombre);
  logEnPantalla("persona.edad = " + persona.edad);
  logEnPantalla("persona.saludar() = " + persona.saludar());
  separar();
}

/* ----------------------------------------------------------
   2) DEMO: Acceso punto vs corchetes (clave dinámica)
---------------------------------------------------------- */
function demoPuntoVsCorchetes() {
  logEnPantalla("=== DEMO 2: Punto vs corchetes ===");

  const persona = {
    nombre: "Ana",
    edad: 25,
    "nombre completo": "Ana Pérez"
  };

  logEnPantalla("persona.nombre = " + persona.nombre);
  logEnPantalla('persona["nombre completo"] = ' + persona["nombre completo"]);

  const clave = "edad";
  logEnPantalla("clave = " + clave);
  logEnPantalla("persona[clave] = " + persona[clave]);

  separar();
}

/* ----------------------------------------------------------
   3) DEMO: Agregar / modificar / eliminar propiedades (delete)
---------------------------------------------------------- */
function demoModificarEliminar() {
  logEnPantalla("=== DEMO 3: Agregar / modificar / eliminar ===");

  const persona = {
    nombre: "Carlos",
    edad: 25,
    profesion: "Desarrollador"
  };

  logEnPantalla("Objeto inicial: " + JSON.stringify(persona));

  persona.edad = 26;
  logEnPantalla("Modifico edad → " + persona.edad);

  persona.ciudad = "Rosario";
  logEnPantalla("Agrego ciudad → " + persona.ciudad);

  delete persona.profesion;
  logEnPantalla("Elimino profesion → " + String(persona.profesion));

  logEnPantalla("Objeto final: " + JSON.stringify(persona));
  separar();
}

/* ----------------------------------------------------------
   4) DEMO: Math — abs, round, ceil, floor
---------------------------------------------------------- */
function demoMathBasico() {
  logEnPantalla("=== DEMO 4: Math (abs, round, ceil, floor) ===");

  const negativo = -8.7;
  logEnPantalla("Math.abs(-8.7) = " + Math.abs(negativo));
  logEnPantalla("Math.round(5.7) = " + Math.round(5.7));
  logEnPantalla("Math.ceil(5.1) = " + Math.ceil(5.1));
  logEnPantalla("Math.floor(5.9) = " + Math.floor(5.9));

  separar();
}

/* ----------------------------------------------------------
   5) DEMO: Math — random en rango + pow + sqrt
---------------------------------------------------------- */
function demoMathRandomPowSqrt() {
  logEnPantalla("=== DEMO 5: Math (random, pow, sqrt) ===");

  const r = Math.random();
  logEnPantalla("Math.random() = " + r);

  const aleatorio1a100 = Math.floor(Math.random() * 100) + 1;
  logEnPantalla("Random 1..100 = " + aleatorio1a100);

  logEnPantalla("Math.pow(2, 5) = " + Math.pow(2, 5));
  logEnPantalla("Math.sqrt(64) = " + Math.sqrt(64));

  separar();
}

/* ----------------------------------------------------------
   6) DEMO: String — length, includes, indexOf
---------------------------------------------------------- */
function demoStringBuscar() {
  logEnPantalla("=== DEMO 6: String (length, includes, indexOf) ===");

  const texto = "JavaScript es genial";
  logEnPantalla('texto = "' + texto + '"');
  logEnPantalla("texto.length = " + texto.length);
  logEnPantalla('texto.includes("genial") = ' + texto.includes("genial"));
  logEnPantalla('texto.indexOf("Script") = ' + texto.indexOf("Script"));

  separar();
}

/* ----------------------------------------------------------
   7) DEMO: String — trim, replace, toUpperCase
---------------------------------------------------------- */
function demoStringModificar() {
  logEnPantalla("=== DEMO 7: String (trim, replace, toUpperCase) ===");

  const textoConEspacios = "   JavaScript es genial   ";
  const limpio = textoConEspacios.trim();

  logEnPantalla('trim() = "' + limpio + '"');
  logEnPantalla('toUpperCase() = "' + limpio.toUpperCase() + '"');
  logEnPantalla('replace("genial","increíble") = "' + limpio.replace("genial", "increíble") + '"');

  separar();
}

/* ----------------------------------------------------------
   8) DEMO: Mini app — contraseña segura (Math + String)
---------------------------------------------------------- */
function demoContrasenaSegura() {
  logEnPantalla("=== DEMO 8: Mini app — contraseña segura ===");

  const input = document.querySelector("#nombreInput");
  const nombre = input ? input.value.trim() : "";

  if (!nombre) {
    logEnPantalla("Error: ingresa un nombre en el campo de texto.");
    separar();
    return;
  }

  const randomNum = Math.floor(Math.random() * 1000);
  const parteNombre = nombre.slice(0, 3).toUpperCase();
  const contrasena = parteNombre + randomNum;

  logEnPantalla("Nombre: " + nombre);
  logEnPantalla("Parte del nombre (3 letras): " + parteNombre);
  logEnPantalla("Número aleatorio: " + randomNum);
  logEnPantalla("Contraseña generada: " + contrasena);

  separar();
}

/* ----------------------------------------------------------
   9) Ejecutar todo
---------------------------------------------------------- */
function demoTodo() {
  limpiarPantalla();
  demoQueEsUnObjeto();
  demoPuntoVsCorchetes();
  demoModificarEliminar();
  demoMathBasico();
  demoMathRandomPowSqrt();
  demoStringBuscar();
  demoStringModificar();
  demoContrasenaSegura();
  logEnPantalla("✅ Fin del resumen.");
}

/* ----------------------------------------------------------
   10) Conectar botones
---------------------------------------------------------- */
document.querySelector("#btn-limpiar")?.addEventListener("click", limpiarPantalla);
document.querySelector("#btn-demo-1")?.addEventListener("click", demoQueEsUnObjeto);
document.querySelector("#btn-demo-2")?.addEventListener("click", demoPuntoVsCorchetes);
document.querySelector("#btn-demo-3")?.addEventListener("click", demoModificarEliminar);
document.querySelector("#btn-demo-4")?.addEventListener("click", demoMathBasico);
document.querySelector("#btn-demo-5")?.addEventListener("click", demoMathRandomPowSqrt);
document.querySelector("#btn-demo-6")?.addEventListener("click", demoStringBuscar);
document.querySelector("#btn-demo-7")?.addEventListener("click", demoStringModificar);
document.querySelector("#btn-demo-8")?.addEventListener("click", demoContrasenaSegura);
document.querySelector("#btn-demo-todo")?.addEventListener("click", demoTodo);

logEnPantalla("Listo. Presiona un botón del panel de demos (izquierda).");
