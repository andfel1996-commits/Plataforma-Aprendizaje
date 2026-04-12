# MÓDULO VII — PostgreSQL con Node.js

## Exportar e Importar una base de datos con pg_dump y psql

Datos de conexión usados en este módulo:

| Parámetro | Valor |
|-----------|-------|
| Usuario | `postgres` |
| Host | `localhost` |
| Puerto | `5432` |
| Base de datos | `clientes` |
| Password | `postgres` |

---

## EXPORTAR — pg_dump

### Mac (Terminal)

```bash
PGPASSWORD=postgres pg_dump -U postgres -h localhost -p 5432 -d clientes -f ~/Desktop/backup_clientes.sql
```

### Windows (CMD)

```cmd
set PGPASSWORD=postgres
pg_dump -U postgres -h localhost -p 5432 -d clientes -f C:\Users\TuUsuario\Desktop\backup_clientes.sql
```

### Windows (PowerShell)

```powershell
$env:PGPASSWORD="postgres"
pg_dump -U postgres -h localhost -p 5432 -d clientes -f C:\Users\TuUsuario\Desktop\backup_clientes.sql
```

---

## IMPORTAR — psql

Primero crear la base de datos destino si no existe, luego importar.

### Mac (Terminal)

```bash
PGPASSWORD=postgres psql -U postgres -h localhost -p 5432 -c "CREATE DATABASE clientes_restaurada;"
PGPASSWORD=postgres psql -U postgres -h localhost -p 5432 -d clientes_restaurada -f ~/Desktop/backup_clientes.sql
```

### Windows (CMD)

```cmd
set PGPASSWORD=postgres
psql -U postgres -h localhost -p 5432 -c "CREATE DATABASE clientes_restaurada;"
psql -U postgres -h localhost -p 5432 -d clientes_restaurada -f C:\Users\TuUsuario\Desktop\backup_clientes.sql
```

### Windows (PowerShell)

```powershell
$env:PGPASSWORD="postgres"
psql -U postgres -h localhost -p 5432 -c "CREATE DATABASE clientes_restaurada;"
psql -U postgres -h localhost -p 5432 -d clientes_restaurada -f C:\Users\TuUsuario\Desktop\backup_clientes.sql
```

---

## Opciones útiles de pg_dump

| Flag | Descripción |
|------|-------------|
| `--no-owner` | Omite los `ALTER OWNER` (recomendado al migrar entre equipos) |
| `--schema-only` | Solo exporta la estructura, sin datos |
| `--data-only` | Solo exporta los datos, sin estructura |
| `-t nombre_tabla` | Exporta únicamente la tabla indicada |
| `-F c` | Formato binario comprimido (restaurar con `pg_restore`) |

### Ejemplo — exportar solo la tabla `usuarios`

```bash
PGPASSWORD=postgres pg_dump -U postgres -h localhost -d clientes -t usuarios --no-owner -f ~/Desktop/solo_usuarios.sql
```

---

## Nota para Windows

Si `pg_dump` o `psql` no se reconocen como comandos, usa la ruta completa del binario:

```cmd
"C:\Program Files\PostgreSQL\16\bin\pg_dump" -U postgres -d clientes -f C:\backup_clientes.sql
```

Ajusta `16` por la versión de PostgreSQL que tengas instalada.

---

## Códigos de Estado HTTP (Status Codes)

Los status codes son respuestas numéricas que el servidor envía al cliente para indicar el resultado de una petición HTTP. Se agrupan en 5 familias.

---

### 1xx — Informativos

| Código | Nombre | Uso en APIs REST |
|--------|--------|-----------------|
| `100` | Continue | El servidor recibió los headers y el cliente puede continuar enviando el body |
| `101` | Switching Protocols | El servidor acepta cambiar el protocolo (ej: a WebSockets) |

---

### 2xx — Éxito

| Código | Nombre | Uso en APIs REST |
|--------|--------|-----------------|
| `200` | OK | Petición exitosa. Usado en `GET`, `PUT`, `PATCH`, `DELETE` cuando se devuelve contenido |
| `201` | Created | Recurso creado exitosamente. Usado en `POST` tras insertar un registro |
| `202` | Accepted | La petición fue aceptada pero se procesará de forma asíncrona (ej: jobs en cola) |
| `204` | No Content | Éxito sin cuerpo de respuesta. Común en `DELETE` o `PATCH` que no devuelven datos |

---

### 3xx — Redirecciones

| Código | Nombre | Uso en APIs REST |
|--------|--------|-----------------|
| `301` | Moved Permanently | El recurso se movió definitivamente a otra URL |
| `302` | Found | Redirección temporal a otra URL |
| `304` | Not Modified | El recurso no cambió; el cliente puede usar su caché |

---

### 4xx — Errores del cliente

| Código | Nombre | Uso en APIs REST |
|--------|--------|-----------------|
| `400` | Bad Request | La petición tiene un formato incorrecto o parámetros inválidos |
| `401` | Unauthorized | No autenticado: el cliente debe enviar credenciales (token, sesión) |
| `403` | Forbidden | Autenticado pero sin permisos para acceder al recurso |
| `404` | Not Found | El recurso solicitado no existe |
| `405` | Method Not Allowed | El método HTTP no está permitido en esa ruta (ej: `DELETE` en una ruta solo `GET`) |
| `409` | Conflict | Conflicto con el estado actual (ej: email duplicado al registrar usuario) |
| `410` | Gone | El recurso existía pero fue eliminado permanentemente |
| `422` | Unprocessable Entity | El body es válido en formato pero falla la validación de negocio (campos inválidos) |
| `429` | Too Many Requests | El cliente superó el límite de peticiones (rate limiting) |

---

### 5xx — Errores del servidor

| Código | Nombre | Uso en APIs REST |
|--------|--------|-----------------|
| `500` | Internal Server Error | Error inesperado en el servidor. Nunca exponer detalles internos al cliente |
| `501` | Not Implemented | El método solicitado no está implementado aún |
| `502` | Bad Gateway | El servidor actuó como proxy y recibió una respuesta inválida del servidor upstream |
| `503` | Service Unavailable | El servidor no está disponible (mantenimiento, sobrecarga) |
| `504` | Gateway Timeout | El servidor proxy no recibió respuesta a tiempo del servidor upstream |

---

### Resumen rápido para APIs REST

| Acción | Método | Status de éxito |
|--------|--------|----------------|
| Obtener listado | `GET` | `200 OK` |
| Obtener uno por ID | `GET` | `200 OK` / `404 Not Found` |
| Crear recurso | `POST` | `201 Created` |
| Reemplazar recurso | `PUT` | `200 OK` |
| Actualizar parcial | `PATCH` | `200 OK` |
| Eliminar recurso | `DELETE` | `200 OK` / `204 No Content` |
| Validación fallida | `POST/PUT/PATCH` | `422 Unprocessable Entity` |
| Sin autenticación | Cualquiera | `401 Unauthorized` |
| Sin permisos | Cualquiera | `403 Forbidden` |
| Ruta no existe | Cualquiera | `404 Not Found` |
