/* ==========================================================
   EJERCICIO 01 (ALUMNO) — Empleados con prototype + JSON
   ==========================================================
   Contexto:
   Una empresa necesita gestionar empleados. Cada empleado tiene:
   - nombre
   - edad
   - cargo
   y un método para mostrar su información.

   Consigna:
   1) Crear una FUNCIÓN CONSTRUCTORA Empleado(nombre, edad, cargo)
      - debe guardar esas 3 propiedades en "this"
   2) Usar prototype para agregar el método mostrarInfo()
      - debe devolver un texto con los datos del empleado
   3) Crear al menos 2 empleados y mostrar su info en consola
   4) Convertir la lista de empleados a JSON (string) con JSON.stringify()
      - usar null, 2 para que quede “bonito”
   5) Validar el JSON pegándolo en JSONLint (manual, online)

   Tip:
   - Si haces el método dentro del constructor, se duplica en memoria.
   - Si lo haces con prototype, se comparte.
   ========================================================== */

/* ==========================================================
   PASO 0) (Opcional) Un helper para imprimir más ordenado
   ========================================================== */
function separador() {
  console.log("------------------------------------------------------------");
}

/* ==========================================================
   PASO 1) Crear la FUNCIÓN CONSTRUCTORA
   ========================================================== */

// TODO 1: Crea la función constructora Empleado
// Requisitos:
// - Recibe (nombre, edad, cargo)
// - Asigna propiedades en this: this.nombre, this.edad, this.cargo
function Empleado(nombre, edad, cargo) {
  // TODO: completa aquí
  // this.nombre = ...
  // this.edad = ...
  // this.cargo = ...
}

/* ==========================================================
   PASO 2) Agregar método al prototype (método compartido)
   ========================================================== */

// TODO 2: Agrega el método mostrarInfo usando prototype
// Requisitos:
// - Debe ser una función
// - Debe devolver un string con los datos
//   Ejemplo: "Empleado: Sofía | Edad: 28 | Cargo: Desarrolladora"
Empleado.prototype.mostrarInfo = function () {
  // TODO: completa aquí
  // return "Empleado: " + ...
};

/* ==========================================================
   PASO 3) Crear instancias (objetos) con new
   ========================================================== */

// TODO 3: Crea al menos 2 empleados
const emp1 = new Empleado("Sofía", 28, "Desarrolladora");
const emp2 = new Empleado("Lucas", 32, "Diseñador");

/* ==========================================================
   PASO 4) Probar el método mostrarInfo()
   ========================================================== */

separador();
console.log(emp1.mostrarInfo()); // debería mostrar los datos de Sofía
console.log(emp2.mostrarInfo()); // debería mostrar los datos de Lucas
separador();

/* ==========================================================
   PASO 5) (Clave) Comprobar que el método se comparte
   ========================================================== */

// Si el método está en prototype, esto debería ser TRUE:
console.log("¿emp1.mostrarInfo === emp2.mostrarInfo?");
console.log(emp1.mostrarInfo === emp2.mostrarInfo);
separador();

/* ==========================================================
   PASO 6) Convertir la lista de empleados a JSON
   ========================================================== */

// 6.1) Guardamos empleados en un array
const listaEmpleados = [emp1, emp2];

// 6.2) Convertimos a JSON (string)
// null, 2 => formato bonito (2 espacios)
const empleadosJSON = JSON.stringify(listaEmpleados, null, 2);

console.log("JSON generado:");
console.log(empleadosJSON);
separador();

/* ==========================================================
   PASO 7) Validar el JSON (manual)
   ==========================================================
   1) Copia el JSON que aparece en consola
   2) Pégalo en JSONLint (online)
   3) Verifica que diga “Valid JSON”
   ========================================================== */
