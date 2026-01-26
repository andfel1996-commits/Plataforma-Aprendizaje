/* ==========================================================
   PACK DOCENTE — FUNCIONES EN JAVASCRIPT (PARTE I)
   ----------------------------------------------------------
   ✅ Este archivo es la DEMO para el docente.
   ✅ Está pensado para ejecutar en consola (DevTools).

   ¿Cómo usar en clase?
   1) Abre index.html en el navegador
   2) Abre la consola (F12)
   3) Lee los comentarios y ejecuta mirando la salida

   Consejo didáctico:
   - Avanza por secciones (1, 2, 3...) y pregunta “¿Qué creen que imprimirá?”
   ========================================================== */

console.log("\n=== DEMO: FUNCIONES EN JS (PARTE I) ===\n");

/* ==========================================================
   1) DECLARAR VS INVOCAR (LLAMAR)
   ========================================================== */

// ✅ DECLARAR: escribimos la "receta".
function saludar() {
  console.log("Hola, bienvenido/a a la clase de funciones 👋");
}

// ✅ INVOCAR: ahora sí se ejecuta.
saludar();
saludar(); // la reutilizamos

/* ==========================================================
   2) HOISTING (ELEVACIÓN)
   - Solo para funciones declaradas.
   ========================================================== */

// ✅ Esto funciona porque la función es declarada.
despedir();

function despedir() {
  console.log("Adiós! 👋 (esto funciona por hoisting)");
}

/* ==========================================================
   3) PARÁMETROS VS ARGUMENTOS
   ========================================================== */

// "nombre" es PARÁMETRO (vive dentro de la función)
function saludarConNombre(nombre) {
  console.log("Hola,", nombre, "🙂");
}

// "Sofía" y "Diego" son ARGUMENTOS (valores reales)
saludarConNombre("Sofía");
saludarConNombre("Diego");

/* ==========================================================
   4) console.log() VS return
   ========================================================== */

// A) Función que solo MUESTRA (no devuelve valor)
function sumarYMostrar(a, b) {
  const resultado = a + b;
  console.log("sumarYMostrar →", resultado);
  // Sin return: afuera no recibimos nada.
}

// B) Función que DEVUELVE (retorna) un valor
function sumarYDevolver(a, b) {
  const resultado = a + b;
  return resultado; // devolvemos el valor al que llamó
}

sumarYMostrar(2, 3);

const totalGuardado = sumarYDevolver(2, 3);
console.log("sumarYDevolver →", totalGuardado);

/* ==========================================================
   5) FUNCIÓN ANÓNIMA (guardada en una variable)
   ========================================================== */

// Guardamos una función SIN nombre dentro de la constante "restar"
const restar = function (a, b) {
  return a - b;
};

console.log("restar(10, 4) →", restar(10, 4));

/* ==========================================================
   6) ARROW FUNCTION (FLECHA)
   ========================================================== */

// Arrow "larga" (con llaves y return)
const multiplicar = (a, b) => {
  return a * b;
};

// Arrow "corta" (una sola línea)
// Si hay una sola línea, el return puede ser implícito.
const duplicar = (n) => n * 2;

console.log("multiplicar(3, 4) →", multiplicar(3, 4));
console.log("duplicar(8) →", duplicar(8));

/* ==========================================================
   7) EJEMPLO REAL: map() con arrow
   ========================================================== */

const numeros = [1, 2, 3, 4, 5];

const cuadrados = numeros.map((n) => {
  // Esta función se ejecuta para cada elemento del array.
  return n * n;
});

console.log("numeros (original) →", numeros);
console.log("cuadrados (nuevo) →", cuadrados);

/* ==========================================================
   8) DESAFÍO: ¿Qué pasa si hago push al array dentro de una función?
   ========================================================== */

function cambiarArray(arr) {
  // push() agrega al final del array
  arr.push(5);
  return arr; // opcional
}

let valores = [1, 2, 3];

// Llamamos pasando "valores"
cambiarArray(valores);

// ✅ Se modifica el array original
console.log("valores después de cambiarArray →", valores);

/* ==========================================================
   9) ERRORES COMUNES
   ========================================================== */

// 9.1 Olvidar paréntesis al llamar
function obtenerSaludo() {
  return "Hola";
}

console.log("obtenerSaludo (sin paréntesis) →", obtenerSaludo);   // referencia a la función
console.log("obtenerSaludo() (con paréntesis) →", obtenerSaludo()); // ejecuta la función

// 9.2 Olvidar return
function areaSinReturn(base, altura) {
  base * altura; // no se devuelve
}
console.log("areaSinReturn(2, 3) →", areaSinReturn(2, 3)); // undefined

function areaConReturn(base, altura) {
  return base * altura;
}
console.log("areaConReturn(2, 3) →", areaConReturn(2, 3));



console.log("\n=== USO DE CALLBACK EL CALLBACK HELL ===\n");

function pedirDatos( callback ){
    setTimeout(function(){
        const datos = ["Producto 1", "Producto 2", "Producto 3"]
        callback(datos)
    },1000)
}

// Otra tarea 
function filtrarDatos(datos, callback){
    setTimeout(function(){
        const filtrados = datos.filter((item) => item.includes("2"))
        callback(filtrados)
    },1000)
}

function guardarDatos(datos,callback){
    setTimeout(function(){
      callback("Guardado OK.. ")
    }, 1000)
}

pedirDatos( (datos) => {

    console.log("1) Datos:", datos)

    filtrarDatos(datos, (filtrados)=>{

        console.log("2) Datos filtrados", filtrados)

        guardarDatos(filtrados, (mensaje)=>{

            console.log("3)", mensaje)


        })

    })
} )


console.log("\n=== USO DE PROMISE DE CALLBACK A PROMESAS ===\n");

function pedirDatosPromise() {
  return new Promise( function(resolve, reject){
    setTimeout(() => {
      const datos = ["Producto 1", "Producto 2", "Producto 3"];

      // Simulamos que "a veces" puede fallar
      const todoBien = true;

      if (todoBien) {
        resolve(datos); // ✅ terminó bien → entrego datos
      } else {
        reject("Error al pedir datos ❌"); // ❌ terminó mal → entrego error
      }
    }, 1000);
  });
}


pedirDatosPromise()
    .then( function(datos){
        console.log('1) Datos recibidos', datos);
        const filtrados = datos.filter( item => item.includes("2"))
        return filtrados
    } )
    .then(function(filtrados){
        console.log('2) Filtrados:',filtrados )
        return "Guardado OK ..."
    })
    .then(function(mensaje){
        console.log('3)', mensaje)
    })
    .catch(function(error){
        console.log('ERROR:',error)
    })


console.log("\n=== FIN DEMO ===\n");




