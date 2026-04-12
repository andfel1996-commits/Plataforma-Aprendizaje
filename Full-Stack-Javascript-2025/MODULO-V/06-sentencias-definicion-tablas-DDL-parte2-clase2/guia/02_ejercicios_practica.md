# Ejercicios de práctica — DDL Parte II (Clase 2)

> Objetivo: practicar lo que más falla en la vida real:  
> **ALTER + saneamiento + NOT NULL/DEFAULT**, y una entrada suave a **INDEX** y **VIEW**.

---

## Ejercicio 1 — “Saneamiento antes de NOT NULL”
Tienes una tabla `socios` con `telefono` que permite `NULL`.  
Debes dejarlo como obligatorio, pero primero arreglar los datos existentes.

**Requisitos**
1) Agrega la columna `telefono` permitiendo `NULL` (si no existe).  
2) Inserta 3 socios (al menos uno sin teléfono).  
3) Sanea (`UPDATE`) para que nadie quede con `NULL`.  
4) Cambia la columna a `NOT NULL` con `DEFAULT 'SIN-TELEFONO'`.  
5) Intenta insertar un socio sin teléfono y verifica que tome el default.

**Qué entregar**
- Las sentencias SQL.
- Evidencia con:
  - `DESCRIBE socios;`
  - `SELECT * FROM socios;`

---

## Ejercicio 2 — Índice para acelerar búsquedas
En la tabla `catalogo_libros`, crea un índice para `titulo`.

**Requisitos**
1) Crea el índice `idx_libros_titulo` en `titulo`.  
2) Verifica con `SHOW INDEX FROM catalogo_libros;`.  
3) Usa `EXPLAIN` para una consulta por título exacto.

**Qué entregar**
- `CREATE INDEX`
- `SHOW INDEX`
- `EXPLAIN ...`

---

## Ejercicio 3 — Vista para “listado bonito”
Crea una vista llamada `vw_libros_publicables` que devuelva:
- `libro_id`, `titulo`, `autor`, `anio_publicacion`, `genero`

**Requisitos**
1) Crear la vista.  
2) Consultarla con `SELECT * FROM vw_libros_publicables;`  
3) Agregar un libro nuevo y ver que aparece en la vista.

---

## Mini-desafío (opcional)
Crea un índice compuesto para mejorar búsquedas por:
- `autor` + `anio_publicacion`

Luego prueba (con `EXPLAIN`) una consulta:
```sql
SELECT * FROM catalogo_libros
WHERE autor='Robert C. Martin' AND anio_publicacion=2008;
```

