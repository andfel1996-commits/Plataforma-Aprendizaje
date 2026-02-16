# Consultas SQL (hiper comentadas) — Tienda en línea (MySQL)

Este documento contiene **todas las consultas solicitadas**, explicadas paso a paso, usando el modelo:

## Modelo (tablas y campos)

### `Clientes`
- `id_cliente` (PK)
- `nombre`
- `email`
- `pais`

### `Productos`
- `id_producto` (PK)
- `nombre`
- `categoria`
- `precio`

### `Ordenes`
- `id_orden` (PK)
- `fecha`
- `id_cliente` (FK → `Clientes.id_cliente`)

### `DetalleOrden`
- `id_detalle` (PK, auto incremental)
- `id_orden` (FK → `Ordenes.id_orden`)
- `id_producto` (FK → `Productos.id_producto`)
- `cantidad`
- `precio_unitario`

> **Nota importante sobre el modelo**:  
> - El total vendido (en dinero) se calcula desde `DetalleOrden` con `cantidad * precio_unitario`.  
> - Usamos alias (apodos) para tablas, por ejemplo `Clientes c`, `Ordenes o`, etc.

---

## Conceptos clave (para entender todas las consultas)

### 1) Alias (apodos de tablas)
Ejemplo:
```sql
FROM Clientes c
```
Significa: “voy a referirme a la tabla `Clientes` con el nombre corto `c`”.

- **¿Por qué existe `c.nombre`?**  
  Porque `c` representa a la tabla `Clientes`, y `Clientes` tiene una columna llamada `nombre`.  
  Entonces `c.nombre` se lee como: **“la columna nombre de Clientes”**.

---

### 2) DISTINCT (eliminar duplicados)
Cuando haces un `JOIN`, es común que un cliente aparezca repetido si tiene varias órdenes.

- `DISTINCT` elimina filas repetidas en el resultado.

Ejemplo:
```sql
SELECT DISTINCT c.nombre
```
Devuelve cada nombre **una sola vez**, aunque haya muchas órdenes.

---

### 3) JOIN (unir tablas relacionadas)
Ejemplo típico:
```sql
JOIN Clientes c ON c.id_cliente = o.id_cliente
```
Une filas de `Ordenes` con `Clientes` cuando coinciden los IDs (la relación FK).

---

### 4) GROUP BY + SUM (agrupar y sumar)
Para calcular totales por producto o por cliente:

- `GROUP BY` agrupa por una columna (por ejemplo, producto).
- `SUM(...)` suma valores dentro de cada grupo.

---

### 5) ORDER BY + DESC
- `ORDER BY total DESC` ordena de **mayor a menor**.
- `ASC` es de menor a mayor (por defecto).

---

# Título: Caso de estudio: Tienda en línea 
[ Descargar la Base de datos ](db/negocio_enunciado.sql)
## Contenido:
    - Tablas principales: Clientes, Productos, Órdenes, DetalleOrden
    - Relaciones:
        - Órdenes.id_cliente → Clientes.id_cliente
        - DetalleOrden.id_orden → Órdenes.id_orden
        - DetalleOrden.id_producto → Productos.id_producto
    - Objetivo: aplicar consultas SQL a un modelo realista

# Realizar las siguientes tareas :
1. Recupera todos los registros de la tabla Clientes.
2. Recupera el nombre y precio de los productos con precio mayor a 100.
3. Recupera los nombres de los clientes que realizaron órdenes en el año 2024.
4. Recupera el producto más caro de la tabla Productos.
5. Recupera el número total de órdenes realizadas en la base.
6. Recupera el nombre del producto y el total vendido de la categoría "Electrónica", ordenados de mayor a menor venta.
7. Obtener el nombre, email y país de todos los clientes registrados.
8. Obtener el nombre y categoría de los productos con precio mayor a 100.
9. Obtener el nombre del cliente y el ID de la orden que realizaron en un año indicado (por ejemplo, 2024), usando la fecha de la tabla Ordenes.
10. Recuperar el nombre y país de los clientes que hayan realizado al menos una orden en 2024.
11. Obtener los nombres de los productos y la suma total vendida (cantidad × precio).
12. Listar el nombre del cliente y el monto total comprado, ordenados de mayor a menor.
13. Obtener el nombre del producto más caro de la categoría "Electrónica".
14. Contar cuántos clientes distintos hicieron compras en cada país.

