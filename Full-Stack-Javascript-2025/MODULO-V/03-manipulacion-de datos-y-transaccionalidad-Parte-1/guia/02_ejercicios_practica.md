# 02 — Ejercicios de práctica (para estudiantes)

**Regla de oro**: antes de UPDATE/DELETE, ejecuta un **SELECT** para verificar qué filas se afectarán.

> Trabajen en la BD `alke_wallet` (archivos de setup en /sql).

---

## Ejercicio 1 — INSERT + AUTO_INCREMENT (Inventario) (25 min)
Crea una tabla `inventario` con:
- `id` (PK AUTO_INCREMENT)
- `nombre_producto` (VARCHAR(100))
- `precio` (DECIMAL(10,2))
- `cantidad_disponible` (INT)

### Tareas
1. Crear la tabla.
2. Insertar **3 productos** (sin escribir el id).
3. Insertar **2 productos más en un solo INSERT** (múltiples VALUES).
4. Verificar con `SELECT * FROM inventario;`
5. Reflexión: ¿por qué AUTO_INCREMENT ayuda en escenarios reales?

---

## Ejercicio 2 — DELETE seguro (Usuarios antiguos) (20 min)
Usa la tabla `usuarios`.

### Tareas
1. Mostrar todos los usuarios: `SELECT * FROM usuarios;`
2. Eliminar usuarios creados antes del **2020-01-01**.
3. Volver a listar usuarios para comprobar cambios.

> Ojo: primero SELECT con la condición, luego DELETE.

---

## Ejercicio 3 — UPDATE con condiciones (20 min)
Usa la tabla `transacciones`.

### Tareas
1. Aumenta en **15%** el valor de transacciones cuyo `valor < 50000`.
2. Muestra todas las transacciones luego del cambio.

---

## Ejercicio 4 — Integral (INSERT + UPDATE + DELETE) (30 min)
Crea una tabla `empleados` con:
- `id_empleado` (PK AUTO_INCREMENT)
- `nombre`, `apellido` (VARCHAR)
- `salario` (INT o DECIMAL)
- `fecha_ingreso` (DATE)
- `departamento` (VARCHAR)

### Tareas
A) **Alta masiva (INSERT)**  
Inserta 5 empleados (pueden usar los nombres sugeridos en la consigna de la clase).

B) **Ajustes (UPDATE)**  
- Aumenta 7% a quienes ganen `< 80000`.
- Suma 5000 fijo a quienes tengan **> 3 años** de antigüedad.
- Cambia el departamento de una persona específica (ej.: Sofía Ruiz → Ventas).

C) **Depuración (DELETE)**  
- Elimina a todos los empleados del departamento `RRHH`.

D) **Verificación**  
- Después de cada bloque, ejecutar: `SELECT * FROM empleados;`

---

## Desafío (opcional) — Transacción con ROLLBACK (10 min)
1. Apaga autocommit.
2. Inserta un usuario nuevo.
3. Actualiza su saldo.
4. Haz `ROLLBACK`.
5. Comprueba con SELECT que el usuario NO quedó guardado (o que el cambio se deshizo).
