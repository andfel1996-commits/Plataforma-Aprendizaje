import Publicacion from '../models/Publicacion.js';
import Usuario from '../models/Usuario.js';
import fs          from 'fs';
import path        from 'path';
import { fileURLToPath } from 'url';
import { dirname }       from 'path';

const __filename   = fileURLToPath(import.meta.url);
const __dirname    = dirname(__filename);
const IMG_DIR      = path.join(__dirname, '../public/assets/img/publicaciones');


// Vamos a eliminar el archivo de imagen de la carpeta si existe
const eliminarImagenDisco = ( nombreArchivo ) => {
    if(!nombreArchivo) return;
    const ruta = path.join(IMG_DIR, nombreArchivo)
    fs.unlink(ruta, (err)=> {
        if(err && err.code !== 'ENOENT') console.error('Error al eliminar la imagen', err)
    })
}

/**
 * POST /api/publicacion
 * Crea una nueva publicación. Acepta multipart/form-data para incluir imagen.
 * Campos: titulo (requerido), contenido (requerido), usuarioId (requerido), imagen (archivo, opcional)
 */
export const postPublicacion = async (req, res) => {
    
    const { body } = req;
    // Si multer procesó  un archivo , guardamos sólo el nombre del archivo
    if(req.file) body.imagen = req.file.filename

    try {
        const publicacion = await Publicacion.create(body);
        res.status(201).json(publicacion);
    } catch (error) {
        // Si falló la BD, borramos la imagen que ya se subió al disco
        if (req.file) eliminarImagenDisco(req.file.filename);
        console.error('postPublicacion error:', error);
        
        if (error.name === 'SequelizeValidationError') {
        
            return res.status(400).json({ msg: 'Error de validación.', errores: mensajes });
        }
        res.status(500).json({ msg: 'Error al crear la publicación.', error: error.message });
    }
};

// GET api/publicacion
export const getPublicaciones = async (req, res ) => {
    try {
        const publicaciones = await Publicacion.findAll({
            include:[{
                model:Usuario,
                as : 'autor',
                attributes:['id', 'nombre', 'email']
            }]
        });
        res.status(200).json(publicaciones);
    } catch (error) {
        console.error('getPublicaciones error', error);
        res.status(500).json({msg:'Error al obtener las publicaciones', error:error.message});
    }
}

export const getPublicacionesByUsuario = async ( req, res ) => {
    const { usuarioId } = req.params

    try {
        const usuario = await Usuario.findByPk( usuarioId, {
            attributes: ['id',  'nombre', 'email' ]
        })

        if(!usuario){
            return res.status(404).json({msg: `No existe un usuario con id ${usuarioId}`})
        }

        const publicaciones = await Publicacion.findAll({
            where : { usuarioId },
            include: [{
                model : Usuario,
                as : 'autor',
                attributes: ['id', 'nombre', 'email']
            }],
            order : [['fechaPublicacion', 'DESC']]
        })

        res.status(200).json({
            usuario, // Datos del autor
            total: publicaciones.length,
            publicaciones
        })

    } catch (error) {
        console.error('getPublicacionesByUsuario error', error );
        res.status(500).json({msg:'Error al obtener las publicaciones del usuario', error:error.message});
    }
}

// PUT api/publicacion/:id
export const putPublicacion = async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    try {
        const publicacion = await Publicacion.findByPk(id);
        if (!publicacion) {
                // Si llegó un archivo nuevo pero la publicación no existe, lo borramos
                if (req.file) eliminarImagenDisco(req.file.filename);
                return res.status(404).json({ msg: `No existe una publicación con id ${id}.` });
            }
            // Si se subió una imagen nueva, borrar la anterior del disco y actualizar el campo
            if (req.file) {
                eliminarImagenDisco(publicacion.imagen);
                body.imagen = req.file.filename;
            }

        await publicacion.update(body)
        res.status(200).json(publicacion);
    } catch (error) {
          if (error.name === 'SequelizeValidationError') {
            // const mensajes = error.errors.map(e => e.message);
            return res.status(400).json({ msg: 'Error de validación.', errores: mensajes });
        }
        res.status(500).json({ msg: 'Error al actualizar la publicación.', error: error.message });
    }
}

// DELETE /api/publicacion/:id
export const deletePublicacion = async (req, res) => {
    const {id} = req.params;
    try {
        const publicacion = await Publicacion.findByPk(id);
        if(!publicacion){
            return res.status(404).json({msg:`La publicación de id=${id} no existe`})
        }
        eliminarImagenDisco(publicacion.imagen);
        await publicacion.destroy()
        res.status(200).json({msg:`Publicacion de ${id} eliminada correctamente`})
    } catch (error) {
        console.error('deletePublicacion error:', error)
        res.status(500).json({msg:'Error al eliminar la publicación', error:error.message})
    }
}