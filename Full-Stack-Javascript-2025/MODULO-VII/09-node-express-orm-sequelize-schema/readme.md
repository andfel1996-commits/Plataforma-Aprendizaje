# Relaciones en Sequelize con Usuario y Publicacion

## 1. Uno a uno
Se usa cuando:
- un usuario tiene una sola publicación
- y esa publicación pertenece a un solo usuario

```js

    Usuario.hasOne( Publicacion, { foreignKey: "usuarioId" });
    Publicacion.belongsTo( Usuario, { foreignKey: "usuarioId" });

```

## Uno a muchos
Se usa cuando:
- un usuario tiene muchas publicaciones
- y cada publicación pertenece a un solo usuario

```js
    Usuario.hasMany(Publicacion, { foreignKey: "usuarioId" });
    Publicacion.belongsTo(Usuario, { foreignKey: "usuarioId" });
```
Este es el caso más común con usuarios y publicaciones.

# 3. Muchos a muchos
Se usa cuando:
- un usuario puede relacionarse con muchas publicaciones
- y una publicación con muchos usuarios

Ejemplo: publicaciones favoritas.

```js
    Usuario.belongsToMany( Publicacion, { through: "usuarios_publicaciones" });
    Publicacion.belongsToMany(Usuario, { through: "usuarios_publicaciones" });
```

# Qué significa cada uno
- hasOne = tiene uno
- hasMany = tiene muchos
- belongsTo = pertenece a
- belongsToMany = muchos a muchos

## Idea clave belongsTo
`este modelo pertenece al otro modelo`

Ejemplo:

```js

    Publicacion.belongsTo(Usuario)

```
Significa:
`cada publicación pertenece a un usuario`