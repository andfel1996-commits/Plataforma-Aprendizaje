import db from '../db/connection.js';
import { DataTypes } from 'sequelize';

/**
 * Modelo Usuario — representa la tabla "usuarios" en PostgreSQL.
 *
 * Campos:
 *  - nombre:        nombre completo del usuario (requerido, 2–100 caracteres)
 *  - email:         correo electrónico único (requerido, validado con isEmail)
 *  - fechaRegistro: fecha de creación (se asigna automáticamente con DataTypes.NOW)
 */

const Usuario = db.define("Usuario", {
    nombre:{
        type: DataTypes.STRING,
        allowNull:false,
        validate : {
            notEmpty : { msg:'EL nombre no puede estar vacío.'},
            len: {args: [2,100], msg:'El nombre debe tener entre 2 y 100 caracteres.'}
        }

    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique: true,
        validate:{
            isEmail:{msg:'Debe ingresar un correo electrónico válido'},
            notEmpty:{msg:'El correo no puede estar vacío'}
        }
    },
    fechaRegistro:{
        type:DataTypes.DATE,
        defaultValue : DataTypes.NOW
    }
}, {
    timestamps:false,
    tableName:'usuarios'
})

export default Usuario
