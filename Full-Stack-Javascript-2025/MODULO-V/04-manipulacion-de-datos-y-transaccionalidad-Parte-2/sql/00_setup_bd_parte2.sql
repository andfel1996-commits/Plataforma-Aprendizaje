/*
  00_setup_bd_parte2.sql
  ----------------------
  Objetivo: preparar una base de datos pequeña para practicar:
  - Integridad referencial (FOREIGN KEY)
  - Acciones ON DELETE: RESTRICT / CASCADE / SET NULL
  - Transacciones (START TRANSACTION / COMMIT / ROLLBACK)

  Probado en: MySQL 8+ (motor InnoDB)

  IMPORTANTE:
  - Si estás en phpMyAdmin, ejecuta el archivo completo.
  - Si ya existe la BD, se elimina para partir “limpio” (solo para entorno local de aprendizaje).

  CONCEPTOS CLAVE (para explicar en clase)
  ----------------------------------------
  1) ENGINE=InnoDB
     - Define el motor de almacenamiento de la tabla.
     - InnoDB permite:
       - Claves foráneas (FOREIGN KEY) para integridad referencial
       - Transacciones (BEGIN/COMMIT/ROLLBACK)
     - Si no usas InnoDB, las FOREIGN KEY pueden no funcionar.

  2) FOREIGN KEY (...) REFERENCES ...
     - Crea la relación PADRE → HIJA.
     - Obliga a que el valor en la columna hija exista en la PK de la tabla padre.
     - Evita “registros huérfanos” (hijas apuntando a un padre inexistente).

  3) ON UPDATE CASCADE
     - Si cambia la PK del padre (ej: usuarios.user_id),
       automáticamente actualiza las FK relacionadas en la tabla hija.
     - Mantiene la integridad sin tener que actualizar a mano todas las tablas.
     - Nota práctica: normalmente no se cambia un AUTO_INCREMENT, pero se enseña
       para entender el comportamiento de CASCADE.

  4) ON DELETE RESTRICT
     - Si intentas borrar un registro padre que tiene hijos asociados,
       MySQL BLOQUEA el DELETE.
     - Objetivo: impedir que queden filas hijas apuntando a un padre que ya no existe
       (transacciones “huérfanas”).

  5) ON DELETE CASCADE
     - Si borras el padre, se borran automáticamente todos los hijos relacionados.
     - Útil cuando el hijo “no tiene sentido” sin el padre.
     - Riesgo: puede borrar muchos registros si no se controla.

  6) ON DELETE SET NULL
     - Si borras el padre, la FK en el hijo queda en NULL.
     - Útil cuando quieres mantener historial en la tabla hija, pero sin el vínculo.
     - Requisito: la columna FK debe permitir NULL (por eso emisor_id/receptor_id son NULL).
*/

DROP DATABASE IF EXISTS alke_wallet_ri;
CREATE DATABASE alke_wallet_ri CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE alke_wallet_ri;

/*
  Tabla PADRE: usuarios
  - user_id: PRIMARY KEY
  - saldo: DECIMAL para evitar errores de punto flotante
*/
CREATE TABLE usuarios (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(80) NOT NULL,
  correo VARCHAR(120) NOT NULL UNIQUE,
  saldo DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

/*
  Caso 1: tabla HIJA con RESTRICT
  - ¿Qué queremos enseñar?
    Si un usuario tiene transacciones, NO se puede borrar.
*/
CREATE TABLE transacciones_restrict (
  trx_id INT AUTO_INCREMENT PRIMARY KEY,
  emisor_id INT NOT NULL,
  receptor_id INT NOT NULL,
  monto DECIMAL(12,2) NOT NULL,
  comentario VARCHAR(255) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT fk_trx_r_emisor
    FOREIGN KEY (emisor_id) REFERENCES usuarios(user_id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,

  CONSTRAINT fk_trx_r_receptor
    FOREIGN KEY (receptor_id) REFERENCES usuarios(user_id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
) ENGINE=InnoDB;

/*
  Caso 2: tabla HIJA con CASCADE
  - ¿Qué queremos enseñar?
    Si borras el usuario, se borran sus transacciones automáticamente.
  - ¡Ojo! En sistemas reales puede ser peligroso si no se controla.
*/
CREATE TABLE transacciones_cascade (
  trx_id INT AUTO_INCREMENT PRIMARY KEY,
  emisor_id INT NOT NULL,
  receptor_id INT NOT NULL,
  monto DECIMAL(12,2) NOT NULL,
  comentario VARCHAR(255) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT fk_trx_c_emisor
    FOREIGN KEY (emisor_id) REFERENCES usuarios(user_id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,

  CONSTRAINT fk_trx_c_receptor
    FOREIGN KEY (receptor_id) REFERENCES usuarios(user_id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
) ENGINE=InnoDB;

/*
  Caso 3: tabla HIJA con SET NULL
  - ¿Qué queremos enseñar?
    Si borras el usuario, la FK queda en NULL (queda “huérfana controlada”).
  - Requisito: la columna debe permitir NULL.
*/
CREATE TABLE transacciones_setnull (
  trx_id INT AUTO_INCREMENT PRIMARY KEY,
  emisor_id INT NULL,
  receptor_id INT NULL,
  monto DECIMAL(12,2) NOT NULL,
  comentario VARCHAR(255) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT fk_trx_n_emisor
    FOREIGN KEY (emisor_id) REFERENCES usuarios(user_id)
    ON UPDATE CASCADE
    ON DELETE SET NULL,

  CONSTRAINT fk_trx_n_receptor
    FOREIGN KEY (receptor_id) REFERENCES usuarios(user_id)
    ON UPDATE CASCADE
    ON DELETE SET NULL
) ENGINE=InnoDB;

/*
  EXTRA (para transacciones de transferencia):
  Un índice ayuda cuando buscas por emisor/receptor.
*/
CREATE INDEX idx_trx_r_emisor ON transacciones_restrict (emisor_id);
CREATE INDEX idx_trx_r_receptor ON transacciones_restrict (receptor_id);

CREATE INDEX idx_trx_c_emisor ON transacciones_cascade (emisor_id);
CREATE INDEX idx_trx_c_receptor ON transacciones_cascade (receptor_id);

CREATE INDEX idx_trx_n_emisor ON transacciones_setnull (emisor_id);
CREATE INDEX idx_trx_n_receptor ON transacciones_setnull (receptor_id);
