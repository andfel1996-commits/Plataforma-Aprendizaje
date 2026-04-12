import Publicacion from "../models/Publicacion.js";
import Usuario  from "../models/Usuario.js";

/**
 * GET /
 * Renderiza la vista home con todas las publicaciones, incluyendo el autor de cada una.
 * Se consulta directamente la BD con Sequelize — sin llamadas HTTP internas.
 */

export const vistaHome = async ( req, res ) => {
    const year = new Date().getFullYear();
    try {
        const publicaciones = await Publicacion.findAll({
           include: [{
            model:Usuario,
            as : 'autor',
            attributes : ['nombre', 'email']
           }] ,
           order:[['fechaPublicacion', 'ASC']]
        })

        res.render('home', {
            layout:'main',
            title : `Bienvenidos  a las publicaciones POST ${year}`,
            year,
            posts : publicaciones.map( p => p.toJSON())
        } )


    } catch (error) {
        console.error('vistaHome error:', error);
        res.status(500).render('home', {
            layout:'main',
            title : `Error`,
            year,
            posts : [],
            error : 'No se puedieron cargar las publicaciones'
        })
    }

}