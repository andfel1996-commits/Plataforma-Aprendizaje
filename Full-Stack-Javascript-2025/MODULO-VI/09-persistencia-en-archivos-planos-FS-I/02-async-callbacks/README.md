# 02 - Async con callbacks (FS asíncrono)

## Objetivo
Hacer el mismo flujo del ejercicio sync, pero usando **callbacks** (modo asíncrono):

- `fs.writeFile()`  -> crear / sobrescribir
- `fs.appendFile()` -> agregar al final
- `fs.readFile()`   -> leer
- `fs.unlink()`     -> eliminar

## Idea clave
En async, Node **no espera** automáticamente.
Por eso **encadenamos** las operaciones: el paso 2 corre dentro del callback del paso 1, etc.

## Ejecutar
```bash
npm start
```

## Tip
Para NO borrar el archivo al final:
```bash
node index.js --keep
```
