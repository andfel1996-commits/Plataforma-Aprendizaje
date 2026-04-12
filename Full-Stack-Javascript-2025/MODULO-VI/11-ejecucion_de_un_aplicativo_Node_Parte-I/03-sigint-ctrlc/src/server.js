/**
 * src/server.js
 * ============================================================
 * Express + CIERRE LIMPIO (SIGINT/SIGTERM) — ULTRA COMENTADO
 * ============================================================
 *
 * OBJETIVO DIDÁCTICO:
 * - Montar un server Express
 * - Simular DB connect/disconnect
 * - Cerrar “bien” el proceso cuando:
 *   - presionamos Ctrl + C (SIGINT)
 *   - PM2 detiene el proceso (SIGTERM)
 *
 * CONCEPTO CLAVE PARA EXPLICAR A ALUMNOS:
 * - Express (app) NO es el servidor HTTP.
 * - Express es “la app” (rutas / middlewares).
 * - El SERVIDOR real lo crea app.listen(...) y lo devuelve.
 * - Por eso, para cierre limpio, necesitamos:
 *     const server = app.listen(...)
 *   y luego:
 *     server.close(...)
 */

import express from "express";
import { connect, disconnect, isConnected } from "./db.js";

// ------------------------------------------------------------
// CONFIGURACIÓN
// ------------------------------------------------------------

// Puerto (en producción suele venir de process.env.PORT)
const PORT = 3000;

// Timeout de seguridad para shutdown.
// Si el cierre se “cuelga” (algo no responde), forzamos salida.
const SHUTDOWN_TIMEOUT = 10_000;

// ------------------------------------------------------------
// 1) Crear la app de Express
// ------------------------------------------------------------

const app = express();

/**
 * Ruta de prueba:
 * - Responde un JSON para ver:
 *   - si la DB está conectada
 *   - pid del proceso
 *   - uptime
 */
app.get("/", (req, res) => {
  // res.json(...) hace:
  // - JSON.stringify
  // - setear Content-Type: application/json
  // - enviar respuesta
  res.json({
    status: "ok",
    db: isConnected() ? "conectada" : "desconectada",
    pid: process.pid,
    uptime: `${Math.floor(process.uptime())}s`,
  });
});

// ------------------------------------------------------------
// 2) Referencia al server HTTP real
// ------------------------------------------------------------

/**
 * IMPORTANTE:
 * - app.listen(...) crea un servidor HTTP real por dentro
 * - y te devuelve un objeto "server"
 * - ese server tiene: server.close()
 *
 * Por eso declaramos server fuera, para usarlo en shutdown().
 */
let server;

// ------------------------------------------------------------
// 3) Evitar doble shutdown
// ------------------------------------------------------------

/**
 * A veces (sobre todo en PM2 o entornos raros),
 * pueden llegar señales más de una vez.
 * Si ejecutas shutdown 2 veces:
 * - podrías intentar cerrar server 2 veces
 * - o desconectar DB 2 veces
 *
 * Esta bandera asegura que shutdown se ejecute una sola vez.
 */
let shuttingDown = false;

// ------------------------------------------------------------
// 4) Helper: convertir server.close(callback) a Promise
// ------------------------------------------------------------

/**
 * server.close(...) es “callback based”.
 * Para usarlo con async/await, lo convertimos a Promise.
 *
 * - resolve() cuando cerró bien
 * - reject(err) si hubo error
 */
function closeServer() {
  return new Promise((resolve, reject) => {
    server.close((err) => {
      if (err) return reject(err);
      resolve();
    });
  });
}

// ------------------------------------------------------------
// 5) Función principal de cierre limpio
// ------------------------------------------------------------

/**
 * shutdown(signal)
 * ------------------------------------------------------------
 * Esta función concentra TODA la lógica de apagado.
 * Se llama desde SIGINT y SIGTERM.
 *
 * ORDEN CORRECTO (muy importante de enseñar):
 * A) Cerrar servidor HTTP primero (server.close)
 *    - deja de aceptar conexiones nuevas
 *    - espera a que terminen conexiones activas
 *
 * B) Cerrar DB después (disconnect)
 *    - así no “cortas” la DB mientras aún hay requests activas
 *
 * C) Salir del proceso (process.exit)
 */
async function shutdown(signal) {
  // 5.1) Evitar doble ejecución
  if (shuttingDown) return;
  shuttingDown = true;

  console.log(`\n[${signal}] Señal recibida. Iniciando cierre limpio...`);

  // 5.2) Timeout de seguridad
  // Si el cierre tarda más de X ms, forzamos salida con error.
  const timer = setTimeout(() => {
    console.error("[shutdown] Timeout superado. Forzando process.exit(1).");
    process.exit(1);
  }, SHUTDOWN_TIMEOUT);

  /**
   * timer.unref()
   * ----------------------------------------------------------
   * Un timeout puede mantener el proceso “vivo”.
   * - Si cerramos todo rápido, igual quedaría el timer pendiente.
   * - unref() permite que Node termine si ya no queda nada más.
   */
  timer.unref();

  try {
    // 5.3) Cerrar servidor HTTP
    // Importante: si server aún no existe (arranque falló),
    // closeServer daría error. Por eso validamos.
    if (server) {
      await closeServer();
      console.log("[shutdown] Servidor HTTP cerrado.");
    } else {
      console.log("[shutdown] server no estaba iniciado (arranque falló).");
    }

    // 5.4) Cerrar DB
    await disconnect();
    console.log("[shutdown] DB desconectada.");

    // 5.5) Salida limpia
    console.log("[shutdown] Cierre limpio completado.\n");

    /**
     * process.exit(0)
     * ----------------------------------------------------------
     * 0 = salida exitosa
     *
     * Nota:
     * - Podrías NO llamar process.exit y dejar que Node termine solo,
     *   pero para enseñanza suele ser más claro hacerlo explícito.
     */
    process.exit(0);
  } catch (err) {
    console.error("[shutdown] Error durante el cierre:", err);
    process.exit(1);
  }
}

// ------------------------------------------------------------
// 6) Registrar señales del sistema
// ------------------------------------------------------------

/**
 * SIGINT:
 * - Ctrl + C en terminal (desarrollo)
 *
 * SIGTERM:
 * - típico cuando un gestor (PM2/Docker/OS) pide terminar
 * - pm2 stop / pm2 restart suelen enviar SIGTERM
 */
process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

// ------------------------------------------------------------
// 7) Arranque ordenado (connect DB -> listen)
// ------------------------------------------------------------

/**
 * Patrón recomendado:
 * - Primero conectar DB
 * - Luego levantar el servidor HTTP
 *
 * Si la DB falla:
 * - no tiene sentido abrir el server y responder mal
 * - salimos con error
 */
(async () => {
  try {
    console.log("[startup] Conectando DB...");
    await connect();
    console.log("[startup] DB conectada.");

    // app.listen crea el servidor real y lo devuelve
    server = app.listen(PORT, () => {
      console.log(`\n[startup] Express corriendo en http://localhost:${PORT}`);
      console.log(`[startup] PID: ${process.pid}`);
      console.log("[startup] Ctrl + C para detener.\n");
    });
  } catch (err) {
    console.error("[startup] Error en el arranque:", err);

    // Si falló el arranque, salimos con error.
    // No dejamos el proceso “colgado”.
    process.exit(1);
  }
})();