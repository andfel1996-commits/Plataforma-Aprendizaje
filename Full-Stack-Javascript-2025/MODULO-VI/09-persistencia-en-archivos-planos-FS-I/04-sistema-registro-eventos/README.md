# 04 - Sistema de registro de eventos (mini proyecto)

## Objetivo
Simular un sistema de logs (eventos) en `events.log`:

- Agregar eventos con fecha/hora (append)
- Leer y mostrar eventos (read)
- Conservar solo los últimos 5 eventos (leer → filtrar → reescribir)
- Eliminar el archivo al “reiniciar” (unlink)

Este mini proyecto usa `fs/promises` + `async/await` para mantener el código legible.

## Comandos
```bash
# 1) Agregar un evento
node index.js add "Usuario inició sesión"

# 2) Listar eventos
node index.js list

# 3) Conservar solo los últimos 5
node index.js trim

# 4) Reset (simula reinicio: borra el archivo)
node index.js reset
```

## Ejecutar con npm
```bash
npm start -- add "Evento de prueba"
npm start -- list
```
