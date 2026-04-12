# Guion docente (4 horas)
**Tema:** Modelación y Normalización de datos (Parte I + II)  
**Nivel:** Principiantes  
**Duración:** 240 min (incluye break 15 min)

---

## 0) Apertura (10 min)
**Objetivo:** activar conocimientos previos y alinear expectativas.

**Qué decir (literal):**
- “Hoy vamos a aprender a pasar desde una idea (un problema real) hasta tablas SQL correctas.”
- “Y lo más importante: cómo evitar tablas repetidas o con datos duplicados usando normalización.”

**Checklist rápido:**
- ¿Qué es una *entidad*? (ej: Cliente)
- ¿Qué es un *atributo*? (ej: nombre, rut)
- ¿Qué es una *relación*? (ej: Cliente *tiene* Cuenta)

---

## 1) Modelo Conceptual (Parte I) (35 min)
**Meta:** reconocer entidades, atributos y relaciones.

### 1.1 Actividad guiada (pizarra) (20 min)
Caso: **Tienda de productos**
- Entidades iniciales: Cliente, Producto, Compra
- Atributos: Cliente(rut, nombre, email), Producto(sku, nombre, precio), Compra(fecha)

**Proyecta:** `assets/img/parteI_modelo_conceptual.png`

**Preguntas a la clase (rápidas):**
- “¿Cliente tiene muchos Productos? ¿o compra muchos Productos?”
- “¿Compra es una entidad o una relación?”

### 1.2 Checkpoint (5 min)
- Si el alumno confunde *atributo* con *entidad*, vuelve al ejemplo:  
  “¿‘nombre’ puede existir solo? No: pertenece a Cliente.”

### 1.3 Mini-ejercicio (10 min)
En duplas:
- Identificar **3 entidades** y **2 atributos por entidad** de un “Sistema de biblioteca”.

---

## 2) Cardinalidad (Parte I) (35 min)
**Meta:** entender 1:1, 1:N, N:N.

**Proyecta:**  
- `assets/img/parteI_cardinalidad.png`  
- `assets/img/parteI_cardinalidad_ejemplo.png`

### 2.1 Dinámica de pulgar (10 min)
Docente pregunta, estudiantes responden con dedos:
- 1 dedo = 1:1
- 2 dedos = 1:N
- 3 dedos = N:N

Ejemplos:
- Persona ↔ Rut (1:1)
- Cliente ↔ Cuenta (1:N)
- Producto ↔ Compra (N:N)

### 2.2 Regla clave (para repetir)
> “Si es N:N en modelo lógico, casi siempre terminará como **tabla intermedia** en modelo físico.”

---

## 3) Entidad fuerte vs débil + claves (Parte I) (25 min)
**Meta:** definir PK y comprender cuándo depende de otra entidad.

**Proyecta:** `assets/img/parteI_entidad_fuerte_debil.png`

Explica:
- **Entidad fuerte:** tiene PK propia (Cliente(cliente_id))
- **Entidad débil:** depende de otra (DetalleCompra depende de Compra)

**Checkpoint:**
- Si un alumno propone PK = “nombre”, detener y explicar:
  - nombres se repiten → mala PK

---

## 4) BREAK (15 min)

---

## 5) Modelo Físico + Caso N:N (Parte II) (45 min)
**Meta:** bajar el lógico a tablas con PK/FK.

**Proyecta:** `assets/img/parteII_modelo_fisico.png`

### 5.1 Caso N:N (25 min)
**Proyecta:** `assets/img/parteII_caso_NaN.png`

Ejemplo:
- Usuario ↔ Proyecto (N:N)
Se crea:
- tabla `usuario_proyecto` con:
  - usuario_id (FK)
  - proyecto_id (FK)
  - PK compuesta (usuario_id, proyecto_id)

**Ejecuta (si hay DB):**
- `03-sql/01_modelo_fisico.sql`

### 5.2 Checkpoint (10 min)
Preguntar:
- “¿Qué evita la PK compuesta?”
Respuesta esperada:
- “Que se repita el mismo usuario en el mismo proyecto dos veces.”

---

## 6) Normalización (Parte II) (60 min)
**Meta:** aplicar 1FN, 2FN, 3FN a un caso (Factura).

**Proyecta:**
- `assets/img/parteII_normalizacion_intro.png`
- `assets/img/parteII_1FN_factura.png`
- `assets/img/parteII_2FN_3FN.png`

### 6.1 Regla de oro (para principiantes)
- **1FN:** sin grupos repetitivos (sin “lista” dentro de una celda)
- **2FN:** nada depende solo de una parte de una PK compuesta
- **3FN:** nada depende de algo que no sea la PK (dependencias transitivas)

### 6.2 Taller guiado (35 min)
Caso: Factura hospital
- Identifica grupo repetitivo: múltiples prestaciones/medicamentos
- Separar en Factura y DetalleFactura

(Usa `03-sql/02_normalizacion_factura.sql` como referencia si hacen práctica)

### 6.3 Mini quiz (10 min)
Verdadero/Falso:
- “Si una columna contiene ‘A, B, C’ separados por coma, cumple 1FN.” → FALSO
- “N:N se resuelve con tabla intermedia.” → VERDADERO

---

## 7) Actividad final (40 min)
**Entrega rápida (individual o parejas):**
Modelar un “Sistema de cursos”:
- Estudiante, Curso, Inscripción
- Cardinalidades
- Tabla intermedia si aplica
- Propuesta de tablas (modelo físico)

Los estudiantes completan `01-ejercicios-alumno/ejercicios-clase.md`.

---

## 8) Cierre (10 min)
**Qué decir (literal):**
- “Si tú puedes explicar por qué creaste una tabla intermedia, ya entendiste N:N.”
- “Si puedes detectar un grupo repetitivo, ya estás listo para normalización.”

**Salida con ticket (1 minuto):**
- Escribe en el chat:  
  1) una relación 1:N  
  2) una relación N:N
