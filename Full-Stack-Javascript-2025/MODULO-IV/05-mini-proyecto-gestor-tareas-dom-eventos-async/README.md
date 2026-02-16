# Gestor de tareas (DOM + Eventos + Async) — Versión con módulos

Este proyecto usa **ES Modules** (`import/export`).
Por eso NO se recomienda abrir con doble click en `index.html` (file://),
porque muchos navegadores bloquean módulos por CORS.

## Cómo ejecutar (sin instalar nada “extra”)
### Opción 1 (recomendada): servidor local con Node
En la carpeta del proyecto:
```bash
npx serve .

```

Qué aprenderás (en simple)

DOM: selección, creación y actualización (getElementById, querySelector, createElement)

Atributos: setAttribute/getAttribute y dataset (data-id, data-estado)

Eventos:

preventDefault en formulario

delegación en <ul> con event.target vs event.currentTarget

bubbling/capturing + stopPropagation

Asincronía:

setTimeout para simular latencia

Promise + async/await + try/catch

estados UI: cargando / ok / error

Desafío A (DOM) — Badge de prioridad

Agrega prioridad: "alta" | "media" | "baja" a cada tarea (por defecto “media”).

Guarda en el DOM li.dataset.prioridad.

Agrega una clase al badge según prioridad: prioridad-alta, prioridad-media, prioridad-baja.

Crea estilos en CSS para esas clases.

Desafío B (Eventos/Asincronía) — Simular error sin romper la app

En consola: debugApi.setForzarError(true)

Prueba “Cargar tareas demo” o agregar/eliminar (guardado).

Debe mostrarse error en UI, pero la app sigue operativa localmente.

Vuelve: debugApi.setForzarError(false)

Regla de oro (seguridad)

Usamos textContent (más seguro) en vez de innerHTML.
