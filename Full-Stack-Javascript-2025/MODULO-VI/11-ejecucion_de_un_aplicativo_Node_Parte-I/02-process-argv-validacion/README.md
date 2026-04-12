# 02 - Parámetros por terminal (process.argv) + validación

## Objetivo
- Leer parámetros del usuario desde la terminal.
- Validar para evitar errores.

## Ejecutar (correcto)
```bash
npm install
npm start -- Juan 25
```

## Casos para probar
- Sin parámetros: `npm start`
- Edad inválida: `npm start -- Juan ABC`
- Edad negativa: `npm start -- Juan -1`
