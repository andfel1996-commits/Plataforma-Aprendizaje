# 03 — Soluciones (para el docente / autoevaluación)

## Ejercicio 1 — Inventario (CREATE + INSERT)
```sql
CREATE TABLE inventario (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre_producto VARCHAR(100) NOT NULL,
  precio DECIMAL(10,2) NOT NULL,
  cantidad_disponible INT NOT NULL
);

INSERT INTO inventario (nombre_producto, precio, cantidad_disponible)
VALUES
  ('Laptop HP', 900000.00, 15),
  ('Mouse inalámbrico', 12990.00, 40),
  ('Teclado mecánico', 45990.00, 20);

INSERT INTO inventario (nombre_producto, precio, cantidad_disponible)
VALUES
  ('Monitor 24"', 149990.00, 12),
  ('Hub USB-C', 19990.00, 30);

SELECT * FROM inventario;
```

---

## Ejercicio 2 — DELETE seguro (Usuarios antiguos)
```sql
-- 1) Ver qué se va a borrar
SELECT user_id, nombre, created_at
FROM usuarios
WHERE created_at < '2020-01-01';

-- 2) Borrar
DELETE FROM usuarios
WHERE created_at < '2020-01-01';

-- 3) Verificar
SELECT * FROM usuarios;
```

---

## Ejercicio 3 — UPDATE con condiciones (Transacciones)
```sql
-- 1) Verificar
SELECT transaction_id, valor
FROM transacciones
WHERE valor < 50000;

-- 2) Actualizar
UPDATE transacciones
SET valor = valor * 1.15
WHERE valor < 50000;

-- 3) Verificar
SELECT * FROM transacciones;
```

---

## Ejercicio 4 — Integral Empleados
```sql
CREATE TABLE empleados (
  id_empleado INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(60) NOT NULL,
  apellido VARCHAR(60) NOT NULL,
  salario INT NOT NULL,
  fecha_ingreso DATE NOT NULL,
  departamento VARCHAR(60) NOT NULL
);

-- A) Alta masiva (ejemplo)
INSERT INTO empleados (nombre, apellido, salario, fecha_ingreso, departamento)
VALUES
  ('Lucía', 'Pérez', 85000, '2024-02-01', 'IT'),
  ('Tomás', 'Gómez', 78000, '2021-08-15', 'RRHH'),
  ('Valentina', 'Rojas', 92000, '2019-03-20', 'Finanzas'),
  ('Mateo', 'Díaz', 65000, '2022-11-10', 'Marketing'),
  ('Sofía', 'Ruiz', 68000, '2025-01-10', 'Marketing');

SELECT * FROM empleados;

-- B1) Aumenta 7% a quienes ganen < 80000
UPDATE empleados
SET salario = ROUND(salario * 1.07)
WHERE salario < 80000;

SELECT * FROM empleados;

-- B2) Suma 5000 fijo a quienes tengan > 3 años
-- Nota: TIMESTAMPDIFF(YEAR, fecha_ingreso, CURDATE()) calcula años completos de antigüedad.
UPDATE empleados
SET salario = salario + 5000
WHERE TIMESTAMPDIFF(YEAR, fecha_ingreso, CURDATE()) > 3;

SELECT * FROM empleados;

-- B3) Cambiar a Sofía Ruiz a Ventas
UPDATE empleados
SET departamento = 'Ventas'
WHERE nombre = 'Sofía' AND apellido = 'Ruiz';

SELECT * FROM empleados;

-- C) Eliminar RRHH
DELETE FROM empleados
WHERE departamento = 'RRHH';

SELECT * FROM empleados;
```

---

## Desafío — Transacción con ROLLBACK
```sql
SELECT @@autocommit;

SET autocommit = 0;

INSERT INTO usuarios (nombre, correo, contrasena, saldo)
VALUES ('Usuario Prueba', 'prueba@demo.com', '1234', 1000);

UPDATE usuarios
SET saldo = saldo + 9000
WHERE correo = 'prueba@demo.com';

-- Verifico antes de decidir
SELECT * FROM usuarios WHERE correo = 'prueba@demo.com';

-- Me arrepiento
ROLLBACK;

-- Verifico que no quedó (dependiendo del cliente, puede que veas 0 filas)
SELECT * FROM usuarios WHERE correo = 'prueba@demo.com';

-- Devuelvo autocommit por seguridad
SET autocommit = 1;
```
