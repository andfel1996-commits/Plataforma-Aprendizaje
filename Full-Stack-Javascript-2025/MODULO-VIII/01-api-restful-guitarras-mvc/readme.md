# API RESTful de Guitarras — MVC

API RESTful construida con **Node.js + Express** que aplica el patrón de arquitectura **MVC (Modelo - Vista - Controlador)** y persiste los datos en un archivo JSON local.

---

## Tecnologías utilizadas

| Tecnología | Versión | Rol |
|------------|---------|-----|
| Node.js | v24+ | Runtime de JavaScript en el servidor |
| Express | v5 | Framework HTTP para definir rutas y middlewares |
| uuid | v13 | Generación de IDs únicos para cada guitarra |
| dotenv | v17 | Carga de variables de entorno desde `.env` |
| nodemon | — | Reinicio automático en desarrollo |

---

## Arquitectura MVC

El proyecto separa responsabilidades en capas bien definidas:

```
index.js                      ← Punto de entrada: crea e inicia el servidor
models/
  Server.js                   ← Clase Server: configura Express, middlewares y rutas
v1/routes/
  guitarras.routes.js         ← Enrutador: define URLs y asocia middlewares + controladores
controllers/
  guitarras.controller.js     ← Controladores: reciben req, llaman al servicio, envían res
services/
  guitarras.service.js        ← Lógica de negocio: orquesta operaciones sobre los datos
database/
  Guitars.js                  ← Acceso a datos: lee/escribe el archivo db.json
  db.json                     ← "Base de datos" en archivo JSON
middlewares/
  validateGuitar.js           ← Valida el body antes de llegar al controlador
  cacheHeaders.js             ← Añade cabeceras Cache-Control según el método HTTP
  requestInfo.js              ← Logger: imprime método, URL, status y duración
  errorHandler.js             ← Captura errores lanzados con next(error)
  notFound.js                 ← Responde 404 cuando ninguna ruta coincide
utils/
  ApiError.js                 ← Clase de error personalizada con statusCode y details
  apiResponse.js              ← Función helper para respuestas estandarizadas
  hateoas.js                  ← Genera los _links HATEOAS de cada recurso
```

### Flujo de una petición

```
Cliente HTTP
    │
    ▼
middlewares globales (requestInfo → cacheHeaders → express.json)
    │
    ▼
Router (v1/routes/guitarras.routes.js)
    │
    ▼
Middleware de validación (validateGuitar.js)  ← solo en POST, PUT, PATCH
    │
    ▼
Controlador (guitarras.controller.js)
    │
    ▼
Servicio (guitarras.service.js)
    │
    ▼
Capa de datos (database/Guitars.js → db.json)
    │
    ▼
Respuesta JSON estandarizada al cliente
```

---

## Configuración

Crea un archivo `.env` en la raíz del proyecto basándote en `.env.sample`:

```env
PORT=3000
API_VERSION=v1
API_CACHE_MAX_AGE=60
```

| Variable | Descripción | Valor por defecto |
|----------|-------------|-------------------|
| `PORT` | Puerto en que escucha el servidor | `3000` |
| `API_VERSION` | Versión de la API usada en el prefijo de rutas | `v1` |
| `API_CACHE_MAX_AGE` | Segundos que el cliente puede cachear respuestas GET | `60` |

---

## Instalación y ejecución

```bash
# Instalar dependencias
npm install

# Modo desarrollo (reinicio automático con nodemon)
npm run start

# Modo desarrollo nativo (--watch de Node.js)
npm run dev
```

---

## Endpoints

Base URL: `http://localhost:3000/api/v1`

### Sistema

| Método | URL | Descripción | Status |
|--------|-----|-------------|--------|
| `GET` | `/api/v1` | Documentación resumida de la API | `200` |
| `GET` | `/api/v1/health` | Estado del servidor (uptime) | `200` |

### Guitarras

| Método | URL | Descripción | Status éxito |
|--------|-----|-------------|--------------|
| `GET` | `/api/v1/guitarras` | Obtener todas las guitarras | `200` |
| `GET` | `/api/v1/guitarras/:guitarId` | Obtener una guitarra por ID | `200` |
| `POST` | `/api/v1/guitarras` | Crear una nueva guitarra | `201` |
| `PUT` | `/api/v1/guitarras/:guitarId` | Reemplazar completamente una guitarra | `200` |
| `PATCH` | `/api/v1/guitarras/:guitarId` | Actualizar parcialmente una guitarra | `200` |
| `DELETE` | `/api/v1/guitarras/:guitarId` | Eliminar una guitarra | `204` |

---

## Consultas avanzadas en el listado

Endpoint base de listado:

`GET /api/v1/guitarras`

Este endpoint acepta query params para trabajar con datos reales como en una API profesional:

| Query param | Tipo | Para que sirve |
|-------------|------|----------------|
| `q` | `string` | Filtra por texto (busca en id, name, brand, model, body, color, pickups) |
| `sortBy` | `string` | Campo por el cual ordenar (ejemplo: `name`, `value`, `stock`) |
| `order` | `asc` \| `desc` | Direccion del ordenamiento |
| `page` | `number` | Numero de pagina (empieza en 1) |
| `limit` | `number` | Cantidad de registros por pagina |
| `fields` | `string` CSV | Seleccion de campos a devolver (ejemplo: `id,name,value`) |

### Explicacion simple de sort (para clase)

Piensen el `sort` como ordenar una lista de estudiantes por apellido o por nota.

1. Primero elegimos **por que campo** ordenar con `sortBy`.
2. Luego elegimos **en que direccion** con `order`.
3. `order=asc` significa de menor a mayor (A-Z, 100-200).
4. `order=desc` significa de mayor a menor (Z-A, 200-100).

Ejemplo mental:

- `sortBy=value&order=asc` -> guitarras mas baratas primero.
- `sortBy=name&order=desc` -> nombres de Z a A.

### Explicacion simple de paginacion (para clase)

La paginacion divide un listado grande en "bloques" o paginas.

1. `limit` define tamano del bloque.
2. `page` define que bloque quiero ver.
3. Formula usada internamente:
  `startIndex = (page - 1) * limit`
4. Formula usada internamente:
  `endIndex = startIndex + limit`

Ejemplo:

- Si `page=2` y `limit=3`, se devuelven los elementos 4, 5 y 6.

La respuesta incluye `meta` con:

- `total`: total de registros luego del filtro.
- `count`: cuantos registros devolvio esta pagina.
- `page`: pagina actual.
- `limit`: limite usado.
- `totalPages`: total de paginas disponibles.
- `hasPrevPage` y `hasNextPage`: navegacion rapida.

### Endpoints de ejemplo (listado con query params)

Todos son variaciones de `GET /api/v1/guitarras`:

```bash
# 1) Listado completo (sin filtros)
http://localhost:3000/api/v1/guitarras

# 2) Filtro por texto
http://localhost:3000/api/v1/guitarras?q=gibson

# 3) Orden por precio ascendente
http://localhost:3000/api/v1/guitarras?sortBy=value&order=asc

# 4) Orden por nombre descendente
http://localhost:3000/api/v1/guitarras?sortBy=name&order=desc

# 5) Paginacion basica
http://localhost:3000/api/v1/guitarras?page=2&limit=3

# 6) Filtro + sort + paginacion
http://localhost:3000/api/v1/guitarras?q=gibson&sortBy=value&order=asc&page=1&limit=5

# 7) Filtro + sort + seleccion de campos
http://localhost:3000/api/v1/guitarras?q=gibson&sortBy=value&order=asc&fields=id,name,value

# 8) Caso completo (filtro + sort + paginacion + fields)
http://localhost:3000/api/v1/guitarras?q=gibson&sortBy=value&order=asc&page=2&limit=2&fields=id,name,value,stock
```

---

## Modelo de datos — Guitarra

### Body requerido para `POST` y `PUT`

```json
{
  "name": "Ibanez RG550",
  "brand": "Ibanez",
  "model": "RG550",
  "body": "Superstrat",
  "color": "Purple Neon",
  "pickups": "HSH",
  "strings": 6,
  "value": 1499,
  "stock": 5
}
```

### Campos y tipos

| Campo | Tipo | Obligatorio | Descripción |
|-------|------|-------------|-------------|
| `name` | `string` | ✅ | Nombre comercial de la guitarra |
| `brand` | `string` | ✅ | Marca fabricante |
| `model` | `string` | ✅ | Modelo específico |
| `body` | `string` | ✅ | Tipo de cuerpo (Stratocaster, Superstrat, etc.) |
| `color` | `string` | ✅ | Color de la guitarra |
| `pickups` | `string` | ✅ | Configuración de pastillas (SSS, HSH, HH, etc.) |
| `strings` | `number` | ✅ | Número de cuerdas (≥ 0) |
| `value` | `number` | ✅ | Precio en la moneda local (≥ 0) |
| `stock` | `number` | ✅ | Unidades disponibles (≥ 0) |

> Para `PATCH` solo es obligatorio enviar al menos un campo.

### Respuesta enriquecida con HATEOAS

Cada guitarra en la respuesta incluye un objeto `_links` con las URLs de las acciones disponibles sobre ese recurso:

```json
{
  "id": "a1b2c3d4",
  "name": "Ibanez RG550",
  "_links": {
    "self":   { "href": "/api/v1/guitarras/a1b2c3d4", "method": "GET" },
    "update": { "href": "/api/v1/guitarras/a1b2c3d4", "method": "PATCH" },
    "replace":{ "href": "/api/v1/guitarras/a1b2c3d4", "method": "PUT" },
    "delete": { "href": "/api/v1/guitarras/a1b2c3d4", "method": "DELETE" }
  }
}
```

---

## Formato estándar de respuesta

### Éxito

```json
{
  "status": "success",
  "code": 200,
  "message": "Listado de guitarras obtenido correctamente.",
  "data": [ ... ],
  "meta": { "total": 5 }
}
```

### Error

```json
{
  "status": "error",
  "code": 422,
  "message": "Error de validación al crear la guitarra.",
  "details": [
    "El campo 'strings' debe ser un número mayor o igual a 0."
  ]
}
```

---

## Middlewares

| Middleware | Archivo | Función |
|------------|---------|---------|
| `requestInfo` | `middlewares/requestInfo.js` | Logger: imprime `MÉTODO URL → STATUS (Xms)` en consola |
| `cacheForGetRequest` | `middlewares/cacheHeaders.js` | Añade `Cache-Control: public, max-age=N` en GET y `no-store` en el resto |
| `validateCreateGuitar` | `middlewares/validateGuitar.js` | Valida que el body tenga todos los campos obligatorios con tipos correctos |
| `validatePutGuitar` | `middlewares/validateGuitar.js` | Igual que create, para reemplazos completos con PUT |
| `validatePatchGuitar` | `middlewares/validateGuitar.js` | Valida solo los campos enviados y exige al menos uno |
| `errorHandler` | `middlewares/errorHandler.js` | Captura errores lanzados con `next(error)` y devuelve respuesta estándar |
| `notFoundHandler` | `middlewares/notFound.js` | Responde `404` cuando ninguna ruta coincide |

---

## Códigos de Estado HTTP (Status Codes)

### 2xx — Éxito

| Código | Nombre | Cuándo se usa en esta API |
|--------|--------|--------------------------|
| `200` | OK | `GET` (lista o detalle), `PUT`, `PATCH` exitosos |
| `201` | Created | `POST` tras crear una guitarra correctamente |
| `204` | No Content | `DELETE` exitoso (sin cuerpo en la respuesta) |

### 4xx — Errores del cliente

| Código | Nombre | Cuándo se usa en esta API |
|--------|--------|--------------------------|
| `400` | Bad Request | Petición mal formada o parámetros inválidos |
| `401` | Unauthorized | No autenticado (sin token o sesión) |
| `403` | Forbidden | Autenticado pero sin permisos suficientes |
| `404` | Not Found | Guitarra no encontrada o ruta inexistente |
| `405` | Method Not Allowed | Método HTTP no permitido en esa ruta |
| `409` | Conflict | Conflicto con el estado actual del recurso |
| `422` | Unprocessable Entity | Validación fallida (campos inválidos o faltantes) |
| `429` | Too Many Requests | Límite de peticiones superado (rate limiting) |

### 5xx — Errores del servidor

| Código | Nombre | Cuándo se usa en esta API |
|--------|--------|--------------------------|
| `500` | Internal Server Error | Error inesperado no controlado en el servidor |
| `503` | Service Unavailable | Servidor no disponible (mantenimiento o sobrecarga) |

### Resumen rápido por operación

| Operación | Método | Status de éxito | Status de error frecuente |
|-----------|--------|----------------|---------------------------|
| Listar todas | `GET` | `200` | `500` |
| Obtener una | `GET` | `200` | `404` |
| Crear | `POST` | `201` | `422` |
| Reemplazar | `PUT` | `200` | `404`, `422` |
| Actualizar parcial | `PATCH` | `200` | `404`, `422` |
| Eliminar | `DELETE` | `204` | `404` |
| Ruta no existe | — | — | `404` |
| Validación fallida | `POST/PUT/PATCH` | — | `422` |
