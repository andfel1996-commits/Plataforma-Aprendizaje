# 02 — Ejercicios prácticos (sin spoilers) — Integridad referencial + Transacciones

> Recomendación: abre 2 pestañas en tu cliente SQL:
> - una para ejecutar
> - otra para ir haciendo `SELECT` y “ver” el estado actual

---

## A. Integridad referencial (FOREIGN KEY)

### 1) Identificar padre e hija
1. En la BD `alke_wallet_ri`, lista las tablas.
2. Identifica:
   - cuál es la tabla **padre**
   - cuáles son las 3 tablas **hijas**
3. Para cada tabla hija, escribe en una frase:
   - “Esta tabla tiene una FK que apunta a …”

---

### 2) Caso RESTRICT: ¿por qué no me deja borrar?
1. Haz un `SELECT` para ver los usuarios.
2. Haz un `SELECT` en `transacciones_restrict` para ver qué filas apuntan al usuario con `user_id = 1`.
3. Intenta borrar el usuario `user_id = 1`.
4. Responde:
   - ¿qué error te aparece?
   - ¿qué significa en tus palabras?

---

### 3) Borrado manual correcto (hijos → padre)
Sin cambiar constraints:
1. Dentro de una **transacción** (`START TRANSACTION`), elimina primero las transacciones del usuario `user_id = 1` en `transacciones_restrict`.
2. Luego borra el usuario.
3. Verifica con `SELECT`.
4. Si todo quedó bien, haz `COMMIT`.

---

### 4) Caso CASCADE: borrar padre y observar el efecto
1. Haz un `SELECT` para ver las filas en `transacciones_cascade`.
2. Borra el usuario `user_id = 2`.
3. Verifica qué pasó con las transacciones del usuario 2.
4. Explica: ¿por qué aquí sí deja borrar?

---

### 5) Caso SET NULL: borrar padre y observar el efecto
1. Haz un `SELECT` para ver las filas en `transacciones_setnull`.
2. Borra el usuario `user_id = 3`.
3. Verifica qué pasó con `emisor_id` y/o `receptor_id` en la tabla hija.
4. Explica: ¿qué ventaja tiene SET NULL? ¿qué desventaja puede tener?

---

## B. Transacciones (START TRANSACTION / COMMIT / ROLLBACK)

### 6) Transferencia correcta (todo o nada)
Objetivo: simular una transferencia de saldo entre 2 usuarios.

1. Verifica los saldos actuales de los usuarios 4 y 5.
2. Inicia una transacción.
3. Resta saldo al emisor y suma al receptor.
4. Inserta un registro en `movimientos`.
5. Verifica con `SELECT`.
6. Confirma con `COMMIT`.

---

### 7) Transferencia con error controlado (debe hacer ROLLBACK)
Objetivo: provocar un error dentro de la transacción y volver atrás.

1. Verifica los saldos actuales de los usuarios 4 y 5.
2. Inicia una transacción.
3. Intenta insertar en `movimientos` un `emisor_id` que **no exista** (por ejemplo, 9999).
4. Observa el error.
5. Ejecuta `ROLLBACK`.
6. Verifica que los saldos NO cambiaron.

---

### 8) Pregunta de reflexión (corta)
Responde con 3-5 líneas:
- ¿Por qué una transferencia de dinero debe ser una transacción?
- ¿Qué problema evita ROLLBACK?

