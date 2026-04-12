import { DataTypes } from "sequelize";
import db from "../db/connection.js";
import Usuario from "./Usuario.js";
import Publicacion from "./Publicacion.js";

// ═══════════════════════════════════════════════════════════════════════════════
// TABLA INTERMEDIA: usuario_publicacion
// ───────────────────────────────────────────────────────────────────────────────

const UsuarioPublicacion = db.define('UsuarioPublicacion',{
    usuarioId:{
        type : DataTypes.INTEGER,
        allowNull : false,
        references:{
            model:'usuarios',
            key: 'id'
        }
    },
    publicacionId:{
        type : DataTypes.INTEGER,
        allowNull : false,
        references:{
            model:'publicaciones',
            key: 'id'
        }
    },
    tipo:{
        type: DataTypes.ENUM('favorito', 'guardado', 'colaborador'),
        allowNull:false,
        defaultValue:'favorito'
    },
    fechaInteraccion:{
        type:DataTypes.DATE,
        defaultValue:DataTypes.NOW
    }

},{
     timestamps: false,
     tableName:'usuario_publicacion'
});

Usuario.belongsToMany(Publicacion,{
    through: UsuarioPublicacion, // tabla intermedia
    foreignKey: 'usuarioId', // FK que referencia a ESTE Modelo (Usuario)
    otherKey: 'publicacionId', // FK que referencia al OTRO modelo (Publicacion)
    as : 'publicacionesInteractuadas'
})

Publicacion.belongsToMany(Usuario,{
    through:UsuarioPublicacion,
    foreignKey : 'publicacionId',
    otherKey : 'usuarioId',
    as : 'usuariosInteractuados'
})

export default UsuarioPublicacion;
