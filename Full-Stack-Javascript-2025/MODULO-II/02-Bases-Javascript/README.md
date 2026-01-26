# Aprendiendo JavaScript

Guía completa para aprender JavaScript desde cero.

## Descripción

Esta guía está diseñada para ayudar a principiantes a aprender los conceptos fundamentales de JavaScript y a adquirir habilidades de programación en este lenguaje. La guía cubre temas desde la configuración del entorno de desarrollo hasta la introducción a librerías y frameworks populares.

## Índice

1. Introducción
   1. [Que es JavaScript](./01-introduccion/01-que-es-javascript.md)
   2. [Historia de JavaScript](./01-introduccion/02-historia-javascript.md)
2. Fundamentos
   1. [Variables](./02-fundamentos/01-variables.md)
   2. [Tipos de datos](./02-fundamentos/02-tipos-de-datos.md)
   3. [Coercion de datos](./02-fundamentos/03-coercion-de-datos.md)
   4. [Operadores](./02-fundamentos/04-operadores.md)
   5. [Ejercicios](./02-fundamentos/05-ejercicios.md)
3. Estructuras de control
   1. [Condicionales](./03-estructuras-de-control/01-condicionales.md)
   2. [Bucles](./03-estructuras-de-control/02-bucles.md)
   3. [Ejercicios](./03-estructuras-de-control/03-ejercicios.md)
4. Funciones
   1. [Funciones](./04-funciones/01-funciones.md)
   2. [Ejercicios](./04-funciones/02-ejercicios.md)
5. Arrays
   1. [Arrays](./05-arrays/01-arrays.md)
   2. [Agregar y eliminar elementos](./05-arrays/02-agregar-y-eliminar-elementos.md)
   3. [Iterando arrays](./05-arrays/03-iterando-arrays.md)
   4. [Arrow functions](./05-arrays/04-arrow-functions.md)
   5. [Arrow functions con arrays](./05-arrays/05-arrow-functions-con-arrays.md)
   6. [Ejercicios](./05-arrays/06-ejercicios.md)
6. Objetos y clases
   1. [EcmaScript 6](./06-objetos-y-clases/01-ecmascript-6.md)
   2. [Declaración con let y const](./06-objetos-y-clases/02-declaracion-con-let-y-const.md)
   3. [String templates](./06-objetos-y-clases/03-string-templates.md)
   4. [Objetos](./06-objetos-y-clases/04-objetos.md)
   5. [Iterando objetos](./06-objetos-y-clases/05-iterando-objetos.md)
   6. [Desestructuración de objetos](./06-objetos-y-clases/06-desestructuracion-de-objetos.md)
   7. [Desestructuración de arrays](./06-objetos-y-clases/07-desestructuracion-de-arrays.md)
   8. [Clases](./06-objetos-y-clases/08-clases.md)
   9. [Ejercicios](./06-objetos-y-clases/09-ejercicios.md)
7. Programación orientada a objetos
   1. [Programación orientada a objetos](./07-poo/01-programacion-orientada-a-objetos.md)
   2. [Declaración de clases](./07-poo/02-declaracion-de-clases.md)
   3. [Abstract classes](./07-poo/03-abstract-classes.md)
   4. [Herencia](./07-poo/04-herencia.md)
   5. [Encapsulamiento](./07-poo/05-encapsulamiento.md)
   6. [Polimorfismo](./07-poo/06-polimorfismo.md)
   7. [Ejercicios](./07-poo/07-ejercicios.md)
8. DOM y eventos
   1. [DOM](./08-dom/01-dom.md)
   2. [Eventos](./08-dom/02-eventos.md)
   3. [Selección del DOM](./08-dom/03-seleccion-del-dom.md)
   4. [Crear elementos](./08-dom/04-crear-elementos.md)
   5. [Eventos del dom](./08-dom/05-eventos-del-dom.md)
   6. [Agregar eventos a elementos](./08-dom/06-agregar-eventos-a-elementos.md)
   7. [Manipulación de atributos](./08-dom/07-manipulacion-de-atributos.md)
   8. [LocalStorage](./08-dom/08-localstorage.md)
   9. [Elementos dinámicos](./08-dom/09-elementos-dinamicos.md)
   10. [Ejercicios](./08-dom/10-ejercicios.md)
9. Proyectos
   1. [Conversor de monedas](./proyectos/conversor-monedas.md)

## Empezando 🚀

Para comenzar a trabajar con esta guía, es necesario tener un navegador web moderno (como Google Chrome, Mozilla Firefox, Edge o Safari) y un editor de código (como Visual Studio Code, Sublime Text o Atom).

### Pre-requisitos 📋

* Navegador web actualizado (Google Chrome, Mozilla Firefox, Safari, etc.)
* Editor de código (Visual Studio Code, Sublime Text, Atom, etc.)

### Instalación 🔧

1. Instalar el editor de código preferido.
2. Crear una carpeta para guardar los archivos del proyecto.
3. Crear un archivo HTML y otro JavaScript en la carpeta del proyecto.
4. Agregar una referencia al archivo JavaScript en el archivo HTML.
5. Abrir el archivo HTML en el navegador y usar la consola de desarrollador para ver el resultado de tu código.

## Ejecución de ejemplos ⚙️

A medida que avanzas en la guía, es recomendable practicar los conceptos aprendidos creando ejemplos y modificando el código.

```javascript
console.log("Hola, mundo!");
```

# Semana 1: Identificando los elementos básicos para trabajar con JavaScript
## Comenzando a trabajar con Javascript

### Incrustado directamente Javascript en nuestro HTML

```html

   <!DOCTYPE html>
   <html lang="en">
   <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>My App</title>
   </head>
   <body>
      <script>
         alert('Hola mundo desde HTML');
      </script>
   </body>
   </html>

```

### Enlazado externamente

También puedes vincular un archivo JavaScript externo, utilizando el atributo src de la
etiqueta `<script>`. Esto es especialmente útil cuando tienes mucho código JavaScript o
deseas mantener tu HTML y JavaScript separados.

```html

   <!DOCTYPE html>
   <html lang="en">
   <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>My App</title>
   </head>
   <body>
      <script src="main.js"></script>
   </body>
   </html>

```

### 📌 La Consola del Navegador en JavaScript

La consola del navegador es una herramienta de desarrollo que permite a los programadores ver mensajes de depuración, ejecutar código JavaScript en tiempo real y diagnosticar errores en sus aplicaciones web.

#### 📢 ¿Cómo acceder a la consola?
Puedes abrir la consola en la mayoría de los navegadores con las siguientes combinaciones de teclas:

- **Google Chrome / Edge**: `F12` o `Ctrl + Shift + J` (`Cmd + Option + J` en Mac)
- **Firefox**: `F12` o `Ctrl + Shift + K` (`Cmd + Option + K` en Mac)
- **Safari**: Activar en "Desarrollador" y luego `Cmd + Option + C`

---

## 🛠 Métodos más usados en `console`

### 1️⃣ `console.log()`
Muestra mensajes de información en la consola. Es el más común.

```javascript

   console.log("Hola, mundo!"); // 📌 Salida: Hola, mundo!

```

### 2️⃣ `console.error()`
Muestra mensajes de error en rojo para facilitar la depuración.

```javascript

   console.error("Ocurrió un error inesperado!"); // 📌 Ocurrió un error inesperado!

```

### 3️⃣ `console.warn()`
Muestra mensajes de advertencia en amarillo.

```javascript

   console.warn("Esto es una advertencia!");

```

### 4️⃣ `console.table()`
Muestra datos en formato de tabla (útil para arrays y objetos).

```javascript

   const usuarios = [
      { nombre: "Ana", edad: 30 },
      { nombre: "Carlos", edad: 25 },
   ];

console.table(usuarios);
   
```

### 5️⃣ `console.group() y console.groupEnd()`
Agrupa mensajes en la consola para una mejor organización.

```javascript

   console.group("Detalles del usuario");
   console.log("Nombre: Juan");
   console.log("Edad: 35");
   console.groupEnd();
   
```

### 6️⃣ `console.time() y console.timeEnd()`
Mide el tiempo de ejecución de una operación.

```javascript

   console.time("Proceso");
      for (let i = 0; i < 1000000; i++) {} // Operación simulada
   console.timeEnd("Proceso");

   
```

### 7️⃣ `console.clear()`
Limpia la consola.

```javascript

console.clear();

   
```

## ¿Por qué usar la consola?
- Para depurar código y encontrar errores.
- Para monitorear el rendimiento de funciones.
- Para visualizar datos de manera clara con console.table().
- Para organizar mejor los logs con console.group().

# Alertas
alert() es un método del objeto global window en JavaScript que muestra un cuadro de diálogo emergente con un mensaje. Se usa comúnmente para dar información al usuario o advertencias simples.

###  Características de alert()
- Muestra un cuadro de diálogo con un mensaje y un botón "Aceptar".
- Bloquea la ejecución del código hasta que el usuario cierre el cuadro de alerta.
- No devuelve ningún valor.

### Uso básico de alert()
```javascript

   alert("¡Hola, mundo!");

```
 Muestra un cuadro de alerta con el mensaje "¡Hola, mundo!" y un botón para cerrarlo.

 ### Ejemplos de uso

- Mostrar un mensaje simple
```javascript

   alert("¡Bienvenido a nuestra página web!");

```

- Alerta con concatenación de variables
```javascript

   let nombre = "Carlos";
   alert("Hola, " + nombre + "! Bienvenido.");

```

- Alerta después de una acción del usuario
```javascript

   document.getElementById("boton").addEventListener("click", function() {
      alert("¡Botón presionado!");
   });

```

- Alerta con un mensaje de advertencia
```javascript

   let edad = prompt("¿Cuál es tu edad?");

   if (edad < 18) {
      alert(" No puedes acceder, eres menor de edad.");
   } else {
      alert("Bienvenido.");
   }

```

### Desventajas de alert()
- Interrumpe la experiencia del usuario.
- No es personalizable (no permite cambiar estilos ni botones).
- Se recomienda usar alternativas como modales personalizados en lugar de alert() en aplicaciones modernas.

### Conclusión:
alert() es útil para mostrar mensajes rápidos, pero no es ideal para interfaces de usuario interactivas. Se recomienda usarlo solo en casos simples o de depuración.

# Comentarios
```javascript

   // Comentario eb linea

   /*
      Comentario en bloque
      Comentario en bloque
      Comentario en bloque
   */

```

# Revisando las bases de JavaScript

# Variables en JavaScript

Las variables son elementos esenciales en cualquier lenguaje de programación. En JavaScript, las variables se utilizan para almacenar valores y hacer referencia a ellos en nuestro código.

## Declaración de variables

En JavaScript, podemos declarar variables usando las palabras clave `var`, `let`, o `const`. La diferencia entre estas tres es cómo manejan el alcance y la asignación de valores.

### `var`

La palabra clave `var` se utiliza para declarar variables globales o locales en una función sin importar el bloque en el que se declare.

```js
var miVariable = "Hola mundo";
```

En el ejemplo anterior, la variable `miVariable` es declarada en el ámbito global. Esto significa que la variable `miVariable` puede ser accedida desde cualquier parte del código. También es posible declarar variables e inicializarlas o asignarle valores más adelante.

```js
// Declaración de variables
var nombre;

// Asignación de valores
nombre = "Juan";

// Declaración de variables
var edad, programas, numeroIdentificacion;

// Asignación de valores
edad = 30;
programas = true;
numeroIdentificacion = 123456789;
```

### `let`

La palabra clave `let` se utiliza para declarar variables locales en un bloque, declaración o expresión, y solo está disponible dentro del bloque en el que se declara.

```js
let miVariable = "Hola mundo";
```

### `const`

La palabra clave `const` se utiliza para declarar variables de solo lectura que no pueden ser reasignadas. El valor de una variable `const` no puede cambiar a lo largo de la ejecución del programa.

```js
const miVariable = "Hola mundo";
```

### Ejemplo

Cuando usar `var`, `let` o `const`?

Depende de la situación. Si deseas declarar una variable global, usa `var`. Si deseas declarar una variable local, usa `let`. Si deseas declarar una variable de solo lectura, usa `const`.

```javascript
// Declaración de variables
var nombre = "Juan";
let paisDeResidencia = "España";
const edad = 30;
var programas = true;
const numeroIdentificacion = 123456789;
let bandasFavoritas = ["The Beatles", "Led Zeppelin", "Queen"];

// Creación de objeto
const persona = {
  nombre: nombre,
  paisDeResidencia: paisDeResidencia,
  edad: edad,
  programas: programas,
  numeroIdentificacion: numeroIdentificacion,
  bandasFavoritas: bandasFavoritas,
};

console.log(persona);
```

## Ámbito
JavaScript tiene ámbito de función y ámbito de bloque. Las variables declaradas
con var tienen ámbito de función, lo que significa que están disponibles en toda la
función que las contiene. En cambio, las variables declaradas con let y const tienen
ámbito de bloque y solo están disponibles dentro del bloque (por ejemplo, dentro de un
bucle for o una estructura if). PHP, por defecto, utiliza un ámbito global para las
variables, pero se pueden declarar globales dentro de funciones.

```javascript

   function ejemplo() {
      if (true) {
         var x = 10; // var tiene alcance de función
         let y = 20; // let tiene alcance de bloque
      }
      console.log(x); // 10 (porque var es accesible fuera del bloque)
      console.log(y); // Error: y is not defined (porque let solo existe en el bloque if)
   }

   ejemplo();

```

## Buenas prácticas

1. Utiliza nombres descriptivos para tus variables. Por ejemplo, `nombre` es mejor que `n`.
2. Utiliza nombres que sean cortos y concisos.
3. Utiliza nombres que sean fáciles de escribir, leer, pronunciar, recordar y fáciles de buscar en el código.
4. Utiliza nombres en inglés en lo posible.
5. Las variables no deben contener espacios y no pueden contener caracteres especiales.
6. Las variables no deben contener palabras reservadas de JavaScript.
7. Las variables no deben contener nombres de funciones, métodos, clases, objetos, etc.
8. Las variables no deben iniciar con números, pero pueden contenerlos.
9. Los nombres de las variables deben ser en minúsculas, a menos que sean constantes.
10. Los tipos de escritura de las variables deben ser camelCase o snake_case.


# Tipos de datos en JavaScript

En JavaScript, existen letios tipos de datos que se pueden utilizar para almacenar información en letiables.

* `string`
* `number`
* `boolean`
* `undefined`
* `null`
* `symbol`
* `bigint`
* `array`
* `object`

## Tipo de dato `string`

El tipo de datos `string` o cadena de caracteres se utiliza para representar texto.

```js
let nombre = "Juan";
let apellido = "Pérez";
let nombreCompleto = nombre + " " + apellido;
```

También se pueden utilizar caracteres especiales en las cadenas de texto, como saltos de línea y tabulaciones, utilizando secuencias de escape.

```js
let mensaje = "Este es un mensaje\nen dos líneas.";
let titulo = "Página principal\t\tMi sitio web";
```

## Tipo de dato `number`

El tipo de datos `number` o numérico se utiliza para representar números enteros y decimales.

```js
let numeroEntero = 42;
let numeroDecimal = 3.14;
```

## Tipo de dato `boolean`

El tipo de datos `boolean` o booleano se utiliza para representar valores lógicos, es decir, verdadero o falso.

```js
let esMayorDeEdad = true;
let tieneLicencia = false;
```

## Tipo de dato `undefined`

El tipo de datos `undefined` se utiliza para representar un valor no definido.

```js
let valorNoDefinido;
```

## Tipo de dato `null`

El tipo de datos `null` se utiliza para representar un valor nulo o vacío.

```js
let valorNulo = null;
```

## Tipo de dato `symbol`

El tipo de datos `symbol` se utiliza para representar un valor único e inmutable.

```js
let simbolo = Symbol("mi-simbolo");
```

## Tipo de dato `bigint`

El tipo de datos `bigint` se utiliza para representar números enteros de gran tamaño.

```js
let numeroEnteroGrande = 9007199254740991n;
```

## Tipo de dato `Array`

El tipo de datos `Array` o arreglo se utiliza para representar una colección de datos ordenados.

```js
let frutas = ["manzana", "naranja", "plátano"];
let numeros = [1, 2, 3, 4, 5];
```

## Tipo de dato `object`

El tipo de datos `object` o objeto se utiliza para representar una colección de datos.

```js
let persona = {
  nombre: "Juan",
  apellido: "Pérez",
  edad: 30,
  programas: true,
  numeroIdentificacion: 123456789,
  bandasFavoritas: ["The Beatles", "Led Zeppelin", "Queen"],
};
```

## Buenas prácticas

Para saber cual es el tipo de dato de una letiable, podemos utilizar el operador `typeof`.

```javascript
let nombre = "Juan";
console.log(typeof nombre); // string

let edad = 30;
console.log(typeof edad); // number

let programas = true;
console.log(typeof programas); // boolean

let valorNoDefinido;
console.log(typeof valorNoDefinido); // undefined

let valorNulo = null;
console.log(typeof valorNulo); // object

let simbolo = Symbol("mi-simbolo");
console.log(typeof simbolo); // symbol

let numeroEnteroGrande = 9007199254740991n;
console.log(typeof numeroEnteroGrande); // bigint

let frutas = ["manzana", "naranja", "plátano"];
console.log(typeof frutas); // object

let persona = {
  nombre: "Juan",
  apellido: "Pérez",
  edad: 30,
  programas: true,
  numeroIdentificacion: 123456789,
  bandasFavoritas: ["The Beatles", "Led Zeppelin", "Queen"],
};
console.log(typeof persona); // object
```

# Operadores en JavaScript

Los operadores en JavaScript son símbolos que nos permiten realizar operaciones con uno o más valores. A continuación, se presentan algunos ejemplos de operadores en JavaScript.

## Operadores aritméticos

Los operadores aritméticos en JavaScript nos permiten realizar operaciones matemáticas básicas como suma, resta, multiplicación y división.

```javascript
let x = 10;
let y = 5;

let suma = x + y; // Suma
let resta = x - y; // Resta
let multiplicacion = x * y; // Multiplicación
let division = x / y; // División

console.log(suma); // salida: 15
console.log(resta); // salida: 5
console.log(multiplicacion); // salida: 50
console.log(division); // salida: 2
```

## Operadores de asignación

Los operadores de asignación en JavaScript nos permiten asignar un valor a una letiable.

```javascript
let x = 10;

x += 5; // Equivalente a x = x + 5
console.log(x); // salida: 15

x -= 3; // Equivalente a x = x - 3
console.log(x); // salida: 12

x *= 2; // Equivalente a x = x * 2
console.log(x); // salida: 24

x /= 4; // Equivalente a x = x / 4
console.log(x); // salida: 6
```

## Operadores de comparación

Los operadores de comparación en JavaScript nos permiten comparar dos valores y devolver un valor booleano (`true` o `false`) que indica si la comparación es verdadera o falsa.

| Operador | Descripción                                                                                |
| -------- | ------------------------------------------------------------------------------------------ |
| `==`     | Compara si dos valores son iguales, realizando una conversión de tipos si es necesario.    |
| `===`    | Compara si dos valores son iguales en tipo y valor, sin realizar una conversión de tipos.  |
| `!=`     | Compara si dos valores son diferentes, realizando una conversión de tipos si es necesario. |
| `>`      | Compara si el primer valor es mayor que el segundo valor.                                  |
| `<`      | Compara si el primer valor es menor que el segundo valor.                                  |
| `>=`     | Compara si el primer valor es mayor o igual que el segundo valor.                          |
| `<=`     | Compara si el primer valor es menor o igual que el segundo valor.                          |

```javascript
let x = 10;
let y = 5;

console.log(x > y); // salida: true
console.log(x < y); // salida: false
console.log(x >= y); // salida: true
console.log(x <= y); // salida: false
console.log(x == y); // salida: false
console.log(x != y); // salida: true
console.log(5 === "5"); // salida: false
```

## Operador de igualdad estricta

En JavaScript, el operador de igualdad estricta (`===`) se utiliza para comparar si dos valores son iguales en tipo y valor. A diferencia del operador de igualdad (`==`), el operador de igualdad estricta no realiza una conversión de tipos antes de la comparación.

```javascript
console.log(5 === 5); // salida: true
console.log(5 === "5"); // salida: false
console.log(true === 1); // salida: false
console.log(null === undefined); // salida: false
console.log("hello" === "hello"); // salida: true
console.log({} === {}); // salida: false
```

En el primer ejemplo, se comparan dos números iguales y de igual tipo, por lo que el resultado es `true`. En el segundo ejemplo, se comparan un número y una cadena de texto, que son de tipos diferentes, por lo que el resultado es `false`. En el tercer ejemplo, se comparan un booleano y un número, que son de tipos diferentes, por lo que el resultado es `false`. En el cuarto ejemplo, se comparan dos valores nulos, que son de igual tipo y valor, por lo que el resultado es `true`. En el quinto ejemplo, se comparan dos cadenas de texto iguales y de igual tipo, por lo que el resultado es `true`. En el último ejemplo, se comparan dos objetos distintos, por lo que el resultado es `false`.

Es importante tener en cuenta que el operador de igualdad estricta evalúa también el tipo de dato de los valores a comparar. Esto puede ser útil en ciertos casos para evitar errores de comparación por conversiones de tipos inesperadas.

## Operadores lógicos

Los operadores lógicos en JavaScript nos permiten combinar expresiones booleanas y devolver un valor booleano (`true` o `false`) que indica si la combinación es verdadera o falsa.

```javascript
let x = 10;
let y = 5;

console.log(x > 5 && y < 10); // salida: true
console.log(x > 5 || y > 10); // salida: true
console.log(!(x > y)); // salida: false
```

## Operador ternario

El operador ternario en JavaScript nos permite realizar una evaluación condicional y asignar un valor a una letiable según el resultado de la evaluación.

```javascript
let edad = 20;
let esMayorDeEdad = edad >= 18 ? "Sí" : "No";

console.log(esMayorDeEdad); // salida: "Sí"
```

En este ejemplo, la letiable `esMayorDeEdad` se asigna con el valor "Sí" si la `edad` es mayor o igual a 18, y con el valor "No" en caso contrario.

## Buenas prácticas

- Evita utilizar el operador de igualdad estricta (`===`) para comparar valores nulos o indefinidos. En estos casos, es mejor utilizar el operador de igualdad (`==`).
- Evitar el uso de operadores de igualdad débil (`==`) y desigualdad débil (`!=`) ya que pueden provocar resultados inesperados debido a la coerción automática de tipos de datos. En su lugar, se recomienda utilizar los operadores de igualdad estricta (`===`) y desigualdad estricta (`!==`) que comparan tanto el valor como el tipo de dato.
- Utilizar operadores bit a bit solo cuando sea necesario, ya que pueden hacer que el código sea difícil de entender. En su lugar, usar los operadores lógicos (`&&`, `||`) y los operadores de comparación (`===`, `!==`) cuando sea posible.
- Evitar el uso de operadores de incremento (`++`) y decremento (`--`), ya que pueden hacer que el código sea difícil de entender y llelet a errores sutiles. En su lugar, utilizar operaciones aritméticas simples.
- Ser conscientes de la precedencia y la asociatividad de los operadores. Si no estamos seguros de cómo se evaluará una expresión, utilizar paréntesis para asegurarnos de que se evalúe de la manera que queremos.
- Utilizar operadores lógicos cortocircuitados (`&&` y `||`) en lugar de los operadores ternarios cuando sea posible. Por ejemplo, en lugar de escribir:

```javascript
let resultado = (condicion) ? valor1 : valor2;
```

Podemos escribir:

```javascript
let resultado = condicion && valor1 || valor2;
```

Esto hace que el código sea más conciso y legible.


# Funciones en JavaScript

Las funciones son bloques de código reutilizable que se pueden llamar en cualquier momento durante la ejecución del programa. En JavaScript, puedes definir funciones de letias maneras, pero la más común es utilizando la palabra clave `function`.

```javascript
// Función que imprime un mensaje en la consola
function saludar() {
  console.log("Hola, bienvenido!");
}

// Llamada a la función
saludar(); // Hola, bienvenido!
```

En este ejemplo, hemos definido una función llamada `saludar` que no recibe parámetros. Cuando se llama a la función, se muestra en la consola "Hola, bienvenido!".

```javascript
// Definición de una función con un solo parámetro
function saludar(nombre) {
  console.log("Hola, " + nombre + "!");
}

// Llamada a la función
saludar("Juan"); // Hola, Juan!
```

En este ejemplo, hemos definido una función llamada `saludar` que acepta un parámetro `nombre`. Cuando se llama a la función, el valor del parámetro se concatena con el mensaje "Hola, " y se muestra en la consola.

## Parámetros y argumentos

Una función puede recibir cero o más parámetros. Los parámetros son letiables que se utilizan dentro de la función para realizar algún tipo de operación.

```javascript
// Definición de una función con dos parámetros
function saludar(nombre, apellido) {
  console.log("Hola, " + nombre + " " + apellido + "!");
}

// Llamada a la función
saludar("Juan", "Pérez"); // Hola, Juan Pérez!
```

La función `saludar` definida en el ejemplo es una función que acepta dos parámetros: `nombre` y `apellido`. Cuando se llama a la función con los valores "Juan" y "Pérez", se concatena el valor de `nombre` con el valor de `apellido` y se muestra el mensaje "Hola, Juan Pérez!" en la consola.

```javascript
// Definición de una función con dos parámetros
function sumar(a, b) {
  let resultado = a + b;
  console.log("El resultado de la suma es: " + resultado);
}

// Llamada a la función
sumar(5, 7); // El resultado de la suma es: 12
```

En este ejemplo, hemos definido una función llamada `sumar` que acepta dos parámetros `a` y `b`. Cuando se llama a la función, los valores de `a` y `b` se suman y se muestra el resultado en la consola.

## Retorno de valores

Una función puede devolver un valor utilizando la palabra clave `return`. Cuando una función devuelve un valor, se puede asignar a una letiable o utilizar como parte de una expresión.

```javascript
// Definición de una función que devuelve un valor
function sumar(a, b) {
  return a + b;
}

// Llamada a la función
let resultado = sumar(5, 7);
console.log("El resultado de la suma es: " + resultado); // El resultado de la suma es: 12
```

En este ejemplo, hemos definido una función llamada `sumar` que acepta dos parámetros `a` y `b`. Cuando se llama a la función, los valores de `a` y `b` se suman y se devuelve el resultado.

```javascript
// Definición de una función que devuelve un valor
function sumar(a, b) {
  return a + b;
}

// Llamada a la función
console.log("El resultado de la suma es: " + sumar(5, 7)); // El resultado de la suma es: 12
```

En este ejemplo, hemos definido una función llamada `sumar` que acepta dos parámetros `a` y `b`. Cuando se llama a la función, los valores de `a` y `b` se suman y se devuelve el resultado. En este caso, el resultado se muestra en la consola utilizando la función `console.log`.

```javascript
// Definición de una función que devuelve un valor
function multiplicar(a, b) {
  return a * b;
}

// Llamada a la función y asignación del valor de retorno a una letiable
let resultado = multiplicar(3, 4);
console.log("El resultado de la multiplicación es: " + resultado); // El resultado de la multiplicación es: 12
```

En este ejemplo, hemos definido una función llamada `multiplicar` que acepta dos parámetros `a` y `b`. Cuando se llama a la función, los valores de `a` y `b` se multiplican y se devuelve el resultado. Luego, el valor de retorno se asigna a una letiable llamada `resultado` y se muestra en la consola.

## Funciones anónimas

Una función anónima es una función que no tiene un nombre. En JavaScript, las funciones anónimas se utilizan principalmente como argumentos de otras funciones.

```javascript
// Definición de una función anónima como parámetro de otra función
setTimeout(function() {
  console.log("Han pasado 5 segundos");
}, 5000);
```

En este ejemplo, hemos utilizado la función `setTimeout` para ejecutar una función anónima después de 5 segundos. La función anónima no tiene nombre, pero se define dentro de la llamada a `setTimeout` y muestra un mensaje en la consola después de que han pasado los 5 segundos.

Espero que esta guía te haya sido útil para entender cómo trabajar con funciones en JavaScript. ¡A programar!


# Cierre de la semana
En este recorrido, aprendiste cómo:

- Agregar `JavaScript` en tu página web, ya sea `incrustado directamente` o enlazado `externamente`.
- Escribir en la consola, usar alertas y los comentarios en JavaScript como formas de interactuar y comunicarse con el código.

Además, comprendiste que:

- La consola de JavaScript es una herramienta que permite interactuar directamente con el navegador, consultar errores y ver los mensajes que imprimas en ella.
- Las alertas se utilizan para interactuar con los usuarios.
- Los comentarios son esenciales para documentar el código, proporcionando claridad a otros desarrolladores que puedan trabajar en el mismo código en el futuro.

También revisaste algunos elementos fundamentales en la mayoría de los lenguajes de programación, como:

- Variables: aprendiste a declarar variables utilizando var, let, y const.
- Estructuras de control: comprendiste que los operadores if, else if, else permiten realizar decisiones basadas en condiciones.
- Operadores lógicos: como && (AND), || (OR) y ! (NOT), que se utilizan para combinar y evaluar múltiples condiciones.
- Funciones en JavaScript:
   - Cómo definir funciones utilizando la palabra clave function.
   - Cómo pasar parámetros a funciones.
   - Cómo ejecutar código dentro de funciones y devolver valores usando return.

Ahora, ¡a practicar! 🚀

# Ejercicios
1. `Contraseña válida`
  Escribir una función llamada contrasenaValida que reciba un string y retorne true si el string es igual a "2Fj(jjbFsuj" o "eoZiugBf&g9". De lo contrario debe retornar false.

2. `Calcular impuestos`
Escribir una función llamada calcularImpuestos que reciba dos argumentos numéricos: edad e ingresos. Si edad es igual o mayor a 18 y los ingresos son iguales o mayores a 1000 debe retornar ingresos * 40%. De lo contrario debe retornar 0.

3. `IMC (ïndice de masa corporal)`

El índice de masa corporal (IMC), o BMI por sus siglas en inglés, es un valor que determina la cantidad de grasa de una persona.

El BMI se calcula con la siguiente formula: peso / altura^2 (Altura al cuadrado)

Escribir una función llamada bmi que reciba dos argumentos: peso y altura, y retorne un string con las siguientes posibilidades:

"Bajo de peso" si el BMI < 18.5
"Normal" si está entre 18.5 y 24.9
"Sobrepeso" si está entre 25 y 29.9
"Obeso" si es igual o mayor a 30

# Evalúa tus conocimientos
[Test semana 1](https://docs.google.com/forms/d/e/1FAIpQLSeyVFmriGJgh3KclBRfFP9XP_Is2sJqEs6jrBqKcYREtW00gQ/viewform?usp=sharing)



# Semana 2: Profundizando en el control de Javascript

## Arrays

Un array en JavaScript es una estructura de datos que se utiliza para almacenar una colección de elementos, como números, cadenas de texto u objetos. Los elementos de un array están indexados numéricamente, comenzando desde cero. Es decir, el primer elemento se encuentra en la posición 0, el segundo en la posición 1, y así sucesivamente.

Para crear un array en JavaScript, se puede utilizar la siguiente sintaxis:

```javascript
var miArray = []; // Crea un array vacío
```

O bien:

```javascript
var miArray = new Array(); // Crea un array vacío
```

Para crear un array con elementos, se puede utilizar la siguiente sintaxis:

```javascript
var miArray = [1, 'Hola', [3], true]; // Crea un array con tres elementos
```

O bien:

```javascript
var miArray = new Array(1, 2, 3); // Crea un array con tres elementos
```

Es posible usar las palabras reservadas `var`, `let` o `const` para declarar un array. Por ejemplo:

```javascript
var miArray = [1, 2, 3]; // Crea un array con tres elementos
let miArray = [1, 2, 3]; // Crea un array con tres elementos
const miArray = [1, 2, 3]; // Crea un array con tres elementos
```

Para acceder a un elemento de un array, se puede utilizar la siguiente sintaxis:

```javascript
var miArray = [1, 2, 3]; // Crea un array con tres elementos
console.log(miArray[0]); // Muestra el primer elemento del array en la consola
```

Para modificar un elemento de un array, se puede utilizar la siguiente sintaxis:

```javascript
var miArray = [1, 2, 3]; // Crea un array con tres elementos
miArray[0] = 4; // Modifica el primer elemento del array
console.log(miArray[0]); // Muestra el primer elemento del array en la consola
```

## Buenas prácticas

- Utilizar `const` en lugar de `let` para declarar arrays que no serán modificados. De esta manera, se evita que el array sea reasignado accidentalmente y se hace más claro que el array no será modificado.
- Evitar la mutación directa de los elementos del array, especialmente cuando se trata de arrays anidados. En su lugar, utilizar métodos de array que no mutan el array original, como `map()`, `filter()`, `reduce()`, etc.
- Evitar el uso de bucles `for` para recorrer arrays. En su lugar, utilizar métodos de array como `forEach()`, `map()`, `filter()`, `reduce()`, etc. Estos métodos son más legibles y menos propensos a errores.
- Utilizar nombres descriptivos y legibles para los arrays y las variables que contienen arrays. Esto hace que el código sea más fácil de entender y depurar.
- Utilizar el método `Array.isArray()` para verificar si un valor es un array. Esto es más seguro que utilizar la comprobación de tipo `typeof`.
- Ser consciente de las operaciones costosas en términos de rendimiento en los arrays, como la reordenación y la eliminación de elementos. En su lugar, utilizar operaciones que sean más eficientes, como el método `splice()`.

Siguiendo estas buenas prácticas con los arrays en JavaScript, podemos escribir código más legible, eficiente y menos propenso a errores sutiles.

# Agregar y eliminar datos de un arreglo

En JavaScript, un arreglo es una estructura de datos que nos permite almacenar una colección de elementos en una sola variable. Una vez que hemos creado un arreglo, podemos agregar nuevos elementos, eliminar elementos existentes y modificar elementos ya existentes en el arreglo.

## Agregar elementos a un arreglo

Hay varias formas de agregar elementos a un arreglo en JavaScript:

### Método push()

El método `push()` nos permite agregar uno o más elementos al final de un arreglo. El método devuelve la nueva longitud del arreglo.

```javascript
// Definición de un arreglo
let miArreglo = ['manzana', 'banana', 'cereza'];
miArreglo.push('durazno');
console.log(miArreglo); // ['manzana', 'banana', 'cereza', 'durazno']
```

También podemos agregar varios elementos a la vez utilizando el método `push()`:

```javascript
let miArreglo = ['manzana', 'banana', 'cereza'];
miArreglo.push('durazno', 'fresa', 'uva');
console.log(miArreglo); // ['manzana', 'banana', 'cereza', 'durazno', 'fresa', 'uva']
```

### Método unshift()

El método `unshift()` nos permite agregar uno o más elementos al inicio de un arreglo. El método devuelve la nueva longitud del arreglo.

```javascript
let miArreglo = ['manzana', 'banana', 'cereza'];
miArreglo.unshift('durazno');
console.log(miArreglo); // ['durazno', 'manzana', 'banana', 'cereza']
```

También podemos agregar varios elementos a la vez utilizando el método `unshift()`:

```javascript
let miArreglo = ['manzana', 'banana', 'cereza'];
miArreglo.unshift('durazno', 'fresa', 'uva');
console.log(miArreglo); // ['durazno', 'fresa', 'uva', 'manzana', 'banana', 'cereza']
```

### Operador spread (ES6)

El operador spread `...` nos permite agregar elementos de otro arreglo al final de nuestro arreglo actual:

```javascript
let miArreglo = ['manzana', 'banana', 'cereza'];
let otrosFrutos = ['durazno', 'fresa', 'uva'];
miArreglo = [...miArreglo, ...otrosFrutos];
console.log(miArreglo); // ['manzana', 'banana', 'cereza', 'durazno', 'fresa', 'uva']
```

### Agregar con el método splice()

El método `splice()` nos permite agregar elementos a un array en cualquier posición. Para hacerlo, debemos indicar la posición en la que queremos agregar los elementos, la cantidad de elementos que queremos eliminar (en este caso 0, ya que no queremos eliminar nada) y los elementos que queremos agregar.

```javascript
let numeros = [1, 2, 3, 4, 5];
numeros.splice(2, 0, 6, 7);
console.log(numeros); // [1, 2, 6, 7, 3, 4, 5]
```

En este ejemplo, hemos agregado los números 6 y 7 en la posición 2 del array numeros. Como segundo argumento, pasamos el valor 0 ya que no queremos eliminar ningún elemento.

## Eliminar elementos de un arreglo

Hay varias formas de eliminar elementos de un arreglo en JavaScript:

### Método pop()

El método `pop()` nos permite eliminar el último elemento de un arreglo. El método devuelve el elemento eliminado.

```javascript
let miArreglo = ['manzana', 'banana', 'cereza'];
let frutaEliminada = miArreglo.pop();
console.log(miArreglo); // ['manzana', 'banana']
console.log(frutaEliminada); // 'cereza'
```

### Método shift()

El método `shift()` nos permite eliminar el primer elemento de un arreglo. El método devuelve el elemento eliminado.

```javascript
let miArreglo = ['manzana', 'banana', 'cereza'];
let frutaEliminada = miArreglo.shift();
console.log(miArreglo); // ['banana', 'cereza']
console.log(frutaEliminada); // 'manzana'
```

## Eliminar con el método splice()

El método `splice()` también nos permite eliminar elementos de un array. Para hacerlo, debemos indicar la posición inicial de los elementos a eliminar y la cantidad de elementos a eliminar.

```javascript
let numeros = [1, 2, 3, 4, 5];
numeros.splice(2, 2);
console.log(numeros); // [1, 2, 5]
```

En este ejemplo, hemos eliminado los elementos en las posiciones 2 y 3 del array numeros (el número 3 y 4), ya que hemos indicado que queremos eliminar 2 elementos a partir de la posición 2.

También podemos guardar los elementos eliminados en una variable:

```javascript
let numeros = [1, 2, 3, 4, 5];
let numerosEliminados = numeros.splice(2, 2);
console.log(numeros); // [1, 2, 5]
console.log(numerosEliminados); // [3, 4]
```

En este caso, hemos eliminado los elementos en las posiciones 2 y 3 del array `numeros` y los hemos guardado en la variable `numerosEliminados`.

## Buenas prácticas

- Utilizar métodos de array que no mutan el array original, como `concat()`, `slice()`, `map()`, `filter()`, `reduce()`, etc. Esto es especialmente importante si se está trabajando con un array que no se debe modificar directamente.
- Utilizar el método `push()` para agregar elementos al final del array. Este método es más eficiente que utilizar la asignación de índice (`array[i] = value`) para agregar elementos al final.
- Utilizar el método `unshift()` para agregar elementos al inicio del array. Este método es más eficiente que utilizar la asignación de índice (`array[i] = value`) para agregar elementos al inicio.
- Utilizar el método `pop()` para eliminar el último elemento del array. Este método es más eficiente que utilizar la asignación de índice (`delete array[i]`) para eliminar el último elemento.
- Utilizar el método `shift()` para eliminar el primer elemento del array. Este método es más eficiente que utilizar la asignación de índice (`delete array[0]`) para eliminar el primer elemento.
- Evitar la eliminación de elementos del medio del array, ya que esto puede provocar la reorganización del resto de los elementos y afectar el rendimiento. En su lugar, utilizar el método `splice()` para eliminar elementos del medio del array.
- Ser cuidadoso al utilizar métodos de array que modifican el array original, como `sort()`, `reverse()`, `splice()`, etc. Asegurarse de que la mutación del array sea necesaria y de que se comprenda completamente su impacto.

Siguiendo estas buenas prácticas al agregar y eliminar elementos de un array en JavaScript, podemos escribir código más legible, eficiente y menos propenso a errores sutiles.

# Iterando arreglos en JavaScript

Iterando arreglos en JavaScript
En JavaScript, es muy común trabajar con arreglos y recorrerlos para realizar alguna tarea específica, como mostrar su contenido en la pantalla, realizar cálculos, filtrar elementos, etc.

Para iterar un arreglo en JavaScript, podemos usar varios métodos, como `for`, `for...of`, `forEach`, `map`, `filter`, `reduce`, etc. En este tutorial, veremos algunos ejemplos de cómo utilizar estos métodos.

## Iterando un arreglo con `for`

El método `for` es el más básico y común para iterar un arreglo en JavaScript. La sintaxis es la siguiente:

```javascript
for (var i = 0; i < arreglo.length; i++) {
  // código a ejecutar en cada iteración
}
```

Aquí, `i` es el índice del arreglo que se va a iterar, `arreglo.length` es la cantidad de elementos del arreglo, y `código a ejecutar en cada iteración` es el bloque de código que se ejecutará en cada vuelta del ciclo.

Por ejemplo, supongamos que tenemos un arreglo de números y queremos sumarlos todos. Podemos utilizar el método `for` de la siguiente manera:

```javascript
var numeros = [1, 2, 3, 4, 5];
var suma = 0;

for (var i = 0; i < numeros.length; i++) {
  suma += numeros[i];
}

console.log("La suma de los números es:", suma);
```

En este ejemplo, el ciclo itera el arreglo numeros y va sumando cada uno de los elementos. La variable suma guarda el resultado final, que se muestra en la consola con console.log().

## Iterando un arreglo con `for...of`

El método `for...of` es una forma más moderna y sencilla de iterar un arreglo en JavaScript. La sintaxis es la siguiente:

```javascript
for (var elemento of arreglo) {
  // código a ejecutar en cada iteración
}
```

Aquí, `elemento` es el valor de cada elemento del arreglo, y `código a ejecutar en cada iteración` es el bloque de código que se ejecutará en cada vuelta del ciclo.

Por ejemplo, supongamos que queremos mostrar en la consola todos los nombres de un arreglo. Podemos utilizar el método `for...of` de la siguiente manera:

```javascript
var nombres = ["Juan", "María", "Pedro", "Ana"];

for (var nombre of nombres) {
  console.log(nombre);
}
```

En este ejemplo, el ciclo itera el arreglo nombres y muestra cada uno de los elementos en la consola con console.log().

## Iterando un arreglo con `forEach`

El método `forEach` es otro método común para iterar un arreglo en JavaScript. La sintaxis es la siguiente:

```javascript
arreglo.forEach(function(elemento, indice) {
  // código a ejecutar en cada iteración
});
```

Aquí, `elemento` es el valor de cada elemento del arreglo, `indice` es el índice de cada elemento, y `código a ejecutar en cada iteración` es el bloque de código que se ejecutará en cada vuelta del ciclo.

Por ejemplo, supongamos que queremos mostrar en la consola todos los nombres de un arreglo, junto con su índice. Podemos utilizar el método `forEach` de la siguiente manera:

```javascript
var nombres = ["Juan", "María", "Pedro", "Ana"];

nombres.forEach(function(nombre, indice) {
  console.log(indice, nombre);
});
```

En este ejemplo, el ciclo itera el arreglo nombres y muestra cada uno de los elementos en la consola con console.log().

## Iterando un arreglo con `map`

El método `map()` es similar al método `forEach()`, pero en lugar de realizar una acción en cada elemento del arreglo, el método `map()` crea un nuevo arreglo con los resultados de aplicar una función a cada elemento del arreglo original.

La sintaxis del método `map()` es la siguiente:

```javascript
var nuevoArreglo = array.map(function(elemento) {
  // Función que devuelve un nuevo valor para el elemento
});
```

Este método llama a la función especificada para cada elemento del arreglo `array`. La función especificada debe tomar un parámetro, que representa el valor actual del elemento del arreglo, y debe devolver un nuevo valor para ese elemento.

Por ejemplo, si queremos crear un nuevo arreglo `dobleNumeros` que contenga los valores del arreglo `numeros` multiplicados por dos, podemos hacer lo siguiente:

```javascript
var numeros = [1, 2, 3, 4, 5];

var dobleNumeros = numeros.map(function(numero) {
  return numero * 2;
});

console.log(dobleNumeros); // [2, 4, 6, 8, 10]
```

En este ejemplo, el método `map()` llama a la función especificada para cada elemento del arreglo `numeros`. La función especificada multiplica el valor del elemento por dos y devuelve el resultado.

## Iterando un arreglo con `filter`

El método `filter()` crea un nuevo arreglo con todos los elementos que cumplan con la condición implementada por la función dada.

La sintaxis del método `filter()` es la siguiente:

```javascript
var nuevoArreglo = array.filter(function(elemento) {
  // Función que devuelve true o false
});
```

Este método llama a la función especificada para cada elemento del arreglo `array`. La función especificada debe tomar un parámetro, que representa el valor actual del elemento del arreglo, y debe devolver un valor booleano que indica si el elemento debe incluirse en el nuevo arreglo.

Por ejemplo, si queremos crear un nuevo arreglo `pares` que contenga solo los números pares del arreglo `numeros`, podemos hacer lo siguiente:

```javascript
var numeros = [1, 2, 3, 4, 5];

var pares = numeros.filter(function(numero) {
  return numero % 2 === 0;
});

console.log(pares); // [2, 4]
```

En este ejemplo, el método `filter()` llama a la función especificada para cada elemento del arreglo `numeros`. La función especificada verifica si el valor del elemento es par, y devuelve true o false según corresponda.

## Iterando un arreglo con `find`

El método `find()` devuelve el primer elemento del arreglo que cumpla con la condición implementada por la función dada.

La sintaxis del método `find()` es la siguiente:

```javascript
var elemento = array.find(function(elemento) {
  // Función que devuelve true o false
});
```

Este método llama a la función especificada para cada elemento del arreglo `array`. La función especificada debe tomar un parámetro, que representa el valor actual del elemento del arreglo, y debe devolver un valor booleano que indica si el elemento cumple con la condición.

Por ejemplo, si queremos encontrar el primer número par del arreglo `numeros`, podemos hacer lo siguiente:

```javascript
var numeros = [1, 2, 3, 4, 5];

var primerPar = numeros.find(function(numero) {
  return numero % 2 === 0;
});

console.log(primerPar); // 2
```

En este ejemplo, el método `find()` llama a la función especificada para cada elemento del arreglo `numeros`. La función especificada verifica si el valor del elemento es par, y devuelve true o false según corresponda.

## Iterando un arreglo con `reduce`

El método `reduce()` aplica una función a un acumulador y a cada valor de un arreglo (de izquierda a derecha) para reducirlo a un único valor.

La sintaxis del método `reduce()` es la siguiente:

```javascript
var valorFinal = array.reduce(function(acumulador, elemento) {
  // Función que devuelve el nuevo valor del acumulador
}, valorInicial);
```

Este método llama a la función especificada para cada elemento del arreglo `array`. La función especificada debe tomar dos parámetros, que representan el valor actual del acumulador y el valor actual del elemento del arreglo, y debe devolver el nuevo valor del acumulador.

Por ejemplo, si queremos sumar todos los números del arreglo `numeros`, podemos hacer lo siguiente:

```javascript
var numeros = [1, 2, 3, 4, 5];

var suma = numeros.reduce(function(acumulador, numero) {
  return acumulador + numero;
}, 0);

console.log(suma); // 15
```

En este ejemplo, el método `reduce()` llama a la función especificada para cada elemento del arreglo `numeros`. La función especificada suma el valor del elemento al valor del acumulador, y devuelve el nuevo valor del acumulador.

## Iterando un arreglo con `every`

El método `every()` comprueba si todos los elementos del arreglo cumplen con la condición implementada por la función dada.

La sintaxis del método `every()` es la siguiente:

```javascript
var resultado = array.every(function(elemento) {
  // Función que devuelve true o false
});
```

Este método llama a la función especificada para cada elemento del arreglo `array`. La función especificada debe tomar un parámetro, que representa el valor actual del elemento del arreglo, y debe devolver un valor booleano que indica si el elemento cumple con la condición.

Por ejemplo, si queremos verificar si todos los números del arreglo `numeros` son pares, podemos hacer lo siguiente:

```javascript
var numeros = [2, 4, 6, 8, 10];

var todosPares = numeros.every(function(numero) {
  return numero % 2 === 0;
});

console.log(todosPares); // true
```

En este ejemplo, el método `every()` llama a la función especificada para cada elemento del arreglo `numeros`. La función especificada verifica si el valor del elemento es par, y devuelve true o false según corresponda.

## Iterando un arreglo con `some`

El método `some()` comprueba si al menos un elemento del arreglo cumple con la condición implementada por la función dada.

La sintaxis del método `some()` es la siguiente:

```javascript
var resultado = array.some(function(elemento) {
  // Función que devuelve true o false
});
```

Este método llama a la función especificada para cada elemento del arreglo `array`. La función especificada debe tomar un parámetro, que representa el valor actual del elemento del arreglo, y debe devolver un valor booleano que indica si el elemento cumple con la condición.

Por ejemplo, si queremos verificar si al menos un número del arreglo `numeros` es par, podemos hacer lo siguiente:

```javascript
var numeros = [1, 3, 5, 7, 9];

var algunPar = numeros.some(function(numero) {
  return numero % 2 === 0;
});

console.log(algunPar); // false
```

En este ejemplo, el método `some()` llama a la función especificada para cada elemento del arreglo `numeros`. La función especificada verifica si el valor del elemento es par, y devuelve true o false según corresponda.

En conclusión, los métodos `map()`, `filter()`, `find()`, `reduce()`, `every()`, `some()` son muy útiles para iterar un arreglo y realizar operaciones sobre sus elementos. Si bien no son los únicos métodos que nos permiten iterar un arreglo, son los métodos más utilizados.


## Buenas prácticas

- Utilizar métodos de array como `forEach()`, `map()`, `filter()`, `reduce()`, etc. en lugar de bucles `for`. Estos métodos son más legibles y menos propensos a errores.
- Ser cuidadoso al utilizar la indexación de array (`array[i]`) dentro de un bucle. Asegurarse de que el índice sea válido y de que no se produzca un desbordamiento o subdesbordamiento.
- Utilizar nombres descriptivos y legibles para las variables del bucle y para los elementos del array. Esto hace que el código sea más fácil de entender y depurar.
- Utilizar el método `Array.isArray()` para verificar si un valor es un array antes de iterar sobre él. Esto es más seguro que utilizar la comprobación de tipo `typeof`.
- Utilizar la sintaxis de desestructuración para acceder a los elementos de un array en lugar de utilizar la indexación de array. Esto hace que el código sea más legible y menos propenso a errores.
- Evitar la mutación directa de los elementos del array dentro del bucle, especialmente cuando se trata de arrays anidados. En su lugar, utilizar métodos de array que no mutan el array original, como `map()`, `filter()`, `reduce()`, etc.
- Utilizar la declaración de const en lugar de let para declarar la variable del bucle si no se va a modificar dentro del bucle.

Siguiendo estas buenas prácticas al iterar con arrays en JavaScript, podemos escribir código más legible, eficiente y menos propenso a errores sutiles.

# Cierre de la semana
En este recorrido, aprendiste cómo:

   - Variables, arrays, operadores `(if - else)` y bucles, para dar
   solución a los requerimientos del proyecto.
   - Asimismo, descubriste cómo utilizar
   - Revisaste los bucles for y while, que son fundamentales para realizar tareas iterativas,
   como recorrer matrices o realizar cálculos repetitivos.
   - También aprendiste que el bucle `for...in` es útil para examinar y trabajar con las claves
   y valores de un objeto de forma dinámica, permitiendo una iteración eficiente a través de todas las propiedades enumerables del objeto.

Con estos aprendizajes, ahora podrás utilizarlas variables y arreglos para resolver problemas relacionados con operaciones numéricas básicas integrando todo lo aprendido hasta el momento y generar programas complejos con operaciones matemáticas clasificando sus resultados.

Ahora, ¡a practicar! 🚀

# Ejercicios

### Ejercicio 1: Sumar números impares
Crea una función que reciba un arreglo de números y retorne la suma de los números impares utilizando un ciclo for.

### Ejercicio 2: Transformar y filtrar nombres
Utiliza métodos de arreglos (map y filter) para convertir un arreglo de nombres a mayúsculas y filtrar aquellos que tengan más de 5 caracteres.

### Ejercicio 3: Transformar y filtrar nombres
Crea un arreglo de objetos donde cada objeto represente a un estudiante con su nombre y nota. Luego, implementa una función que recorra el arreglo (usando un ciclo) para calcular el promedio de las notas. Además, se muestra cómo hacerlo usando el método reduce.

# Evalúa tus conocimientos
[Test semana 2](https://docs.google.com/forms/d/e/1FAIpQLSdnJDLPlG2Hnmpg3wTNk-hZUQMpwQ2a9x4D8UIbVPPgpOtUxw/viewform?usp=sharing)



# Experiencia de aprendizaje 2: Aplicando JavaScript para intervenir los elementos del DOM
# Semana 3: Interactuando con JavaScript y los navegadores
El `BOM (Browser Object Model)` es un conjunto de objetos que permite interactuar con el navegador. No forma parte del estándar de JavaScript, pero es proporcionado por los navegadores para manipular la ventana, la URL, la navegación y más.

Los principales objetos del BOM son:

## 1. window (Objeto Principal)
Es el objeto global en el navegador que representa la ventana del navegador. Todos los objetos del BOM son accesibles a través de window.

```javascript

   // Abre una nueva ventana
   let nuevaVentana = window.open('https://www.google.com', '_blank');

   // Cierra la ventana actual (solo si fue abierta con JS)
   window.close();

   // Muestra un cuadro de alerta
   window.alert('¡Hola, esto es una alerta!');

   // Muestra un cuadro de confirmación
   let respuesta = window.confirm('¿Deseas continuar?');

   // Muestra un cuadro de entrada
   let nombre = window.prompt('¿Cuál es tu nombre?');

   // Imprime la página
   window.print();

```

```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Abrir ventana</title>
   </head>
   <body>
      <div class="container">
         <h1>Abrir ventana del objeto window</h1>
         <hr>
         <button class="btn" name="abrir" id="abrir" onClick="abrirventana()">Abrir</button>   
         <button class="btn" name="cerrar" id="cerrar" onClick="cerrarVentana()">Cerrar</button> 
   
      </div>
    
         <script>
            // Con funciones
            let ventanaUno
            function abrirventana(){
               ventanaUno = window.open('https://www.duoc.cl/duoconline/', 'DUOC Online', 'status=no,resizable=yes, width=100,height=100')
            }

            function cerrarVentana(){
               ventanaUno.close();
            }


         </script>
   </body>
   </html>


```

## 2. navigator (Información del Navegador)
Proporciona información sobre el navegador y el sistema del usuario.

### Propiedades y Métodos de navigator
```javascript

   console.log(navigator.userAgent);  // Información del navegador
   console.log(navigator.language);   // Idioma del navegador
   console.log(navigator.platform);   // Plataforma del sistema operativo
   console.log(navigator.onLine);     // ¿El usuario está en línea?

```
## 3. screen (Información de la Pantalla)
Permite acceder a las dimensiones de la pantalla del usuario.

### Propiedades de screen
```javascript

   console.log(screen.width);  // Ancho de la pantalla
   console.log(screen.height); // Alto de la pantalla
   console.log(screen.availWidth);  // Ancho disponible (sin la barra de tareas)
   console.log(screen.availHeight); // Alto disponible
   console.log(screen.colorDepth);  // Profundidad de color en bits

```
## 4. location (Información de la URL)
Proporciona información sobre la URL actual y permite redirigir a otra página.

### Métodos y Propiedades de location
```javascript

         let ventanaUno

         function abrirventana(){
            ventanaUno = window.open('https://www.duoc.cl/duoconline/', 'DUOC Online', 'status=no,resizable=yes, width=400,height=600')
         }

         function cerrarVentana(){
            ventanaUno.close();
         }

        function datosURL(){

            let urlCompleta, urlProtocol, urlHost, urlRuta, urlConsulta, urlAnclaje;

            urlCompleta = location.href; // Devuelve la URL COMPLETA
            urlProtocol = location.protocol; // Devuelve el http:
            urlHost = location.host; // Devuelve el host, http://127.0.0.1:5501
            urlRuta = location.pathname; // Devuelve la ruta,  /semanas/semana-03/index.html
            urlConsulta = location.search; // Devulve los parametros de consulta, Si la URL es "https://ejemplo.com?nombre=Juan&edad=25" , Resultado: "?nombre=Juan&edad=25"
            urlAnclaje = location.hash; 

            console.log('urlCompleta-->', urlCompleta );
            console.log('urlProtocol-->', urlProtocol );
            console.log('urlHost-->', urlHost );
            console.log('urlRuta-->', urlRuta );
            console.log('urlConsulta-->', urlConsulta );
            console.log('urlAnclaje-->', urlAnclaje );

        }

        datosURL()


```

# 5. history (Historial de Navegación)
Permite interactuar con el historial de navegación del usuario.

## Métodos de history
```javascript

   // Regresar a la página anterior
   history.back();

   // Avanzar a la siguiente página
   history.forward();

   // Ir a una página específica en el historial (ejemplo: -2 retrocede dos páginas)
   history.go(-2);


```

# setInterval() y clearInterval() en JavaScript
`setInterval(función, tiempo)`: Ejecuta una función repetidamente cada cierto intervalo de tiempo (en milisegundos).

`clearInterval(id)`: Detiene un intervalo en ejecución.

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ventana Mágica 🪄</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="d-flex justify-content-center align-items-center vh-100 bg-light">

    <div class="text-center">
        <h2>🎩 Ventana Mágica 🪄</h2>
        <p>Haz clic en el botón para abrir una ventana que se moverá aleatoriamente por la pantalla.</p>
        <button id="abrirVentana" class="btn btn-primary">Abrir Ventana</button>
        <button id="cerrarVentana" class="btn btn-danger" disabled>Cerrar Ventana</button>
    </div>

    <script>
        let ventanaMagica;

        // Función para abrir la ventana y moverla aleatoriamente
        function abrirVentanaMagica() {

            if ( !ventanaMagica || ventanaMagica.closed ) {
                
                let ancho = 400;
                let alto = 300;
                
                // Obtener dimensiones de la pantalla con screen
                let screenW = screen.availWidth;
                let screenH = screen.availHeight;

                // Posición inicial aleatoria
                let posX = Math.floor(Math.random() * (screenW - ancho));
                let posY = Math.floor(Math.random() * (screenH - alto));

                // Abrir la ventana en una posición aleatoria
                ventanaMagica = window.open(
                    "", 
                    "VentanaMagica", 
                    `width=${ancho},height=${alto},left=${posX},top=${posY}`
                );

                // Agregar contenido a la ventana emergente
                ventanaMagica.document.body.innerHTML = `
                    <h1>🎉 ¡Contenido agregado con innerHTML!</h1>
                    <p>Esta ventana fue creada y luego modificada.</p>
                    <button onclick="window.close()">Cerrar Ventana</button>
                `;

                // Mover la ventana cada segundo
                let intervalo = setInterval(() => {
                    
                    if (ventanaMagica.closed) {
                        clearInterval(intervalo);
                        document.getElementById("cerrarVentana").setAttribute("disabled", "true");
                        return;
                    }

                    let newX = Math.floor(Math.random() * (screenW - ancho));
                    let newY = Math.floor(Math.random() * (screenH - alto));

                    ventanaMagica.moveTo(newX, newY);
                }, 1000);

                // Habilitar botón de cerrar
                document.getElementById("cerrarVentana").removeAttribute("disabled");
            }
            
        }

        // Función para cerrar la ventana
        function cerrarVentanaMagica() {
            if (ventanaMagica) {
                ventanaMagica.close();
                document.getElementById("cerrarVentana").setAttribute("disabled", "true");
            }
        }

        // Asignar eventos a los botones
        document.getElementById("abrirVentana").addEventListener("click", abrirVentanaMagica);
        document.getElementById("cerrarVentana").addEventListener("click", cerrarVentanaMagica);
    </script>

</body>
</html>

```

# Experiencia de aprendizaje 2: Aplicando JavaScript para intervenir los elementos del DOM
# Semana 4: Manipulando el DOM

# Dom

El DOM (Document Object Model) es una representación en forma de árbol de la estructura de un documento HTML (o XML). El DOM proporciona una interfaz que permite acceder y manipular los elementos y contenido de un documento web.

En JavaScript, podemos interactuar con el DOM para realizar diversas tareas, como acceder a elementos HTML, modificar su contenido, agregar o eliminar elementos, cambiar estilos y manejar eventos.

A continuación, te mostraré un ejemplo básico de cómo acceder y manipular el DOM utilizando JavaScript:

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>DOM</title>
</head>

<body>
    <h1 id="titulo">Título</h1>
    <p id="parrafo">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.</p>
    <button id="boton">Haz clic</button>

    <script>
        // Acceder a un elemento HTML
        const titulo = document.getElementById("titulo");
        console.log(titulo);

        // Modificar el contenido de un elemento HTML
        titulo.textContent = "Nuevo título";

        // Agregar un evento a un elemento HTML
        const boton = document.getElementById("boton");
        boton.addEventListener("click", () => {
            console.log("Haz hecho clic en el botón");
        });
    </script>
</body>
</html>
```

En este ejemplo, accedemos a un elemento HTML utilizando el método `getElementById` y lo almacenamos en una variable llamada `titulo`. Luego, modificamos el contenido del elemento utilizando la propiedad `textContent`. Finalmente, agregamos un evento al botón utilizando el método `addEventListener`.

Aqui podemos ver otro ejemplo de como acceder y manipular el DOM utilizando JavaScript:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Manipulación del DOM</title>
</head>
<body>
  <h1 id="titulo">¡Hola, Mundo!</h1>
  <p id="parrafo">Este es un párrafo de ejemplo.</p>

  <script>
    // Acceder a elementos del DOM
    const tituloElemento = document.getElementById("titulo");
    const parrafoElemento = document.getElementById("parrafo");

    // Modificar contenido de elementos
    tituloElemento.textContent = "¡Hola, UDD!";
    parrafoElemento.innerHTML = "Este es un párrafo modificado.";

    // Agregar un nuevo elemento
    const nuevoElemento = document.createElement("p");
    nuevoElemento.textContent = "Este es un nuevo párrafo.";
    document.body.appendChild(nuevoElemento);

    // Cambiar estilos
    tituloElemento.style.color = "red";
    parrafoElemento.style.fontSize = "20px";

    // Manejar eventos
    tituloElemento.addEventListener("click", function() {
      alert("¡Haz hecho clic en el título!");
    });
  </script>
</body>
</html>
```

En este ejemplo, utilizamos JavaScript dentro de la etiqueta `<script>` para acceder y manipular el DOM. Algunas acciones que realizamos son:

- Acceder a elementos del DOM utilizando `getElementById`.
- Modificar el contenido de elementos utilizando `textContent` y `innerHTML`.
- Crear un nuevo elemento utilizando `createElement` y agregarlo al DOM utilizando `appendChild`.
- Cambiar estilos utilizando la propiedad `style`.
- Manejar eventos utilizando `addEventListener`.

Recuerda que el DOM puede tener una estructura más compleja, con elementos anidados y diferentes atributos. Sin embargo, el ejemplo anterior te da una idea básica de cómo interactuar con el DOM utilizando JavaScript.

## Buenas prácticas

Algunas buenas prácticas para trabajar con el DOM son:

**Cachea las referencias a elementos del DOM:** Al acceder a elementos del DOM utilizando métodos como `getElementById` o `querySelector`, almacena esas referencias en variables para evitar buscar los elementos repetidamente. Esto mejora el rendimiento y evita el código redundante.

```javascript
// Mala práctica: Acceder al elemento del DOM cada vez que se necesita
document.getElementById("myElement").textContent = "Hola";

// Buena práctica: Almacenar la referencia del elemento en una variable
const myElement = document.getElementById("myElement");
myElement.textContent = "Hola";
```

**Utiliza eventos delegados:** En lugar de adjuntar un controlador de eventos a cada elemento individualmente, considera utilizar eventos delegados. Esto implica adjuntar el controlador de eventos a un elemento superior que contiene a todos los elementos objetivo. Luego, puedes utilizar la propiedad `event.target` para identificar el elemento específico que desencadenó el evento.

```javascript
// Mala práctica: Adjuntar un controlador de eventos a cada elemento
const button1 = document.getElementById("button1");
button1.addEventListener("click", function() {
  // Lógica del evento para button1
});

const button2 = document.getElementById("button2");
button2.addEventListener("click", function() {
  // Lógica del evento para button2
});

// Buena práctica: Utilizar eventos delegados
const container = document.getElementById("container");
container.addEventListener("click", function(event) {
  if (event.target.matches("button")) {
    // Lógica del evento para los botones
  }
});
```

**Evita la manipulación excesiva del DOM:** Realizar muchas modificaciones al DOM puede ser costoso en términos de rendimiento. En lugar de hacer múltiples cambios, considera agrupar las modificaciones en un solo bloque utilizando fragmentos de documento o manipulando cadenas de texto, y luego realizar una sola modificación al DOM.

```javascript
// Mala práctica: Modificar el DOM varias veces
const container = document.getElementById("container");
container.innerHTML = "";
container.appendChild(element1);
container.appendChild(element2);
container.appendChild(element3);

// Buena práctica: Agrupar las modificaciones y realizar una sola modificación
const container = document.getElementById("container");
const fragment = document.createDocumentFragment();
fragment.appendChild(element1);
fragment.appendChild(element2);
fragment.appendChild(element3);
container.innerHTML = "";
container.appendChild(fragment);
```

**Elimina los event listeners:** Si adjuntas un event listener a un elemento y posteriormente ya no lo necesitas, asegúrate de eliminarlo para evitar posibles fugas de memoria. Puedes utilizar el método `removeEventListener` para eliminar el event listener asociado a un elemento.

```javascript
// Mala práctica: No eliminar el event listener
const button = document.getElementById("myButton");
button.addEventListener("click", myFunction);

// Buena práctica: Eliminar el event listener cuando ya no se necesita
const button = document.getElementById("myButton");
button.addEventListener("click", myFunction);

// Cuando ya no se necesita el event listener
button.removeEventListener("click", myFunction);
```

Estas son solo algunas buenas prácticas al trabajar con el DOM en JavaScript. Recuerda que cada caso puede ser diferente y es importante adaptar las prácticas según las necesidades de tu proyecto.


# Eventos

Los eventos en JavaScript son acciones o sucesos que ocurren en el navegador y a los que podemos responder mediante la ejecución de código. Los eventos pueden ser desencadenados por el usuario (por ejemplo, hacer clic en un elemento, mover el mouse sobre un elemento, presionar una tecla) o pueden ser eventos generados por el propio navegador (por ejemplo, cargar la página, cambiar el tamaño de la ventana).

Para trabajar con eventos en JavaScript, generalmente utilizamos el método `addEventListener` para adjuntar un controlador de eventos a un elemento del DOM. El controlador de eventos es una función que se ejecutará cuando ocurra el evento.

A continuación, te mostraré un ejemplo básico de cómo trabajar con eventos en JavaScript:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Eventos en JavaScript</title>
</head>
<body>
  <button id="myButton">Haz clic aquí</button>

  <script>
    // Obtener una referencia al elemento del botón
    const button = document.getElementById("myButton");

    // Adjuntar un controlador de eventos al botón
    button.addEventListener("click", function() {
      alert("¡Has hecho clic en el botón!");
    });
  </script>
</body>
</html>
```

En este ejemplo, utilizamos JavaScript dentro de la etiqueta `<script>` para trabajar con eventos. Algunas acciones que realizamos son:

- Utilizar `getElementById` para obtener una referencia al elemento del botón.
- Utilizar `addEventListener` para adjuntar un controlador de eventos al botón.
- El controlador de eventos es una función anónima que se ejecutará cuando ocurra el evento de clic en el botón. En este caso, muestra un mensaje emergente utilizando `alert`.

Existen muchos eventos disponibles en JavaScript, como `click`, `mouseenter`, `keydown`, `submit`, entre otros. Puedes consultar la documentación oficial de eventos en JavaScript para obtener más información sobre los diferentes tipos de eventos y cómo utilizarlos.

[Referencia de Eventos Developer Mozilla](https://developer.mozilla.org/es/docs/Web/Events)

| Tipo de Evento      | Evento            | Descripción                                                                 |
|---------------------|-------------------|-----------------------------------------------------------------------------|
| **Mouse**           | click             | Se dispara cuando se hace clic con el botón izquierdo del ratón            |
|                     | dblclick          | Se dispara cuando se hace doble clic con el ratón                          |
|                     | mouseover         | Se dispara cuando el puntero entra en el área de un elemento               |
|                     | mouseout          | Se dispara cuando el puntero sale del área de un elemento                  |
|                     | mousedown         | Se dispara cuando se presiona un botón del ratón                           |
|                     | mouseup           | Se dispara cuando se suelta un botón del ratón                             |
|                     | mousemove         | Se dispara cuando el puntero se mueve sobre un elemento                    |
| **Teclado**         | keydown           | Se dispara cuando se presiona una tecla                                    |
|                     | keyup             | Se dispara cuando se suelta una tecla                                      |
|                     | keypress          | Se dispara cuando se presiona una tecla (obsoleto en algunos navegadores)  |
| **Formulario**      | submit            | Se dispara al enviar un formulario                                         |
|                     | change            | Se dispara cuando el valor de un input cambia (select, input, textarea)    |
|                     | input             | Se dispara en cada cambio del valor de un input                            |
|                     | focus             | Se dispara cuando un input recibe foco                                     |
|                     | blur              | Se dispara cuando un input pierde el foco                                  |
| **Ventana/Navegador**| load              | Se dispara cuando una página o recurso ha terminado de cargarse            |
|                     | unload            | Se dispara cuando se está saliendo de la página (obsoleto en algunos casos)|
|                     | resize            | Se dispara cuando se cambia el tamaño de la ventana                        |
|                     | scroll            | Se dispara cuando se hace scroll en un elemento o en la ventana            |
| **Clipboard**       | copy              | Se dispara cuando se copia contenido                                       |
|                     | cut               | Se dispara cuando se corta contenido                                       |
|                     | paste             | Se dispara cuando se pega contenido                                        |


Recuerda que los eventos son fundamentales para interactuar con los usuarios y responder a sus acciones en el navegador. Al utilizar eventos de manera efectiva, puedes crear interacciones dinámicas y enriquecer la experiencia del usuario en tu sitio web o aplicación.

# Selección del DOM

La selección de elementos del DOM en JavaScript se refiere a la capacidad de acceder a elementos específicos dentro de la estructura del documento HTML utilizando métodos y selectores proporcionados por el DOM. Esto nos permite interactuar y manipular los elementos de una página web de forma programática.

Existen varios métodos y selectores que podemos utilizar para seleccionar elementos del DOM. A continuación, te mostraré algunos ejemplos:

## getElementById

El método `getElementById` permite seleccionar un elemento por su ID, que debe ser único en el documento HTML. Devuelve el primer elemento que coincide con el ID especificado.

```javascript
const element = document.getElementById('myElement');
```

## getElementsByClassName

El método `getElementsByClassName` permite seleccionar elementos por su clase. Devuelve una lista de elementos que tienen la clase especificada.

```javascript
const elements = document.getElementsByClassName('myClass');
```

## getElementsByTagName

El método `getElementsByTagName` permite seleccionar elementos por su etiqueta. Devuelve una lista de elementos que tienen la etiqueta especificada.

```javascript
const elements = document.getElementsByTagName('div');
```

## querySelector

El método `querySelector` permite seleccionar un elemento utilizando un selector CSS. Devuelve el primer elemento que coincide con el selector especificado.

```javascript
const element = document.querySelector('#myElement');
```

## querySelectorAll

El método `querySelectorAll` permite seleccionar elementos utilizando un selector CSS. Devuelve una lista de todos los elementos que coinciden con el selector especificado.

```javascript
const elements = document.querySelectorAll('.myClass');
```

En el siguiente ejemplo, utilizaremos todos los métodos y selectores mencionados anteriormente para seleccionar elementos del DOM.

```html
<!DOCTYPE html>
<html>
<head>
  <title>Selección de elementos del DOM</title>
</head>
<body>
  <h1 id="titulo">Título</h1>
  <p class="parrafo">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.</p>
  <ul>
    <li>Elemento 1</li>
    <li>Elemento 2</li>
    <li>Elemento 3</li>
  </ul>
  <div>
    <p>Texto 1</p>
    <p>Texto 2</p>
    <p>Texto 3</p>
  </div>

  <script>
    // getElementById: selecciona un elemento por su id
    const titulo = document.getElementById('titulo');
    console.log(titulo);

    // getElementsByClassName: selecciona elementos por su clase
    const parrafos = document.getElementsByClassName('parrafo');
    console.log(parrafos);

    // getElementsByTagName: selecciona elementos por su etiqueta
    const elementosLista = document.getElementsByTagName('li');
    console.log(elementosLista);

    // querySelector: selecciona el primer elemento que coincide con un selector CSS
    const texto1 = document.querySelector('div p');
    console.log(texto1);

    // querySelectorAll: selecciona todos los elementos que coinciden con un selector CSS
    const todosLosParrafos = document.querySelectorAll('p');
    console.log(todosLosParrafos);
  </script>
</body>
</html>
```

En este ejemplo, utilizamos diferentes métodos para seleccionar elementos del DOM:

- `getElementById`: Utilizamos `document.getElementById('titulo')` para seleccionar el elemento `<h1>` con el id "titulo". El elemento seleccionado se almacena en la variable `titulo`.

- `getElementsByClassName`: Utilizamos `document.getElementsByClassName('parrafo')` para seleccionar todos los elementos con la clase "parrafo". Los elementos seleccionados se almacenan en la variable `parrafos`.

- `getElementsByTagName`: Utilizamos `document.getElementsByTagName('li')` para seleccionar todos los elementos `<li>`. Los elementos seleccionados se almacenan en la variable `elementosLista`.

- `querySelector`: Utilizamos `document.querySelector('div p')` para seleccionar el primer elemento `<p>` que se encuentra dentro de un elemento `<div>`. El elemento seleccionado se almacena en la variable `texto1`.

- `querySelectorAll`: Utilizamos `document.querySelectorAll('p')` para seleccionar todos los elementos `<p>` en el documento. Los elementos seleccionados se almacenan en la variable `todosLosParrafos`.

En cada caso, utilizamos `console.log` para mostrar los elementos seleccionados en la consola del navegador.

Ten en cuenta que estos métodos de selección de elementos te permiten interactuar y manipular los elementos del DOM de diferentes formas. Puedes acceder a sus propiedades, modificar su contenido, aplicar estilos, agregar o eliminar elementos, y mucho más.

Estos son solo algunos ejemplos de cómo seleccionar elementos del DOM en JavaScript. Además de los métodos mencionados, existen otros métodos y selectores más avanzados que permiten una selección más precisa y flexible.

Recuerda que al seleccionar elementos del DOM, es importante tener en cuenta la estructura del documento HTML y utilizar selectores adecuados para acceder a los elementos deseados. También puedes utilizar las referencias almacenadas en variables para acceder a los elementos seleccionados y manipularlos de manera más eficiente.

# Crear elementos

Para crear elementos en el DOM utilizando JavaScript, podemos utilizar el método `createElement`. Este método nos permite crear un nuevo elemento HTML con la etiqueta especificada y luego podemos agregarlo al DOM utilizando métodos como `appendChild` o `insertBefore`.

A continuación, te mostraré un ejemplo de cómo crear elementos en el DOM:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Creación de elementos en JavaScript</title>
</head>
<body>
  <div id="container"></div>

  <script>
    // Obtener una referencia al contenedor
    const container = document.getElementById('container');

    // Crear un nuevo elemento
    const newElement = document.createElement('p');

    // Asignar contenido al nuevo elemento
    newElement.textContent = 'Este es un nuevo párrafo creado con JavaScript';

    // Agregar el nuevo elemento al contenedor
    container.appendChild(newElement);
  </script>
</body>
</html>
```

En este ejemplo, utilizamos JavaScript dentro de la etiqueta `<script>` para crear un nuevo elemento `p` y agregarlo al DOM. Aquí está el flujo de trabajo:

- Utilizamos `getElementById` para obtener una referencia al elemento del contenedor.
- Creamos un nuevo elemento utilizando `createElement` y especificamos la etiqueta deseada, en este caso, `p`.
- Asignamos contenido al nuevo elemento utilizando la propiedad `textContent`.
- Agregamos el nuevo elemento al contenedor utilizando `appendChild`.

Al ejecutar este código, verás que se agrega un nuevo párrafo al contenedor en la página web.

Recuerda que una vez que has creado un elemento, puedes manipularlo aún más, agregarle atributos, estilos o incluso adjuntar eventos a él antes de agregarlo al DOM. El método `createElement` es muy útil para generar elementos de forma dinámica y personalizada en respuesta a la lógica de tu aplicación.


# Eventos del dom

Los eventos del DOM son acciones o sucesos que ocurren en los elementos del documento HTML y a los cuales se puede responder mediante la ejecución de código JavaScript. Los eventos permiten interactuar con los usuarios y capturar sus acciones, como hacer clic en un elemento, mover el mouse, escribir en un campo de texto, entre otros.

JavaScript proporciona diferentes métodos para adjuntar y manejar eventos en los elementos del DOM. A continuación, te mostraré algunos ejemplos de eventos comunes y cómo trabajar con ellos:

## onchange

El evento `onchange` se desencadena cuando el valor de un elemento cambia y pierde el foco, como en el caso de los campos de entrada de texto o las listas desplegables.

```html
<input type="text" onchange="miFuncion()">
```

En este ejemplo, cuando el usuario cambie el valor del campo de entrada y salga del mismo, se ejecutará la función `miFuncion()`.

## onclick

El evento `onclick` se desencadena cuando se hace clic en un elemento, como un botón o un enlace.

```html
<button onclick="miFuncion()">Haz clic</button>
```

En este ejemplo, cuando el usuario haga clic en el botón, se ejecutará la función `miFuncion()`.

## onmouseover y onmouseout

Los eventos `onmouseover` y `onmouseout` se desencadenan cuando el cursor del mouse se mueve sobre un elemento o sale de él, respectivamente.

```html
<div onmouseover="miFuncion()" onmouseout="miOtraFuncion()"></div>
```

En este ejemplo, cuando el cursor del mouse se mueva sobre el elemento `div`, se ejecutará la función `miFuncion()`, y cuando el cursor del mouse salga del elemento `div`, se ejecutará la función `miOtraFuncion()`.

## onkeydown

El evento `onkeydown` se desencadena cuando se presiona una tecla del teclado mientras un elemento tiene el foco, como un campo de entrada de texto.

```html
<input type="text" onkeydown="miFuncion(event)">
```

En este ejemplo, cuando el usuario presione una tecla mientras el campo de entrada de texto tiene el foco, se ejecutará la función `miFuncion()` y se pasará el evento como argumento.

## Evento click

El evento `click` se desencadena cuando se hace clic en un elemento.

```javascript
const button = document.getElementById('myButton');

button.addEventListener('click', function() {
  // Lógica a ejecutar cuando se hace clic en el botón
});
```

## Evento submit

El evento `submit` se desencadena cuando se envía un formulario.

```javascript
const form = document.getElementById('myForm');

form.addEventListener('submit', function(event) {
  event.preventDefault(); // Evita que el formulario se envíe

  // Lógica a ejecutar cuando se envía el formulario
});
```

## Evento input

El evento `input` se desencadena cuando se realiza un cambio en un campo de entrada, como un campo de texto.

```javascript
const input = document.getElementById('myInput');

input.addEventListener('input', function() {
  // Lógica a ejecutar cuando cambia el valor del campo de entrada
});
```

## Evento mouseover y mouseout

Los eventos `mouseover` y `mouseout` se desencadenan cuando el mouse se mueve sobre un elemento y sale de él, respectivamente.

```javascript
const element = document.getElementById('myElement');

element.addEventListener('mouseover', function() {
  // Lógica a ejecutar cuando el mouse se mueve sobre el elemento
});

element.addEventListener('mouseout', function() {
  // Lógica a ejecutar cuando el mouse sale del elemento
});
```

## Recomendación

Es importante tener en cuenta que los atributos de eventos en línea, como `onchange`, `onclick`, etc., se utilizan comúnmente para casos sencillos. Sin embargo, en situaciones más complejas, se recomienda utilizar el método `addEventListener` para adjuntar eventos de manera más flexible y separar el código JavaScript del HTML.

```html
<button id="myButton">Haz clic</button>

<script>
  const button = document.getElementById("myButton");

  button.addEventListener("click", function() {
    // Lógica del evento onclick utilizando addEventListener
    miFuncion();
  });
</script>
```

En este caso, se utiliza `addEventListener` para adjuntar el evento `click` al botón y ejecutar la función `miFuncion()` cuando se hace clic en el botón.

En el siguiente ejemplo utilizaremos algunos de los eventos del DOM que hemos visto hasta ahora:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Eventos del DOM</title>
</head>
<body>
  <h1>Eventos del DOM</h1>
  <input type="text" id="inputText" onchange="mostrarMensaje()">
  <button onclick="cambiarColor()">Haz clic</button>
  <p onmouseover="mostrarMensaje('¡Pasaste el mouse por encima!')" onmouseout="mostrarMensaje('¡Mouse fuera!')">Pasa el mouse aquí</p>
  <input type="text" onkeydown="mostrarTecla(event)">

  <script>
    function mostrarMensaje(mensaje) {
      if (mensaje) {
        console.log(mensaje);
      } else {
        console.log("El valor del input ha cambiado");
      }
    }

    function cambiarColor() {
      document.body.style.backgroundColor = "red";
    }

    function mostrarTecla(event) {
      console.log("Tecla presionada: " + event.key);
    }
  </script>
</body>
</html>
```

En este ejemplo, se utilizan diferentes eventos del DOM:

- `onchange`: Se utiliza en un campo de entrada de texto (`<input>`) con el atributo `onchange="mostrarMensaje()"`. Cuando el valor del campo de entrada cambia y se pierde el enfoque del campo, se ejecuta la función `mostrarMensaje()`. En este caso, la función muestra un mensaje en la consola indicando que el valor del input ha cambiado.

- `onclick`: Se utiliza en un botón (`<button>`) con el atributo `onclick="cambiarColor()"`. Cuando se hace clic en el botón, se ejecuta la función `cambiarColor()`. En este caso, la función cambia el color de fondo del `<body>` a rojo.

- `onmouseover` y `onmouseout`: Se utilizan en un párrafo (`<p>`) con los atributos `onmouseover="mostrarMensaje('¡Pasaste el mouse por encima!')"` y `onmouseout="mostrarMensaje('¡Mouse fuera!')"`. Cuando el cursor del mouse se mueve sobre el párrafo, se ejecuta la función `mostrarMensaje()` con el mensaje correspondiente. Cuando el cursor se mueve fuera del párrafo, también se ejecuta la función `mostrarMensaje()` con el mensaje correspondiente.

- `onkeydown`: Se utiliza en un campo de entrada de texto (`<input>`) con el atributo `onkeydown="mostrarTecla(event)"`. Cuando se presiona una tecla mientras el campo de entrada tiene el foco, se ejecuta la función `mostrarTecla()` y se pasa como argumento el evento (`event`) que contiene información sobre la tecla presionada. En este caso, la función muestra en la consola la tecla presionada.

Cada evento está asociado a una función que se ejecuta cuando ocurre ese evento en el elemento correspondiente. Puedes personalizar las funciones y los mensajes según tus necesidades y agregar más lógica para interactuar con los elementos del DOM en respuesta a los eventos.

Estos son solo algunos ejemplos de eventos comunes que se pueden utilizar en JavaScript. Existen muchos más eventos disponibles, como `keydown`, `keyup`, `change`, `focus`, `blur`, entre otros. Puedes consultar la documentación oficial de eventos en JavaScript para obtener más información sobre los diferentes tipos de eventos y cómo utilizarlos.

Recuerda que los eventos son una parte fundamental de la interacción con los usuarios en una página web, y mediante su uso adecuado, puedes capturar y responder a las acciones del usuario para crear una experiencia interactiva y dinámica.


# Agregar eventos a elementos en JavaScript

Para agregar eventos a los elementos del DOM en JavaScript, puedes utilizar el método `addEventListener`. Este método te permite adjuntar un controlador de eventos a un elemento específico y especificar qué código se ejecutará cuando ocurra ese evento en particular.

A continuación, te muestro un ejemplo de cómo agregar eventos a los elementos del DOM utilizando `addEventListener`:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Agregar eventos a elementos en JavaScript</title>
</head>
<body>
  <button id="myButton">Haz clic aquí</button>

  <script>
    // Obtener una referencia al elemento del botón
    const button = document.getElementById('myButton');

    // Agregar un controlador de eventos al botón
    button.addEventListener('click', function() {
      // Lógica a ejecutar cuando se hace clic en el botón
      console.log('Se hizo clic en el botón');
    });
  </script>
</body>
</html>
```

En este ejemplo, utilizamos JavaScript dentro de la etiqueta `<script>` para agregar un evento `click` al botón. Aquí está el flujo de trabajo:

1. Utilizamos `getElementById` para obtener una referencia al elemento del botón.
2. Utilizamos `addEventListener` para adjuntar un controlador de eventos al botón y especificamos el tipo de evento (`click`) y la función que se ejecutará cuando ocurra el evento.
3. Dentro de la función del controlador de eventos, escribimos el código que deseamos que se ejecute cuando el evento ocurra. En este caso, simplemente mostramos un mensaje en la consola.

Al ejecutar este código y hacer clic en el botón, verás que se muestra el mensaje "Se hizo clic en el botón" en la consola.

Puedes agregar múltiples eventos a un elemento, simplemente llamando a `addEventListener` con diferentes tipos de eventos y funciones de controladores.

Recuerda que el método `addEventListener` también te permite adjuntar eventos a otros elementos del DOM, como campos de entrada, enlaces, elementos de lista, etc. Simplemente necesitas obtener una referencia al elemento deseado y llamar a `addEventListener` para agregar el evento correspondiente.

Además, puedes utilizar funciones anónimas como en el ejemplo anterior o también puedes utilizar funciones definidas por separado para tus controladores de eventos, lo que puede facilitar el mantenimiento y la reutilización de código.


# Manipulación de atributos

La manipulación de atributos en JavaScript nos permite acceder y modificar los atributos de los elementos del DOM. Podemos agregar, modificar y eliminar atributos utilizando métodos y propiedades proporcionados por el DOM.

A continuación, te muestro algunos ejemplos de cómo manipular atributos en JavaScript:

## Acceder a un atributo

Para acceder al valor de un atributo de un elemento, podemos utilizar la propiedad `getAttribute` del elemento.

```html
<img id="myImage" src="imagen.jpg" alt="Imagen de ejemplo">
```

```javascript
const image = document.getElementById('myImage');
const src = image.getAttribute('src');
const alt = image.getAttribute('alt');

console.log(src); // Resultado: imagen.jpg
console.log(alt); // Resultado: Imagen de ejemplo
```

En este ejemplo, utilizamos `getAttribute` para obtener los valores de los atributos `src` y `alt` de la imagen.

## Modificar un atributo

Para modificar el valor de un atributo de un elemento, podemos utilizar el método `setAttribute` del elemento.

```html
<img id="myImage" src="imagen.jpg" alt="Imagen de ejemplo">
```

```javascript
const image = document.getElementById('myImage');
image.setAttribute('src', 'nueva-imagen.jpg');
image.setAttribute('alt', 'Nueva imagen de ejemplo');
```

En este ejemplo, utilizamos `setAttribute` para cambiar los valores de los atributos `src` y `alt` de la imagen.

## Eliminar un atributo

Para eliminar un atributo de un elemento, podemos utilizar el método `removeAttribute` del elemento.

```html
<img id="myImage" src="imagen.jpg" alt="Imagen de ejemplo">
```

```javascript
const image = document.getElementById('myImage');
image.removeAttribute('alt');
```

En este ejemplo, utilizamos `removeAttribute` para eliminar el atributo `alt` de la imagen.

En el siguiente ejemplo utilizaremos los métodos mencionados anteriormente para manipular atributos en JavaScript.

```html
<!DOCTYPE html>
<html>
<head>
  <title>Manipulación de atributos del DOM</title>
</head>
<body>
  <h1 id="titulo">Título</h1>
  <img src="imagen.jpg" alt="Imagen" id="imagen" width="200" height="200">
  <button onclick="mostrarAtributo()">Mostrar Atributo</button>
  <button onclick="cambiarAtributo()">Cambiar Atributo</button>
  <button onclick="verificarAtributo()">Verificar Atributo</button>
  <button onclick="eliminarAtributo()">Eliminar Atributo</button>

  <script>
    function mostrarAtributo() {
      const imagen = document.getElementById('imagen');
      const src = imagen.getAttribute('src');
      console.log('Atributo src:', src);
    }

    function cambiarAtributo() {
      const imagen = document.getElementById('imagen');
      imagen.setAttribute('src', 'nueva-imagen.jpg');
      imagen.setAttribute('alt', 'Nueva Imagen');
      console.log('Atributos cambiados');
    }

    function verificarAtributo() {
      const imagen = document.getElementById('imagen');
      const tieneAlt = imagen.hasAttribute('alt');
      console.log('¿La imagen tiene el atributo alt?', tieneAlt);
    }

    function eliminarAtributo() {
      const imagen = document.getElementById('imagen');
      imagen.removeAttribute('width');
      imagen.removeAttribute('height');
      console.log('Atributos eliminados');
    }
  </script>
</body>
</html>
```

En este ejemplo, utilizamos diferentes métodos para manipular atributos de elementos del DOM:

- `getAttribute`: En la función `mostrarAtributo()`, utilizamos `getAttribute('src')` para obtener el valor del atributo `src` de la imagen. Luego, mostramos el valor del atributo en la consola.

- `setAttribute`: En la función `cambiarAtributo()`, utilizamos `setAttribute('src', 'nueva-imagen.jpg')` para cambiar el valor del atributo `src` de la imagen por "nueva-imagen.jpg". También utilizamos `setAttribute('alt', 'Nueva Imagen')` para cambiar el valor del atributo `alt` de la imagen. Luego, mostramos un mensaje en la consola indicando que los atributos han sido cambiados.

- `hasAttribute`: En la función `verificarAtributo()`, utilizamos `hasAttribute('alt')` para verificar si la imagen tiene el atributo `alt`. Mostramos un mensaje en la consola indicando si la imagen tiene o no el atributo.

- `removeAttribute`: En la función `eliminarAtributo()`, utilizamos `removeAttribute('width')` y `removeAttribute('height')` para eliminar los atributos `width` y `height` de la imagen. Mostramos un mensaje en la consola indicando que los atributos han sido eliminados.

Puedes utilizar estos métodos para acceder, modificar, verificar y eliminar atributos de elementos del DOM según tus necesidades. Recuerda que los nombres de los atributos deben coincidir exactamente con los nombres utilizados en el código HTML.

Recuerda que los atributos también pueden tener eventos asociados. Si deseas agregar o eliminar eventos específicos, puedes utilizar los métodos `addEventListener` y `removeEventListener`, respectivamente.

La manipulación de atributos en JavaScript es útil cuando necesitas cambiar dinámicamente los valores de los atributos de los elementos del DOM. Esto puede ser útil para actualizar imágenes, cambiar textos alternativos, actualizar enlaces, etc.

Es importante tener en cuenta que algunos atributos, como `id` y `class`, también tienen propiedades correspondientes en los elementos del DOM. Puedes acceder y modificar estas propiedades directamente en lugar de utilizar los métodos `getAttribute` y `setAttribute`.

Recuerda que al manipular atributos, debes tener en cuenta la estructura y la semántica adecuada de tu documento HTML y asegurarte de seguir las buenas prácticas para mantener un código limpio y mantenible.



# Ejercicios

### Ejercicio 1 - Crear elementos
Crea una función que reciba un array de strings como parámetro y utilice la función `map` y la sintaxis de string templates para devolver un nuevo array donde cada elemento corresponda a la siguiente cadena: "El elemento `n` es `nombre`", donde `n` es la posición del elemento en el array y `nombre` es el valor del elemento.

### Ejercicio 2 - Botones con acciones
Agregar 3 botones en el HTML que permitan hacer lo siguiente:

- El primero agrega un encabezado (H1) en el documento.
- En ambos casos tanto al h1 como a la etiqueta p agrega un id único.
- El segundo agrega un párrafo (P) en el documento.
- El tercero ejecutará un alert con un mensaje.

### Ejercicio 3 - Manipulación de div con botones
Agregar un div de tamaño 300 x 300 px y 3 botones al HTML y cada botón tendrá un evento que realizará lo siguiente:

- El primero cambiará el fondo del div a color rojo.
- El segundo le cambiará el tamaño al div a 500 x 500 px.
- El tercero le asignará un borde al div



