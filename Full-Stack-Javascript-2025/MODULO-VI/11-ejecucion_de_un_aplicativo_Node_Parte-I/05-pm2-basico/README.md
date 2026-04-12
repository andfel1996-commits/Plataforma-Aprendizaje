# 05 - PM2 básico (introducción)

## Objetivo
Levantar y controlar procesos con PM2:
- start / list / stop / restart

## Instalar PM2 (una sola vez)
```bash
npm i -g pm2
```

## Ejecutar con PM2
Desde esta carpeta:
```bash
pm2 start src/server.js --name miApp
pm2 list
pm2 stop miApp
pm2 restart miApp
```

## Nota
Este `server.js` imprime un mensaje cada 3 segundos (ideal para practicar).
