// server.js

console.log('Aplicación Node.js iniciada. Presiona Ctrl+C para detener.');

let contador = 0;

// Función que simula la tarea repetitiva
const intervalo = setInterval(() => {
  contador++;
  console.log(`Mensaje repetido número ${contador} - ${new Date().toLocaleTimeString()}`);
}, 3000);

// Función para limpiar y salir
function shutdown(signal) {
  console.log(`\nSeñal ${signal} recibida. Deteniendo la aplicación...`);
  clearInterval(intervalo);
  // Aquí puedes agregar limpieza adicional si es necesario
  process.exit(0);
}

// Captura de señales para detener correctamente
process.on('SIGINT', () => shutdown('SIGINT'));   // Ctrl + C
process.on('SIGTERM', () => shutdown('SIGTERM')); // kill

// Para evitar que el proceso termine por error no capturado
process.on('uncaughtException', (err) => {
  console.error('Error no capturado:', err);
  shutdown('uncaughtException');
});
