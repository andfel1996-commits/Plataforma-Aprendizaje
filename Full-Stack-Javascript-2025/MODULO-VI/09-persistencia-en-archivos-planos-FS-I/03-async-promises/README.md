# 03 - Async con Promises + async/await

## Objetivo
Repetir el flujo (crear → agregar → leer → eliminar) usando `fs/promises`:

- `fs.writeFile()`  -> crear / sobrescribir
- `fs.appendFile()` -> agregar al final
- `fs.readFile()`   -> leer
- `fs.unlink()`     -> eliminar

## Idea clave
Con `async/await` el código se lee “de arriba hacia abajo” (más parecido a sync),
pero **sin bloquear** el hilo.

## Ejecutar
```bash
npm start
```

## Tip
Para NO borrar el archivo al final:
```bash
node index.js --keep
```
