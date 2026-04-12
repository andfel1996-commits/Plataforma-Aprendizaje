/**
 * Mastering Node Processes (Express) - app.js
 * ------------------------------------------------------------
 * Narrativa del ejercicio:
 * 1) Corremos en FOREGROUND: vemos PID + probamos Ctrl+C (SIGINT) con cierre limpio.
 * 2) Corremos en BACKGROUND con "&": usamos jobs/fg/kill para entender control manual.
 * 3) Subimos el nivel con PM2: el proceso ya no depende de la terminal.
 *
 * Puntos clave:
 * - Ctrl+C en foreground = el shell envía SIGINT al proceso.
 * - En background, Ctrl+C ya NO está "conectado" a ese proceso (depende del shell).
 * - PM2 gestiona el proceso como servicio: stop/restart/logs.
 */

import express from "express";
import 'dotenv/config';
import chalk from "chalk";
// ------------------------------------------------------------
// Config básica
// ------------------------------------------------------------
const app = express();
const HOST = "127.0.0.1";
const PORT = Number(process.env.PORT || 3000);


function starServer(port){

    const server = app.listen(port, HOST, () => {
      
      log.info(chalk.yellowBright(`Servidor Express escuchando en http://${HOST}:${port}`));
      log.info(chalk.yellowBright(`PID del proceso Node: ${process.pid}`));
      log.info(chalk.yellowBright(`Prueba rápida: curl http://${HOST}:${port}/health`));


    });

    server.on("error", ( err )=>{
        if(err.code === "EADDRINUSE"){
            console.warn(chalk.bgRed.bold(`Puerto ${port} ocupado. Probando ${port+1}...`))
            // Vamos a cerrar este server "fallido" por orden (Por si alcanzo a levantar)
            server.close(()=> starServer( port + 1 ))

            // Si el server.close no aplica, igual continuamos con el por defecto
            // if(!server.close()) starServer(port + 1)
        } else{
          console.error("Error inesperado al levantar el servidor", err)
          process.exit(1);
        }
    });
  
    return server
}

const server = starServer(PORT);

// ------------------------------------------------------------
// Helpers de logs (evidencia clara)
// ------------------------------------------------------------
function ts() {
  return new Date().toISOString().replace("T", " ").replace(/\.\d+Z$/, "Z");
}
const log = {
  info: (m) => console.log(`[${ts()}] [INFO] ${m}`),
  warn: (m) => console.warn(`[${ts()}] [WARN] ${m}`),
  error: (m, err) => {
    console.error(`[${ts()}] [ERROR] ${m}`);
    if (err) console.error(err);
  },
};

// ------------------------------------------------------------
// Estado del proceso (para demostrar que sigue vivo)
// ------------------------------------------------------------
const startedAt = Date.now();

// Heartbeat (muestra vida del proceso cada 3s)
const heartbeat = setInterval(() => {
  const up = Math.round((Date.now() - startedAt) / 1000);
  log.info(chalk.blue(`Heartbeat: proceso vivo | pid=${process.pid} | uptime=${up}s`));
}, 5000);

// Nota didáctica: unref permite que el proceso salga si TODO lo demás ya terminó.
// (No es obligatorio, pero apoya el concepto de "shutdown" limpio.)
heartbeat.unref();

// ------------------------------------------------------------
// Middlewares mínimos
// ------------------------------------------------------------
app.use(express.json());

// ------------------------------------------------------------
// Rutas
// ------------------------------------------------------------

/**
 * GET /health
 * - Endpoint de evidencia: confirma que el server responde y muestra PID + uptime.
 */
app.get("/health", (req, res) => {
  res.json({
    ok: true,
    pid: process.pid,
    uptimeSeconds: Math.round((Date.now() - startedAt) / 1000),
    now: new Date().toISOString(),
  });
});

/**
 * GET /
 * - Respuesta simple para que el alumno vea algo en el navegador.
 */
app.get("/", (req, res) => {
  res.type("text/plain; charset=utf-8").send(
    [
      "Mastering Node Processes (Express) - OK",
      `pid=${process.pid}`,
      `try: http://${HOST}:${PORT}/health`,
      "",
      "Tip: presiona Ctrl+C en foreground para disparar SIGINT.",
    ].join("\n")
  );
});



// Guardamos sockets para poder cerrar conexiones colgadas en un shutdown
const sockets = new Set();
server.on("connection", (socket) => {
  sockets.add(socket);
  socket.on("close", () => sockets.delete(socket));
});

// ------------------------------------------------------------
// Shutdown limpio: SIGINT / SIGTERM
// ------------------------------------------------------------
let isShuttingDown = false;

function gracefulShutdown(signal) {
  if (isShuttingDown) return;
  isShuttingDown = true;

  console.log("");
  log.warn(chalk.bold.yellowBright(`Señal recibida: ${signal}. Iniciando cierre limpio...`));

  // 1) detener heartbeat
  clearInterval(heartbeat);

  // 2) dejar de aceptar nuevas conexiones y cerrar el servidor


  server.close((err) => {
    if (err) {
      log.error(chalk.red("Error al cerrar el servidor HTTP.", err));
      process.exit(1);
    }

    log.info(chalk.cyan("Servidor HTTP cerrado correctamente. Saliendo del proceso..."));
    process.exit(0);
  });

  // 3) si quedan sockets abiertos, forzamos cierre después de unos segundos
  setTimeout(() => {
    if (sockets.size > 0) {
      log.warn(`Aún hay ${sockets.size} socket(s) activos. Forzando cierre...`);
      for (const s of sockets) s.destroy();
    }
  }, 4000).unref();

  // 4) último recurso: si algo quedó colgado, salimos con error
  setTimeout(() => {
    log.warn("Timeout de shutdown alcanzado. Forzando salida del proceso (exit 1).");
    process.exit(1);
  }, 7000).unref();
}

// Ctrl+C (foreground) -> SIGINT
process.on("SIGINT", () => gracefulShutdown("SIGINT"));

// Orquestadores (PM2, Docker, systemd) suelen enviar SIGTERM en stop
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));

// Evidencia extra en caso de errores no manejados (didáctico)
process.on("uncaughtException", (err) => {
  log.error("uncaughtException. Cerrando el proceso para evitar estado inconsistente.", err);
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  log.error("unhandledRejection. Cerrando el proceso para evitar estado inconsistente.", reason);
  process.exit(1);
});


