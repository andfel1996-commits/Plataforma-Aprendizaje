/* ==========================================================
   EJERCICIO 03 (ALUMNO) — TOTAL DE COMPRA + CALLBACK
   ----------------------------------------------------------
   CONTEXTO (Historia):
   Eres parte de un equipo que está creando una mini app de compras.
   La app debe:
   1) Calcular el total de una compra (sumando precios)
   2) Permitir aplicar “operaciones” al total (por ejemplo: descuento, IVA)
      sin reescribir el código cada vez.

   Para lograrlo usarás:
   ✅ Operador Rest (...) para recibir muchos precios
   ✅ reduce() para sumar un arreglo de números
   ✅ Callbacks (funciones como parámetros) para aplicar operaciones
   ----------------------------------------------------------
   OBJETIVO DE APRENDIZAJE:
   - Reutilizar código con funciones
   - Pasar funciones como parámetros (callback)
   - Separar responsabilidades:
     * una función calcula el total
     * otra función aplica operaciones al total
   ----------------------------------------------------------
   CONSIGNA:
   Debes implementar estas funciones:

   1) calcularTotalCompra(nombreCliente, ...precios)
      - nombreCliente: obligatorio
      - precios: lista de números (pueden ser 1 o muchos)
      - Debe validar:
          a) nombreCliente no puede venir vacío/undefined
          b) debe existir al menos 1 precio
      - Debe sumar los precios con reduce() y retornar el total

   2) aplicarOperacion(total, callback)
      - Recibe un total (número) y un callback (función)
      - Debe validar:
          a) callback debe ser una función (typeof callback === "function")
      - Retorna el resultado de ejecutar el callback:
          return callback(total)

   3) callbacks (funciones que se pasan como parámetro)
      - aplicarDescuento10(total)
          Retorna el total con 10% de descuento
          Fórmula: total - (total * 0.10)
      - aplicarIVA19(total)
          Retorna el total con 19% de IVA
          Fórmula: total + (total * 0.19)

   ----------------------------------------------------------
   FORMA DE PRUEBA (cadena de funciones):
   1) total = calcularTotalCompra("Ana", 1000, 2500, 900)
   2) totalConDescuento = aplicarOperacion(total, aplicarDescuento10)
   3) totalFinal = aplicarOperacion(totalConDescuento, aplicarIVA19)

   Resultado esperado (aprox):
   - total = 4400
   - totalConDescuento = 3960
   - totalFinal = 4712.4

   TIP:
   - Si una función no tiene return, devuelve undefined.
   - Si sumas con undefined, puedes obtener NaN.
   ========================================================== */


// TODO 1) calcularTotalCompra(nombreCliente, ...precios)
function calcularTotalCompra(nombreCliente, ...precios) {
  // PASO 1) validar nombreCliente
  // PASO 2) validar precios (que exista al menos 1)
  // PASO 3) total = precios.reduce(..., 0)
  // PASO 4) return total
}

// TODO 2) aplicarOperacion(total, callback)
function aplicarOperacion(total, callback) {
  // PASO 1) validar callback (typeof callback === "function")
  // PASO 2) return callback(total)
}

// TODO 3) callbacks
function aplicarDescuento10(total) {
  // return total - (total * 0.10);
}

function aplicarIVA19(total) {
  // return total + (total * 0.19);
}

// Pruebas (descomenta)
// const total = calcularTotalCompra("Ana", 1000, 2500, 900);
// const totalConDescuento = aplicarOperacion(total, aplicarDescuento10);
// const totalFinal = aplicarOperacion(totalConDescuento, aplicarIVA19);
// console.log(total, totalConDescuento, totalFinal);
