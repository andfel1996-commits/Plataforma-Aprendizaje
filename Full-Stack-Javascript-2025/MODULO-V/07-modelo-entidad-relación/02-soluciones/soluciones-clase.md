# Soluciones sugeridas (con explicación)

---

## Solución 1 — Identificación (Biblioteca)
**Entidades:**
- Libro
- Autor
- Préstamo
- (Opcional) Socio / Usuario (si el caso lo considera)

**Relaciones típicas:**
- Autor *escribe* Libro → **N:N** (un autor escribe varios libros; un libro puede tener varios autores)
- Libro *participa en* Préstamo → **1:N** (un libro puede tener muchos préstamos en el tiempo)
- Socio *realiza* Préstamo → **1:N**

---

## Solución 2 — Cardinalidad
1) Autor — Libro → **N:N**  
2) Libro — Préstamo → **1:N**  
3) Socio — Préstamo → **1:N**

> Regla: si ambos lados “pueden ser muchos”, es N:N.

---

## Solución 3 — Tabla intermedia (Cursos)
Relación: **N:N**  
Tabla intermedia sugerida: `inscripcion`

Campos:
- estudiante_id (FK → estudiante)
- curso_id (FK → curso)
- fecha_inscripcion (opcional)

PK:
- (estudiante_id, curso_id)

> ¿Qué evita? Repetir el mismo estudiante en el mismo curso.

---

## Solución 4 — Normalización 1FN (Reseñas)
Grupo repetitivo:
- `genero` contiene lista separada por coma.

Tablas sugeridas:
- pelicula(pelicula_id, titulo)
- genero(genero_id, nombre)
- pelicula_genero(pelicula_id, genero_id)  ← tabla intermedia N:N
- resena(resena_id, pelicula_id, usuario_email, comentario)

---

## Solución 5 — 2FN y 3FN (detalle_inscripcion)
PK compuesta: (estudiante_id, curso_id)

Violación 2FN:
- estudiante_nombre depende solo de estudiante_id
- curso_nombre y curso_valor dependen solo de curso_id

Tablas en 2FN:
- estudiante(estudiante_id, estudiante_nombre)
- curso(curso_id, curso_nombre, curso_valor)
- inscripcion(estudiante_id, curso_id)

3FN:
- Si “curso_valor” depende de “curso_nombre” (no debería), sería transitive.
- Ideal: todo depende de la PK de su tabla (curso_id).

---

## Solución 6 — Bonus SQL
Ver `03-sql/01_modelo_fisico.sql` (ejemplo completo con PK/FK).
