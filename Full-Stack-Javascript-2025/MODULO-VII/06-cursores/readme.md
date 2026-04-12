# Cursores en PostgreSQL

## ¿Qué es un cursor? — La analogía del libro

Imagina que tienes que leer un libro de 1000 páginas.

- **Sin cursor** → fotocopias las 1000 páginas de golpe, las pones en la mesa y recién entonces empiezas a leer. Usas mucho espacio (memoria) y esperas mucho tiempo antes de poder hacer algo.
- **Con cursor** → abres el libro en la página 1, lees, pasas la página, lees, y así. Solo tienes UNA página en la mano en cada momento.

En base de datos ocurre exactamente lo mismo:

| Estrategia | Qué pasa en memoria |
|---|---|
| `SELECT * FROM usuarios` | PostgreSQL envía **todos** los registros de una vez → posible `OutOfMemory` |
| Cursor + `FETCH 1` | Se recibe **1 fila** a la vez, la memoria se mantiene constante |

---

## ¿Cuándo NECESITAS un cursor?

- La tabla tiene **millones de filas** y no caben en RAM.
- Necesitas **procesar cada fila** antes de pedir la siguiente (transformar, guardar, emitir eventos…).
- Estás generando un archivo CSV/JSON **línea a línea**.
- Quieres controlar el ritmo de lectura para no saturar la aplicación (**backpressure**).

---

## Ciclo de vida de un cursor en PostgreSQL

```
OPEN  →  FETCH  →  FETCH  →  FETCH  →  (rows = 0)  →  CLOSE
```

### 1. Abrir el cursor (dentro de una transacción)

```sql
BEGIN; -- Los cursores viven dentro de una transacción

DECLARE my_cursor CURSOR FOR
SELECT * FROM usuarios WHERE activo = true;
```

> `DECLARE` asocia el cursor a una consulta. La consulta **no se ejecuta completamente** en este momento; solo se prepara.

### 2. Recuperar filas con FETCH

Fila a fila:
```sql
FETCH NEXT FROM my_cursor;
```

En lotes (más eficiente para grandes volúmenes):
```sql
FETCH 100 FROM my_cursor; -- Trae las siguientes 100 filas
```

### 3. Navegar por los resultados

Los cursores `SCROLL` permiten moverse libremente, algo imposible con un `SELECT` normal:

| Comando | Qué hace |
|---|---|
| `FETCH PRIOR` | Fila anterior |
| `FETCH FIRST` | Primera fila del resultado |
| `FETCH LAST` | Última fila del resultado |
| `FETCH ABSOLUTE 50` | Va directamente a la fila 50 |
| `FETCH RELATIVE -3` | Retrocede 3 filas desde la posición actual |

### 4. Cerrar el cursor y confirmar la transacción

```sql
CLOSE my_cursor;

COMMIT; -- Guarda cambios
-- o
ROLLBACK; -- Deshace cambios
```

---

## Beneficios clave — Para no olvidarlos

### ✅ Memoria constante
No importa si la tabla tiene 100 o 100 000 000 filas: el programa siempre trabaja con el mismo lote pequeño en memoria.

### ✅ Procesamiento en tiempo real
Cada fila se puede procesar **mientras llega**, sin esperar a que termine la consulta completa.

### ✅ Tú controlas el ritmo
Si tu código tarda en procesar un lote, simplemente no pides el siguiente `FETCH` hasta estar listo. La base de datos espera pacientemente.

### ✅ Vista consistente de los datos
El cursor "congela" el resultado en el momento en que se abre. Si otra sesión modifica la tabla mientras lees, el cursor no se entera → **consistencia garantizada**.

### ✅ Sin re-ejecutar la consulta
Una vez declarado, el cursor reutiliza el plan de ejecución en cada `FETCH`, sin que PostgreSQL tenga que re-parsear ni re-planificar la consulta.

---

> **⚠️ Cuándo NO usar cursores**
>
> Para consultas pequeñas (< 10 000 filas) un `SELECT` directo es más simple y más rápido.
> Los cursores añaden overhead de transacción y conexión; úsalos **solo cuando el volumen de datos lo justifique**.

---

## Setup del proyecto

```sql
CREATE DATABASE clientes;

CREATE TABLE usuarios (
    id         SERIAL PRIMARY KEY,
    first_name VARCHAR(100),
    last_name  VARCHAR(100),
    email      VARCHAR(255) UNIQUE NOT NULL
);
```




