import process from "node:process";
console.log("======Información del entorno=====")
console.log("Node version:", process.version);
console.log("Plataforma:", process.platform);
console.log("Arquitectura:", process.arch);
console.log("Directorio actual:", process.cwd());
