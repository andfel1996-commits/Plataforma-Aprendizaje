# Pack Docente — Funciones en JavaScript (Parte I)

Este pack está pensado para una clase inicial de **Funciones en JavaScript** (AE3.4).
Incluye un **guion** (paso a paso), un archivo de **demo** para el docente y **3 ejercicios** con versión alumno/solución.

---

## 1) Estructura del proyecto

```
02-funciones-js-parte1/
├─ index.html
├─ README.md
├─ assets/
│  ├─ css/
│  │  └─ styles.css
│  └─ js/
│     ├─ app.demo.js
│     └─ ejercicios/
│        ├─ README.md
│        ├─ 01-contador-visitas.alumno.js
│        ├─ 01-contador-visitas.solucion.js
│        ├─ 02-simulador-temperatura.alumno.js
│        ├─ 02-simulador-temperatura.solucion.js
│        ├─ 03-calculador-edad.alumno.js
│        └─ 03-calculador-edad.solucion.js
└─ .gitignore
```

---

## 2) Cómo ejecutar

### Opción A (más simple)
1. Abre `index.html` con doble clic.
2. Abre la consola del navegador:
   - Chrome/Edge: `F12` o `Ctrl/Cmd + Shift + I` → **Console**
3. Verás la salida de `assets/js/app.demo.js`.

### Opción B (cargar ejercicios)
1. Abre `index.html`.
2. Comenta el script de `app.demo.js`.
3. Descomenta el script del ejercicio que quieras.

Ejemplo:
```html
<!-- <script src="assets/js/app.demo.js"></script> -->
<script src="assets/js/ejercicios/01-contador-visitas.alumno.js"></script>
```

---

## 3) Guion paso a paso para la clase (modo docente)

### 0) Preparación (2 min)
- Abrir `index.html` y la consola.
- Explicar que hoy trabajaremos con **funciones** para **reutilizar código**.

### 1) ¿Qué es una función? (8–10 min)
- Función = bloque de código reutilizable.
- Analogía: receta (entrada → proceso → salida).

### 2) Declarar vs invocar (5 min)
- Declarar = definir la receta.
- Invocar = ejecutar con `()`.

### 3) Tipos de funciones (15–20 min)
- Declarada (tradicional) + hoisting.
- Anónima (guardada en variable).
- Arrow function (sintaxis corta).

### 4) Parámetros vs argumentos (8 min)
- Parámetro = variable en la función.
- Argumento = valor real al llamar.

### 5) console.log vs return (10 min)
- log muestra; return devuelve para reutilizar.

### 6) Desafío (5 min)
- ¿Qué pasa si hago `push()` dentro de una función?
- Idea clave: arrays se pasan por referencia (se modifica el original).

### 7) Ejercitación (20–30 min)
- Ejercicio 1: Contador de visitas.
- Ejercicio 2: Simulador de temperatura.
- Ejercicio 3: Calculador de edad.

---

## 4) Tips didácticos rápidos
- Antes de ejecutar un bloque, pregunta: **“¿Qué creen que imprimirá?”**
- Si sale `undefined`, vuelve a preguntar: **“¿Dónde faltó el return?”**
- Si no se ejecuta una función: **“¿Le pusiste paréntesis?”**

---

## 5) Material extra
- Ejercicios y guía: `assets/js/ejercicios/README.md`

¡Listo para usar en clase! ✅
