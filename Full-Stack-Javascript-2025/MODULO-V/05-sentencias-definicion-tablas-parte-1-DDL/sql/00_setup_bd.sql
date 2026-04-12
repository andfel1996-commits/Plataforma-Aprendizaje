-- =========================================================
-- 00_setup_bd.sql
-- ---------------------------------------------------------
-- Objetivo:
--   1) Crear una base de datos para la clase (si no existe)
--   2) Seleccionarla con USE
--
-- Motor: MySQL / MariaDB
-- =========================================================

/* 
  TIP DOCENTE:
  - Si estás en un entorno compartido, cambia el nombre de la BD para evitar choques.
  - En DBeaver puedes ejecutar por bloques (seleccionando) o todo el script completo.
*/

DROP DATABASE IF EXISTS ddl_clase05;
CREATE DATABASE ddl_clase05
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE ddl_clase05;

-- Verificación rápida: ¿en qué BD estoy?
SELECT DATABASE() AS base_actual;

-- Debería devolver: ddl_clase05
