# Crear base de datos y tabla

```sql

    CREATE DATABASE admintareas;

    CREATE TABLE tareas(
        id SERIAL,
        titulo VARCHAR(250),
        descripcion VARCHAR(250)
    );

```