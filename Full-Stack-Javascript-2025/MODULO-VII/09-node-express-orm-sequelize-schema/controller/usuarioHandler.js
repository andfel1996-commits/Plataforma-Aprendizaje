import Usuario from "../models/Usuario.js";
import chalk from "chalk";
/**
 * POST api/usuario
 */

export const postUsuario = async (req, res) => {
    const { body } = req;
    try {
        const usuario = await Usuario.create(body);
        res.status(201).json(usuario)
    } catch (error) {
        console.error('postUsuario error:', error);

        if(error.name === 'SequelizeUniqueConstraintError'){
            return res.status(409).json({msg:'El correo electrónico ya está registrado'})
        }

       if( error.name === 'SequelizeValidationError' ){
           return res.status(400).json({msg:'Error de validación', errores:error.message})
        }

        res.status(500).json({msg:'Error al crear el usuario', error: error.message })

    }
}

// GET /api/usuario
// Retorna todos los uduarios ordenados por fecha de registro descendente.
export const getUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll({
            attributes : ['id', 'nombre', 'email', 'fechaRegistro'],
            order: [['fechaRegistro', 'DESC']]
        })
        res.status(200).json({usuarios})
    } catch (error) {
        console.error('getUsuarios error', error);
        res.status(500).json({msg:'Error al obtener los usurios.', error:error.message});
    }
}
