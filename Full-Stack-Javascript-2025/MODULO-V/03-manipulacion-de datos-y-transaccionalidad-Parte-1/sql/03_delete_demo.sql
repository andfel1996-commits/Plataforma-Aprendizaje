-- 03_delete_demo.sql
USE alke_wallet;

-- PATRÓN SEGURO: SELECT -> DELETE

-- 1) Revisar qué usuarios se borrarían (ejemplo: antes del 2020-01-01)
SELECT user_id, nombre, created_at
FROM usuarios
WHERE created_at < '2020-01-01';

-- 2) Borrar SOLO esos usuarios
DELETE FROM usuarios
WHERE created_at < '2020-01-01';

-- 3) Verificar resultado
SELECT * FROM usuarios;

-- Nota:
-- Si tuvieras transacciones asociadas a esos usuarios,
-- MySQL podría impedir el borrado por la FK (depende del caso).
-- Para este demo, los usuarios viejos NO participan en transacciones posteriores.
