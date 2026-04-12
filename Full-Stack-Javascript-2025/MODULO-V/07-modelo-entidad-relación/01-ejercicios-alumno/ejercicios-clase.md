# Ejercicios para estudiantes (sin solución)

> Entrega sugerida: 1 archivo por estudiante (puede ser en Word / PDF / foto de cuaderno)  
> Si trabajan en DB: adjuntar capturas de `DESCRIBE` y `SHOW CREATE TABLE`.

---

## Ejercicio 1 — Identificación (Conceptual)
**Caso:** Biblioteca
Una biblioteca registra:
- Libros (título, isbn, año)
- Autores (nombre, país)
- Préstamos (fecha_préstamo, fecha_devolución)

**Tareas:**
- (a) Lista **entidades**.
- (b) Lista **atributos** por entidad.
- (c) Define **relaciones** entre entidades (verbo).

---

## Ejercicio 2 — Cardinalidad
Para cada relación, define si es **1:1**, **1:N** o **N:N**:

1) Autor — Libro  
2) Libro — Préstamo  
3) Socio — Préstamo  

---

## Ejercicio 3 — N:N a tabla intermedia
En un sistema de cursos:
- Un estudiante puede inscribir muchos cursos.
- Un curso puede tener muchos estudiantes.

**Tareas:**
- (a) ¿Qué relación es?  
- (b) Diseña la tabla intermedia (nombre + campos + PK/FK).

---

## Ejercicio 4 — Normalización (1FN)
Tabla inicial (NO normalizada): `resena_pelicula`

Campos:
- pelicula_id
- titulo
- genero (ej: "Acción, Aventura")
- usuario_email
- comentario

**Tareas:**
- (a) Identifica el/los **grupo(s) repetitivo(s)**.
- (b) Propón tablas para cumplir **1FN**.

---

## Ejercicio 5 — Normalización (2FN y 3FN)
Tabla: `detalle_inscripcion`
Campos:
- estudiante_id
- curso_id
- estudiante_nombre
- curso_nombre
- curso_valor

Supón PK compuesta: (estudiante_id, curso_id)

**Tareas:**
- (a) ¿Qué columnas violan 2FN? ¿por qué?
- (b) Propón tablas en 2FN.
- (c) ¿Alguna columna violaría 3FN? explica.

---

## Ejercicio 6 — Bonus SQL (opcional)
Crea las tablas en MySQL (puede ser pseudocódigo si aún no llegan a SQL):
- estudiante
- curso
- inscripcion (tabla intermedia)

**Tip:** revisa el ejemplo `03-sql/01_modelo_fisico.sql`
