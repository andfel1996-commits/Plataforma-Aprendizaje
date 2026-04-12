# AE4 — Sentencias para la definición de tablas (DDL) — MySQL/MariaDB

Material de apoyo para **Clase de Base de Datos**.

En esta clase nos enfocamos en **DDL (Data Definition Language)**: crear, modificar y eliminar **estructuras** (tablas y sus restricciones).
> Importante: **DDL NO modifica datos fila a fila** (eso es DML: INSERT/UPDATE/DELETE). DDL modifica la *estructura*.

## Aprendizajes esperados (resumen)
Al finalizar, podrás:
- Identificar y usar sentencias DDL: **CREATE, ALTER, DROP, TRUNCATE, RENAME, COMMENT**.
- Elegir **tipos de datos** adecuados (INT, DECIMAL, VARCHAR, DATE/DATETIME, BOOLEAN, ENUM, JSON).
- Definir **PRIMARY KEY** y **FOREIGN KEY** (integridad referencial).
- Aplicar restricciones: **NOT NULL**, **DEFAULT**, **UNIQUE**, (y CHECK cuando aplique).
- Modificar tablas con **ALTER TABLE** (agregar/quitar columnas, cambiar tipos, restricciones).
- Eliminar o vaciar tablas de forma segura (**DROP vs TRUNCATE**).

---

## Estructura del material

- `guia/01_paso_a_paso_clase.md` → Guion de clase (paso a paso, con tiempos y checkpoints).
- `guia/02_ejercicios_practica.md` → Ejercicios para practicar DDL.
- `guia/03_soluciones.md` → Soluciones explicadas.
- `sql/` → Scripts SQL **ultra comentados** (lista sugerida abajo).

### Scripts (orden recomendado)
1. `sql/00_setup_bd.sql`  
2. `sql/01_create_basico.sql`  
3. `sql/02_create_relaciones_pk_fk.sql`  
4. `sql/03_alter_table_modo_taller.sql`  
5. `sql/04_drop_truncate_rename_comment.sql`  
6. `sql/05_reto_practico.sql` (para que el alumno complete)  
7. `sql/06_reto_practico_soluciones.sql`

---

## Cómo ejecutar (DBeaver / MySQL Workbench / phpMyAdmin)

1) Abre el archivo `sql/00_setup_bd.sql` y ejecútalo.  
2) Ejecuta en orden los demás scripts.  
3) En cada bloque, **lee los comentarios**: te dicen *qué mirar* y *qué error evitar*.

> Si tu profesor usa **MariaDB**, algunas características como `CHECK` pueden comportarse distinto según versión.
> En el material se indica dónde podría variar.

---

## Mini-glosario rápido
- **Esquema/BD**: contenedor de tablas.
- **Tabla**: colección de filas (registros).
- **Columna**: atributo (tipo de dato + restricciones).
- **Restricción (constraint)**: regla que protege la integridad (PK, FK, NOT NULL, UNIQUE, DEFAULT, etc.).




| Motor               | ¿Qué significa `COLLATE` aquí?                                                                                                                                | Ejemplo equivalente a “Unicode + no distingue mayúsculas”                                                                                 | ¿Existe `unicode_ci` vs `general_ci`?                        | Notas prácticas (búsqueda/orden)                                                                                                                                                                                                                                   |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **MySQL / MariaDB** | Define **reglas de comparación y orden** para columnas/textos (además del `CHARACTER SET`).                                                                   | `utf8mb4_unicode_ci` (o en MySQL 8: `utf8mb4_0900_ai_ci`)                                                                                 | **Sí** (p. ej. `utf8mb4_unicode_ci` vs `utf8mb4_general_ci`) | `_ci` = *case-insensitive* (no distingue mayúsculas). `unicode_ci` suele ser **más correcto** para idiomas (tildes/ñ/ligaduras) pero históricamente algo más lento; `general_ci` suele ser **más rápido** pero menos preciso en reglas lingüísticas.               |
| **SQL Server**      | `COLLATE` define **comparación/orden** y también puede afectar el comportamiento de acentos y ancho.                                                          | Ej.: `Latin1_General_CI_AI` (CI = no distingue mayúsculas, AI = no distingue acentos) o `Modern_Spanish_CI_AI`                            | **No con esos nombres**                                      | SQL Server usa nombres de collation distintos (no existe `utf8mb4_*`). Puedes fijar collation a nivel de **BD**, **columna** o en una consulta con `COLLATE`. Importante: `CI/CS` y `AI/AS` cambian muchísimo resultados de búsquedas y `ORDER BY`.                |
| **PostgreSQL**      | La collation depende del proveedor (OS/libc o ICU). Controla **orden** y a veces comparaciones; el “case-insensitive” no viene como `_ci` estándar en nombre. | Suele hacerse con **ICU collations** (ej. “und-u-ks-level2” o similares) **o** usando extensiones/funciones: `ILIKE`, `LOWER()`, `citext` | **No**                                                       | Postgres no tiene `unicode_ci/general_ci`. Para búsquedas sin distinguir mayúsculas: `ILIKE` o `citext`. Para acentos: normalmente se usa `unaccent`. El orden “lingüístico” real suele requerir ICU y configuración.                                              |
| **Oracle**          | Oracle maneja orden/comparación con **NLS settings** (no se llama siempre `COLLATE` como en MySQL).                                                           | Se logra con `NLS_SORT` + `NLS_COMP` (p. ej. sort lingüístico y comparación lingüística)                                                  | **No**                                                       | Oracle usa `NLS_SORT` (orden) y `NLS_COMP` (cómo compara). Para “case-insensitive / accent-insensitive” se suele configurar sesión o usar comparaciones lingüísticas. En Unicode, el charset típico es `AL32UTF8` (concepto equivalente a “utf8mb4” en capacidad). |


| Comparación             | `utf8mb4_general_ci`                                                     | `utf8mb4_unicode_ci`                                                          |
| ----------------------- | ------------------------------------------------------------------------ | ----------------------------------------------------------------------------- |
| Precisión lingüística   | Más “simple” (reglas menos completas)                                    | Más “correcta” para muchos idiomas (reglas Unicode)                           |
| Rendimiento (histórico) | Suele ser algo más rápido                                                | Puede ser algo más lento (depende de versión/índices/datos)                   |
| Acentos / equivalencias | Puede comportarse “raro” en casos específicos                            | Maneja mejor equivalencias y ordenación multilenguaje                         |
| Recomendación típica    | Proyectos antiguos o casos donde importa velocidad y el idioma es simple | Proyectos generales en español/multilenguaje, mejor calidad de orden/búsqueda |


