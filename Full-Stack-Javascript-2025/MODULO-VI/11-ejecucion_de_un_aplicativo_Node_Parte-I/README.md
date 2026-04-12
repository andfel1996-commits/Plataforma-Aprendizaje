# Ejecución de un aplicativo Node.js - Parte I (AE6.1)

Este material está armado con el mismo formato de la clase de persistencia en archivos planos (FS): **separado por ejercicios** y con **código hiper comentado**.

## Objetivo de la clase
Aprender a:
- Ejecutar un script con **node** (y entender por qué a veces termina y a veces queda corriendo).
- Leer parámetros desde la terminal usando **process.argv** y validar entrada.
- Detener procesos con **Ctrl + C** (SIGINT) y cerrar de forma ordenada.
- Entender **foreground vs background** y detener con **kill**.
- Introducción a **PM2** como gestor de procesos.

## Estructura pedagógica (carpetas)
- `00-guion-clase/` → guión para dictar la clase
- `01-levantar-app-node/` → `node app.js` + setInterval (proceso vivo)
- `02-process-argv-validacion/` → `process.argv` + validaciones
- `03-sigint-ctrlc/` → captura SIGINT (Ctrl + C)
- `04-foreground-background-kill/` → background, PID, kill (en shells Unix)
- `05-pm2-basico/` → PM2 start/list/stop/restart
- `docs/` → PDF paso a paso

> Nota Windows: para `jobs`, `fg`, `ps`, `kill` usa **Git Bash** o **WSL** (porque esos comandos son estilo Linux/macOS).

## Cómo ejecutar un ejercicio
Entra a una carpeta y ejecuta:

```bash
npm install
npm start
```

Ejemplo:
```bash
cd 02-process-argv-validacion
npm install
npm start -- Juan 25
```

## PDF
El PDF está en:
- `docs/Guia_Ejecucion_Node_Parte_I_AE6_1.pdf`

Fecha: 02/03/2026
