# Persistencia en archivos planos FS (separado por enfoque)

- **01-sync-basico**: entender el flujo “paso a paso” con métodos **síncronos** (bloquean el hilo).
- **02-async-callbacks**: lo mismo pero en modo **asíncrono con callbacks** (no bloquea, pero puede quedar anidado).
- **03-async-promises**: lo mismo pero en modo **asíncrono con Promises + async/await** (más legible).
- **04-sistema-registro-eventos**: mini proyecto (logs) usando FS para registrar eventos y conservar solo los últimos 5.

> Nota importante: **fs es un módulo nativo de Node.js**, no se instala con `npm install fs`.
> Solo usamos `npm init -y` (opcional) para tener scripts y estructura.

## Requisitos
- Node.js 18+ (ideal Node 20+)
- Terminal (PowerShell, CMD, zsh, bash)

## Cómo ejecutar (recomendado)
Entra a cada carpeta y ejecuta su demo:

```bash
cd "01-sync-basico"
npm install   # (opcional, no hay dependencias)
npm start
```

Luego repite con:

- `02-async-callbacks`
- `03-async-promises`
- `04-sistema-registro-eventos`

## ¿Qué métodos se trabajan?
Alineado con la presentación “Persistencia en archivos planos – Parte I”:
- Lectura: `readFileSync`, `readFile`
- Escritura (sobrescribe): `writeFileSync`, `writeFile`
- Escritura (agrega): `appendFileSync`, `appendFile`
- Eliminación: `unlinkSync`, `unlink`

## Material extra
- En `docs/` encontrarás la guía en PDF con explicación paso a paso.
