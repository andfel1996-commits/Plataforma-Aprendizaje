/* ==========================================================
   APP.DEMO.JS — POO EN JAVASCRIPT (PARTE II) — AE1.2
   Temas: prototype + JSON
   ========================================================== */

/* ==========================================================
   1) UTILIDADES DE SALIDA (consola + pantalla)
   ========================================================== */

// 1.1) Referencia al <pre id="output"> (salida visible)
const output = document.querySelector("#output");

// 1.2) Función para imprimir (en consola y en pantalla)
function log(mensaje) {
  const texto = String(mensaje);
  console.log(texto);
  if (output) output.textContent += texto + "\n";
}

// 1.3) Limpia consola y salida visible
function limpiar() {
  console.clear();
  if (output) output.textContent = "";
}

// 1.4) Separador visual
function separador() {
  log("------------------------------------------------------------");
}

/* ==========================================================
   2) LECTURA DE INPUTS (por si el docente quiere cambiar valores)
   ========================================================== */

function leerNombre() {
  const inp = document.querySelector("#inp-nombre");
  return inp ? inp.value : "";
}

function leerEdad() {
  const inp = document.querySelector("#inp-edad");
  // Convertimos a número (si no es número válido, ponemos 0)
  const n = inp ? Number(inp.value) : 0;
  return Number.isFinite(n) ? n : 0;
}

function leerCargo() {
  const inp = document.querySelector("#inp-cargo");
  return inp ? inp.value : "";
}

/* ==========================================================
   3) DEMO 1 — CONSTRUCTORA SIN PROTOTYPE (duplica métodos)
   ========================================================== */

function demo1_sinPrototype() {
  limpiar();
  log("DEMO 1) Constructora SIN prototype (duplica métodos)");
  separador();

  // 3.1) Definimos una función constructora (plantilla)
  // OJO: aquí ponemos el método DENTRO del constructor
  // => cada instancia recibe su PROPIA copia del método.
  function EmpleadoV1(nombre, edad, cargo) {
    // Estado (propiedades)
    this.nombre = nombre;
    this.edad = edad;
    this.cargo = cargo;

    // Método DENTRO del constructor (se duplica por instancia)
    this.mostrarInfo = function () {
      return "Empleado: " + this.nombre + " | Edad: " + this.edad + " | Cargo: " + this.cargo;
    };
  }

  // 3.2) Creamos dos instancias
  const emp1 = new EmpleadoV1(leerNombre(), leerEdad(), leerCargo());
  const emp2 = new EmpleadoV1("Lucas", 32, "Diseñador");

  // 3.3) Usamos el método
  log(emp1.mostrarInfo());
  log(emp2.mostrarInfo());

  separador();

  // 3.4) Comprobación CLAVE: ¿los métodos son el mismo?
  // Si el método se creó dentro del constructor, serán FUNCIONES distintas.
  log("¿emp1.mostrarInfo === emp2.mostrarInfo?");
  log(emp1.mostrarInfo === emp2.mostrarInfo); // debería ser false

  separador();

  // 3.5) Mensaje final para explicación
  log("Idea clave: funciona, pero cada instancia guarda su propia función (más memoria).");
}

/* ==========================================================
   4) DEMO 2 — CONSTRUCTORA + PROTOTYPE (métodos compartidos)
   ========================================================== */

// 4.1) Función constructora (solo estado)
function EmpleadoV2(nombre, edad, cargo) {
  this.nombre = nombre;
  this.edad = edad;
  this.cargo = cargo;
}

// 4.2) Método en prototype (compartido)
EmpleadoV2.prototype.mostrarInfo = function () {
  return "Empleado: " + this.nombre + " | Edad: " + this.edad + " | Cargo: " + this.cargo;
};

function demo2_conPrototype() {
  limpiar();
  log("DEMO 2) Constructora + prototype (métodos compartidos)");
  separador();

  const emp1 = new EmpleadoV2(leerNombre(), leerEdad(), leerCargo());
  const emp2 = new EmpleadoV2("Lucas", 32, "Diseñador");

  log(emp1.mostrarInfo());
  log(emp2.mostrarInfo());

  separador();

  // 4.3) Si el método viene del prototype, la referencia es la misma
  log("¿emp1.mostrarInfo === emp2.mostrarInfo?");
  log(emp1.mostrarInfo === emp2.mostrarInfo); // debería ser true

  separador();

  // 4.4) ¿Dónde vive el método?
  // - hasOwnProperty revisa si existe como propiedad directa del objeto
  log("¿emp1 tiene mostrarInfo como propiedad propia (hasOwnProperty)?");
  log(emp1.hasOwnProperty("mostrarInfo")); // false => viene del prototype

  log("¿EmpleadoV2.prototype tiene mostrarInfo?");
  log(typeof EmpleadoV2.prototype.mostrarInfo === "function"); // true

  separador();

  log("Idea clave: prototype comparte métodos entre todas las instancias.");
}

/* ==========================================================
   5) DEMO 3 — class (usa prototype automáticamente)
   ========================================================== */

class EmpleadoClass {
  constructor(nombre, edad, cargo) {
    this.nombre = nombre;
    this.edad = edad;
    this.cargo = cargo;
  }

  // OJO: aunque se vea “dentro de la clase”,
  // JS lo guarda en EmpleadoClass.prototype (método compartido)
  mostrarInfo() {
    return "Empleado(class): " + this.nombre + " | Edad: " + this.edad + " | Cargo: " + this.cargo;
  }
}

function demo3_classUsaPrototype() {
  limpiar();
  log("DEMO 3) class (usa prototype por dentro)");
  separador();

  const emp1 = new EmpleadoClass(leerNombre(), leerEdad(), leerCargo());
  const emp2 = new EmpleadoClass("Lucas", 32, "Diseñador");

  log(emp1.mostrarInfo());
  log(emp2.mostrarInfo());

  separador();

  // 5.1) Comprobación: el método es compartido (misma referencia)
  log("¿emp1.mostrarInfo === emp2.mostrarInfo?");
  log(emp1.mostrarInfo === emp2.mostrarInfo); // true

  separador();

  // 5.2) Prueba educativa: los métodos viven en prototype
  log("¿emp1 tiene mostrarInfo como propiedad propia (hasOwnProperty)?");
  log(emp1.hasOwnProperty("mostrarInfo")); // false

  log("¿EmpleadoClass.prototype tiene mostrarInfo?");
  log(typeof EmpleadoClass.prototype.mostrarInfo === "function"); // true

  separador();

  log("Idea clave: class es la forma moderna de escribir lo que igual funciona con prototype.");
}

/* ==========================================================
   6) DEMO 4 — JSON.stringify() y JSON.parse()
   ========================================================== */

function demo4_jsonStringifyParse() {
  limpiar();
  log("DEMO 4) JSON: stringify() y parse()");
  separador();

  // 6.1) Creamos un objeto normal
  const persona = {
    nombre: leerNombre(),
    edad: leerEdad(),
    cargo: leerCargo(),
  };

  log("OBJETO JS (tipo): " + typeof persona); // object
  log("OBJETO JS (contenido):");
  log(JSON.stringify(persona, null, 2)); // solo para imprimir bonito

  separador();

  // 6.2) Convertimos a JSON (string)
  const personaJSON = JSON.stringify(persona);
  log("JSON (tipo): " + typeof personaJSON); // string
  log("JSON (contenido): " + personaJSON);

  separador();

  // 6.3) Volvemos a objeto con parse()
  const personaBack = JSON.parse(personaJSON);
  log("De vuelta a OBJETO (tipo): " + typeof personaBack); // object
  log("personaBack.nombre = " + personaBack.nombre);
  log("personaBack.edad = " + personaBack.edad);
  log("personaBack.cargo = " + personaBack.cargo);

  separador();

  log("Idea clave: JSON es texto; con parse volvemos a objeto para trabajar en JS.");
}

/* ==========================================================
   7) DEMO 5 — Objeto vs JSON (diferencias clave)
   ========================================================== */

function demo5_objetoVsJSON() {
  limpiar();
  log("DEMO 5) Objeto vs JSON (diferencias clave)");
  separador();

  // 7.1) Objeto JS puede tener métodos
  const producto = {
    nombre: "Guitarra Eléctrica",
    precio: 500,
    stock: 10,
    // Método (función)
    aplicarDescuento: function (porcentaje) {
      // porcentaje 10 => descuenta 10%
      this.precio = this.precio - (this.precio * (porcentaje / 100));
    },
  };

  log("OBJETO (tipo): " + typeof producto); // object
  log("OBJETO tiene método aplicarDescuento: " + (typeof producto.aplicarDescuento));

  // 7.2) Pero JSON NO almacena funciones/métodos.
  // Cuando convertimos a JSON, las funciones se IGNORAN.
  const jsonProducto = JSON.stringify(producto, null, 2);

  separador();
  log("JSON (tipo): " + typeof jsonProducto); // string
  log("JSON generado (nota: no aparece aplicarDescuento):");
  log(jsonProducto);

  separador();
  log("Idea clave: Objeto = datos + (puede tener) métodos. JSON = solo datos.");
}

/* ==========================================================
   8) DEMO FINAL — Empleados → JSON (y listo para validar)
   ========================================================== */

function demoFinal_empleadosAJSON() {
  limpiar();
  log("DEMO COMPLETA) Empleados → JSON (listo para validar)");
  separador();

  // 8.1) Creamos 2 empleados con la versión recomendada (prototype o class)
  const emp1 = new EmpleadoV2(leerNombre(), leerEdad(), leerCargo());
  const emp2 = new EmpleadoV2("Lucas", 32, "Diseñador");

  // 8.2) Mostramos info (viene de prototype)
  log(emp1.mostrarInfo());
  log(emp2.mostrarInfo());

  separador();

  // 8.3) Convertimos la lista a JSON con formato “bonito”
  // null, 2 => indentación (2 espacios)
  const empleadosJSON = JSON.stringify([emp1, emp2], null, 2);

  log("JSON generado:");
  log(empleadosJSON);

  separador();

  log("Siguiente paso (manual): copia este JSON y pégalo en JSONLint para validarlo.");
}

/* ==========================================================
   9) EVENTOS (botones)
   ========================================================== */

const btnLimpiar = document.querySelector("#btn-limpiar");
const btn1 = document.querySelector("#btn-1");
const btn2 = document.querySelector("#btn-2");
const btn3 = document.querySelector("#btn-3");
const btn4 = document.querySelector("#btn-4");
const btn5 = document.querySelector("#btn-5");
const btnFinal = document.querySelector("#btn-final");

if (btnLimpiar) btnLimpiar.addEventListener("click", limpiar);
if (btn1) btn1.addEventListener("click", demo1_sinPrototype);
if (btn2) btn2.addEventListener("click", demo2_conPrototype);
if (btn3) btn3.addEventListener("click", demo3_classUsaPrototype);
if (btn4) btn4.addEventListener("click", demo4_jsonStringifyParse);
if (btn5) btn5.addEventListener("click", demo5_objetoVsJSON);
if (btnFinal) btnFinal.addEventListener("click", demoFinal_empleadosAJSON);

// Mensaje inicial
log("Listo. Presiona un botón del panel para comenzar.");
