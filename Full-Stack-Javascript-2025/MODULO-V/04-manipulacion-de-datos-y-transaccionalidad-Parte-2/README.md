# AE3 — Sentencias para la manipulación de datos y transaccionalidad (Parte II) — MySQL

Material de apoyo para **Clase 4 de Base de Datos (MySQL)**.

Esta Parte II refuerza 2 temas que generan muchos errores en práctica:
1) **Integridad referencial**: qué pasa cuando intentas borrar/actualizar una fila **padre** que tiene filas **hijas**.
2) **Transacciones**: cómo agrupar varias sentencias para que se guarden **todas o ninguna**.

> Consejo docente: en MySQL, para que las FOREIGN KEY funcionen, usa motor **InnoDB**.

---

## Objetivos de aprendizaje (según manual)
- Insertar, actualizar y borrar datos **con integridad referencial**.
- Comprender acciones típicas en claves foráneas: **RESTRICT / CASCADE / SET NULL**.
- Comprender qué es una **transacción** y por qué es importante.
- Aplicar **START TRANSACTION / COMMIT / ROLLBACK** en escenarios reales.

---

## Estructura del material
- `guia/01_paso_a_paso_clase.md` → clase guiada, paso a paso (con explicación).
- `guia/02_ejercicios_practica.md` → ejercicios para estudiantes (sin spoilers).
- `guia/03_soluciones.md` → soluciones.
- `sql/00_setup_bd_parte2.sql` → base + tablas para integridad referencial.
- `sql/01_datos_demo.sql` → datos iniciales (para practicar).
- `sql/02_integridad_referencial_RESTRICT.sql` → caso: NO deja borrar padre.
- `sql/03_integridad_referencial_CASCADE.sql` → caso: borra en cascada.
- `sql/04_integridad_referencial_SET_NULL.sql` → caso: al borrar padre, deja NULL.
- `sql/05_transaccion_transferencia_ok.sql` → transferencia correcta (COMMIT).
- `sql/06_transaccion_transferencia_error.sql` → transferencia con error (ROLLBACK).

---

## Cómo usarlo (rápido)
1) Ejecuta `sql/00_setup_bd_parte2.sql`
2) Ejecuta `sql/01_datos_demo.sql`
3) Practica integridad referencial:
   - `sql/02_integridad_referencial_RESTRICT.sql`
   - `sql/03_integridad_referencial_CASCADE.sql`
   - `sql/04_integridad_referencial_SET_NULL.sql`
4) Practica transacciones:
   - `sql/05_transaccion_transferencia_ok.sql`
   - `sql/06_transaccion_transferencia_error.sql`

---

## Mini “mapa mental” (para estudiantes)
- **Padre**: tabla que tiene la **PRIMARY KEY**.
- **Hija**: tabla que tiene la **FOREIGN KEY**.
- Si existe una fila hija que apunta a una fila padre, MySQL protege la relación:
  - **RESTRICT** (o NO ACTION): *no deja* borrar el padre.
  - **CASCADE**: si borras el padre, borra automáticamente las hijas.
  - **SET NULL**: si borras el padre, deja la FK de la hija en NULL (si la columna lo permite).

---

## Requisitos
- MySQL 8+ (recomendado).
- MySQL Workbench / DBeaver / phpMyAdmin.

