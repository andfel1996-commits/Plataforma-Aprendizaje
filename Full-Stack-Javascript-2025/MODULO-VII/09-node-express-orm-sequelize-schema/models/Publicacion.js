import { DataTypes } from "sequelize";
import db from '../db/connection.js';
import Usuario from "./Usuario.js";

/**
 * Modelo Publicacion — representa la tabla "publicaciones" en PostgreSQL.
 *
 * Campos:
 *  - titulo:           título de la publicación (requerido)
 *  - contenido:        cuerpo del texto (requerido)
 *  - imagen:           nombre del archivo de imagen (opcional)
 *  - fechaPublicacion: fecha de creación (se asigna automáticamente con DataTypes.NOW)
 *  - usuarioId:        clave foránea hacia la tabla "usuarios"
 */

const Publicacion = db.define('Publicacion', {
    titulo:{
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:{msg:'El título no puede estar vacío'}
        }
    },
    contenido:{
        type:DataTypes.TEXT,
        allowNull:false,
        validate:{
            notEmpty:{msg:'El contenido no pude estar vacío.'}
        }
    },

    imagen:{
        type : DataTypes.STRING,
        allowNull: true,
        defaultValue : null
    },

    fechaPublicacion:{
        type:DataTypes.DATE,
        defaultValue:DataTypes.NOW
    }
},{
   timestamps:false,
   tableName:'publicaciones' 
})

/**
 * 
    1:1 → hasOne + belongsTo
    1:N → hasMany + belongsTo

 */

Usuario.hasMany(Publicacion,{
    foreignKey:'usuarioId',
    as : 'publicaciones',
    onDelete : 'CASCADE',
    onUpdate : 'CASCADE'
})

// “Este registro pertenece a un registro del otro modelo”.
Publicacion.belongsTo(Usuario,{
    foreignKey:'usuarioId',
    as:'autor'
})

export default Publicacion;