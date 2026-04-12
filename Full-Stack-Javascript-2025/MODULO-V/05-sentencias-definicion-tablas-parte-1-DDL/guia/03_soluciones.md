# Soluciones (explicadas) — DDL

> Si quieres ir directo al SQL, revisa `sql/06_reto_practico_soluciones.sql`.

## A) categorias

```sql
CREATE TABLE categorias (
  categoria_id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(60) NOT NULL UNIQUE,
  descripcion VARCHAR(255) NULL
) COMMENT='Catálogo de categorías para clasificar libros del club';
```

**Notas**
- `UNIQUE` evita nombres duplicados.
- `NULL` en `descripcion` permite dejarla vacía.

---

## B) libros_categoria (tabla puente N a N)

```sql
CREATE TABLE libros_categoria (
  libro_id INT NOT NULL,
  categoria_id INT NOT NULL,
  PRIMARY KEY (libro_id, categoria_id),
  CONSTRAINT fk_lc_libro
    FOREIGN KEY (libro_id) REFERENCES libros(libro_id),
  CONSTRAINT fk_lc_categoria
    FOREIGN KEY (categoria_id) REFERENCES categorias(categoria_id)
);
```

**Por qué PK compuesta**
- Evita repetir la misma pareja (`libro_id`, `categoria_id`).

---

## C) ALTER TABLE

### 5) Agregar teléfono (permitiendo NULL)

```sql
ALTER TABLE socios
ADD COLUMN telefono VARCHAR(20) NULL;
```

### 6) Forzar NOT NULL + DEFAULT

```sql
ALTER TABLE socios
MODIFY COLUMN telefono VARCHAR(20) NOT NULL DEFAULT 'SIN-TELEFONO';
```

> Ojo: si ya había filas con `NULL`, primero debes actualizar datos o definir un DEFAULT y luego modificar.

### 7) Renombrar columna (MySQL usa CHANGE y exige tipo)

```sql
ALTER TABLE socios
CHANGE COLUMN apellido apellidos VARCHAR(60) NOT NULL;
```

---

## D) TRUNCATE vs DROP

### 8) Vaciar préstamos

```sql
TRUNCATE TABLE prestamos;
```

### 9) Eliminar libros_categoria

```sql
DROP TABLE IF EXISTS libros_categoria;
```

---

## Desafío CHECK (si el motor lo respeta)

```sql
ALTER TABLE prestamos
ADD CONSTRAINT chk_fechas_prestamo
CHECK (fecha_devolucion IS NULL OR fecha_devolucion >= fecha_prestamo);
```

**Nota**
- En algunos MariaDB/MySQL antiguos, `CHECK` puede no validarse como esperas.
