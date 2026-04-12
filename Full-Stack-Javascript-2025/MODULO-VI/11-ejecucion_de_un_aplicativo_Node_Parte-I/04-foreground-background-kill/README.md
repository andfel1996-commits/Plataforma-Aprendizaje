# 04 - Foreground vs Background + PID + kill

## Objetivo
- Ejecutar un proceso en foreground y en background.
- Obtener el PID y detenerlo con `kill`.

> Para `jobs`, `fg`, `ps`, `kill` usa Git Bash/WSL (Windows) o terminal Linux/macOS.

## 1) Foreground (primer plano)
```bash
npm install
npm start
```
La terminal queda ocupada. Detén con Ctrl + C.

## 2) Background (segundo plano) - Unix shells
Desde terminal:
```bash
node src/server.js &
jobs
```
- `&` lo manda al background.
- `jobs` lista procesos en background (por job number).

## 3) Traer al foreground
```bash
fg %1
```
Luego Ctrl + C.

## 4) Obtener PID y matar el proceso
```bash
ps aux | grep node
kill <PID>
```
Forzar (solo si no responde):
```bash
kill -9 <PID>
```
