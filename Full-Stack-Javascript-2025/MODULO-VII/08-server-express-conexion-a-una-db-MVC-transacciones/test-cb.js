// test-cb.js
import db from './config/db.js'; // Importamos la instancia ya creada
import chalk from 'chalk';

// 1. Simulamos una consulta exitosa
const consultaExitosa = async () => "¡Datos obtenidos con éxito!";

// 2. Simulamos un fallo de red (Error transitorio)
const consultaFallida = async () => {
    const error = new Error("Conexión rechazada por el servidor");
    error.code = 'ECONNREFUSED'; // Código que el Set reconoce
    throw error;
};

async function correrPrueba() {
    console.log(chalk.cyan.bold("\n--- INICIANDO PRUEBA DE CIRCUIT BREAKER (INSTANCIA ÚNICA) ---\n"));

    // --- FASE 1: PROVOCAR APERTURA ---
    console.log(chalk.blue("Fase 1: Forzando 5 fallos para 'abrir' el circuito..."));
    for (let i = 1; i <= 6; i++) {
        try {
            await db.ejecutar(consultaFallida);
        } catch (error) {
            console.log(chalk.red(`Intento ${i}: ${error.message}`));
        }
    }

    // --- FASE 2: VERIFICAR BLOQUEO (ESTADO ABIERTO) ---
    console.log(chalk.blue("\nFase 2: Probando el 'Fail Fast' (debe fallar al instante)..."));
    try {
        await db.ejecutar(consultaExitosa);
    } catch (error) {
        console.log(chalk.magenta(`Bloqueo exitoso: ${error.message}`));
    }

    // --- FASE 3: ESPERA DE RECUPERACIÓN ---
    console.log(chalk.blue("\nFase 3: Esperando 31 segundos para pasar a SEMI-ABIERTO..."));
    // Usamos un intervalo para ver el paso del tiempo en consola
    let segundos = 0;
    const timer = setInterval(() => console.log(chalk.gray(`Esperando... ${++segundos}s`)), 5000);
    
    await new Promise(r => setTimeout(r, 31000));
    clearInterval(timer);

    // --- FASE 4: CIERRE DEL CIRCUITO ---
    console.log(chalk.blue("\nFase 4: Enviando consulta de éxito para restaurar el sistema..."));
    try {
        const data = await db.ejecutar(consultaExitosa);
        console.log(chalk.green.bold(`Resultado: ${data}`));
        console.log(chalk.green("¡El circuito ha vuelto a CERRADO!"));
    } catch (error) {
        console.log(chalk.red(`Error: ${error.message}`));
    }
}

correrPrueba();
