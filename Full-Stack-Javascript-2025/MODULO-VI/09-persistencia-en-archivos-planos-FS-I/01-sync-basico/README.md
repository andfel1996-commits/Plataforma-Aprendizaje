# 01 - Sync básico (FS síncrono)

## Objetivo
Practicar persistencia en un archivo de texto usando **métodos síncronos**:

- `fs.writeFileSync()`  -> crear / sobrescribir
- `fs.appendFileSync()` -> agregar al final
- `fs.readFileSync()`   -> leer
- `fs.unlinkSync()`     -> eliminar

## ¿Por qué partir por Sync?
Porque el orden de ejecución es más fácil de visualizar: cada línea **espera** a la anterior.

> Ojo: Sync **bloquea** el hilo principal. En apps reales (servidores, APIs) se prefiere Async.

## Ejecutar
```bash
npm start
```

## Tip
Por defecto el script elimina el archivo al final para que puedas repetir la demo.
Si quieres conservarlo:
```bash
node index.js --keep
```
