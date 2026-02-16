/**
 * 05-async.js
 * -----------
 * Objetivo: entender asincronía moderna en JavaScript:
 * - Promesas (Promise)
 * - async/await
 * - manejo de errores con try/catch
 *
 * Contexto: simulamos una API que trae "productos" con demora.
 * (No dependemos de Internet; usamos setTimeout).
 */

import { logTitle, logLine, logObject } from "../utils/logger.js";

/**
 * Simula una API:
 * - retorna una Promise
 * - resuelve con datos tras una demora (setTimeout)
 * - a veces falla (para enseñar manejo de errores)
 *
 * @param {Object} opciones
 * @param {number} opciones.milisegundosDemora - Cuánto tiempo se demora en "responder" la API.
 * @param {number} opciones.probabilidadFallo - Probabilidad de fallo entre 0 y 1.
 */
function simularApiObtenerProductos(
  { milisegundosDemora = 800, probabilidadFallo = 0.25 } = {}
) {
  return new Promise((resolverPromesa, rechazarPromesa) => {
    setTimeout(() => {
      // Determinamos si "fallará" en base a la probabilidad indicada
      const debeFallar = Math.random() < probabilidadFallo;

      if (debeFallar) {
        rechazarPromesa(
          new Error("Error 503: Servicio temporalmente no disponible (simulado)")
        );
        return; // importante: cortamos la ejecución para no resolver después
      }

      // Si no falla, "respondemos" con datos simulados
      resolverPromesa([
        { idProducto: 1, nombreProducto: "Mouse", precioProducto: 12990 },
        { idProducto: 2, nombreProducto: "Teclado", precioProducto: 24990 },
        { idProducto: 3, nombreProducto: "Monitor", precioProducto: 129990 },
      ]);
    }, milisegundosDemora);
  });
}

export async function run05_PromesasAsyncAwait() {
  logTitle("5) Promesas y Async/Await");

  /**
   * (A) Promesas con .then()/.catch()
   * - útil para entender el modelo base
   */
  logLine("A) Promesa con then/catch (mirar orden de ejecución):");

  logLine("1) Antes de llamar a simularApiObtenerProductos()");
  simularApiObtenerProductos({ milisegundosDemora: 600, probabilidadFallo: 0.0 })
    .then((productosObtenidos) => {
      logLine("3) THEN: llegaron los datos ✅");
      logObject("Productos", productosObtenidos);

      // Sumamos precios usando reduce con variables explícitas
      const totalPrecios = productosObtenidos.reduce(
        (acumuladorSuma, productoActual) =>
          acumuladorSuma + productoActual.precioProducto,
        0
      );

      logLine(`Total precios: ${totalPrecios}`);
    })
    .catch((errorPromesa) => {
      logLine("3) CATCH: algo falló ❌");
      logLine(errorPromesa.message);
    })
    .finally(() => {
      logLine("4) FINALLY: esto corre siempre (haya error o no).");
    });

  logLine(
    "2) Después de llamar a simularApiObtenerProductos() (esto sale antes que el THEN)"
  );
  logLine("");

  /**
   * (B) async/await
   * - Es “azúcar sintáctico” sobre Promises
   * - Hace que el código se lea más “lineal”
   */
  logLine("B) async/await con try/catch:");

  try {
    logLine("1) Esperando productos (await)...");
    const productosObtenidos = await simularApiObtenerProductos({
      milisegundosDemora: 900,
      probabilidadFallo: 0.35,
    });

    logLine("2) Llegaron productos ✅");
    logObject("Productos", productosObtenidos);

    // Transformación con map (nombres explícitos)
    const nombresProductos = productosObtenidos.map(
      (productoActual) => productoActual.nombreProducto
    );
    logObject("Nombres", nombresProductos);
  } catch (errorAsync) {
    logLine("2) Ocurrió un error ❌");
    logLine(errorAsync.message);
  }

  logLine("");
  logLine("Idea clave: async/await simplifica la lectura y el control de errores.");
}
