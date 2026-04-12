# Guion de clase (Paso a paso) — DDL Parte II (Clase 2)

> Duración sugerida: 90–120 min (ajústalo según tu bloque).  
> Público: estudiantes que están aprendiendo (todo va con checkpoints).

---

## 0) Preparación (5 min)
1. Abre DBeaver (o Workbench).
2. Crea una pestaña SQL nueva.
3. Ejecuta: `sql/00_setup_bd.sql`

**Checkpoint**
- Debe existir la base `ddl_clase06`.
- Debe existir la tabla `socios` y `catalogo_libros`.

---

## 1) Problema real: pasar de NULL → NOT NULL (25–30 min)
**Contexto didáctico**: ayer agregamos una columna que permitía `NULL`.  
Hoy queremos hacerla obligatoria, pero aparece un error:

> `Data truncation: Invalid use of NULL value`

### 1.1 Reproduce el caso
Ejecuta `sql/01_alter_saneamiento_not_null_default.sql` hasta el bloque indicado.

**Checkpoint**
- `telefono` existe y permite NULL.
- Hay al menos 1 fila con `telefono = NULL`.

### 1.2 Explica el “por qué”
Cuando haces:
- `ALTER TABLE ... MODIFY telefono ... NOT NULL`
MySQL intenta aplicar esa regla a **todas las filas existentes**.
Si encuentra `NULL`, falla.

### 1.3 Solución correcta (2 pasos)
1) **Sanear datos**:
- `UPDATE socios SET telefono='SIN-TELEFONO' WHERE telefono IS NULL;`

2) **Aplicar restricción**:
- `ALTER TABLE socios MODIFY telefono VARCHAR(20) NOT NULL DEFAULT 'SIN-TELEFONO';`

**Checkpoint**
- `SELECT COUNT(*) FROM socios WHERE telefono IS NULL;` debe dar 0.
- `DESCRIBE socios;` debe mostrar `telefono` como `NOT NULL` con DEFAULT.

---

## 2) Índices (20–25 min) — “solo lo esencial”
### 2.1 ¿Qué es un índice?
- Un atajo para búsquedas con `WHERE`.
- No “se consulta el índice”, se consulta la tabla y MySQL lo usa.

### 2.2 Crear un índice simple
Ejecuta `sql/02_create_index_y_explain.sql`.

**Checkpoint**
- `SHOW INDEX FROM catalogo_libros;` muestra `idx_libros_titulo` en la columna `titulo`.

### 2.3 Ver si se usa el índice (EXPLAIN)
- Ejecuta `EXPLAIN SELECT ... WHERE titulo = 'Clean Code';`
- Mirar solo 2 cosas:
  - `key` (qué índice usó)
  - `type` (`ALL` = escaneo completo; `ref/range` = usó índice)

> Nota docente: con pocas filas MySQL a veces “no usa” índice porque da lo mismo.
> Para demo, se incluye `USE INDEX` (solo didáctico).

---

## 3) Vistas (15–20 min) — “SELECT guardado”
### 3.1 ¿Qué es una vista?
Una vista es un SELECT con nombre.  
No duplica filas: “lee” datos de las tablas originales.

### 3.2 Crear una vista de catálogo
Ejecuta `sql/03_create_view.sql`.

**Checkpoint**
- `SELECT * FROM vw_catalogo_resumen;` funciona.

---

## 4) Taller guiado (20–30 min)
Ejecuta `sql/04_reto_practico_clase2.sql` y completa los TODO.

Si se traban:
- revisa `guia/03_soluciones.md`
- o usa el archivo `sql/05_reto_practico_clase2_soluciones.sql`

---

## 5) Cierre (5 min)
- DDL cambia estructura.
- A veces necesitamos DML (UPDATE) para **preparar** datos antes de una restricción.
- Índices: para búsquedas frecuentes.
- Vistas: para consultas repetidas/reportes.

