import {
    getDate,
    todasLasTareas,
    nuevaTarea,
    editarTarea,
    eliminarTarea
} from '../models/Tarea.js';

const crearError = ( mensaje, statusCode = 400) => {
    const error = new Error(mensaje);
    error.statusCode = statusCode;
    return error
}

const validarId = (idTexto) => {
    const id = Number(idTexto);

    if(!Number.isInteger(id) || id <= 0){
        throw crearError('El parámetro id debe ser un número entero positivo.', 400 )
    }
    return id
}

const normalizarTexto = valor => String( valor ?? '' ).trim()


export const obtenerFecha = async ( req, res , next ) => {
    try {
        const fecha = await getDate();
        res.status(200).json(fecha)
    } catch (error) {
        next(error)
    }
}

// =============================================================================
// obtenerTareas()       →  GET  /api/tareas
// =============================================================================
// Devuelve el listado completo de tareas ordenado por id DESC.
// =============================================================================
export const obtenerTareas = async (req, res, next) => {
    try {
        const tareas = await todasLasTareas();
        res.status(200).json(tareas);
    } catch (error) {
        next(error);
    }
};

// =============================================================================
// crearTarea()          →  POST  /api/tareas
// =============================================================================
// Crea una nueva tarea.
// Body esperado: { "titulo": "...", "descripcion": "..." }
// Valida los campos obligatorios ANTES de llamar al Model.
// =============================================================================
export const crearTarea = async (req, res, next) => {
    try {

        const titulo = normalizarTexto(req.body.titulo);
        const descripcion = normalizarTexto(req.body.descripcion)

        if(!titulo || !descripcion){
            throw crearError('Los campos "titulo" y "descripcion" son obligatorios.', 400)
        }

        const tarea = await nuevaTarea( { titulo, descripcion } )
        res.status(201).json({
            ok:true,
            mensaje : 'Tarea creada correctamente',
            data: tarea
        })

    } catch (error) {
        next(error);
    }
};

// =============================================================================
// actualizarTarea()     →  PUT  /api/tareas/:id
// =============================================================================
// Actualiza titulo y descripcion de la tarea con el id indicado.
// Verifica que el id de la URL coincida con el del body para evitar
// actualizaciones accidentales de la fila equivocada.
// =============================================================================
export const actualizarTarea = async ( req, res, next ) => {
    try {
    
        const idUrl = validarId(req.params.id);
        const idBody = validarId(req.body.id);


        const titulo = normalizarTexto(req.body.titulo);
        const descripcion = normalizarTexto(req.body.descripcion);

        if(idUrl !== idBody){
            throw crearError(
                `El id de la URL (${idUrl} no coincide con el id enviado en el body (${idBody}))`,
                400
            )
        }

        if(!titulo || !descripcion){
            throw crearError('Los campos "titulo" y "descripción" son obligatorios.', 400)
        }

        const tareaActualizada = await editarTarea({
            id:idUrl,
            titulo,
            descripcion
        })

        res.status(200).json({
            ok:true,
            mensaje : 'Tarea actualizada correctamente',
            data: tareaActualizada
        })

    } catch (error) {
        next(error);
    }
};

// =============================================================================
// borrarTarea()         →  DELETE  /api/tareas/:id
// =============================================================================
// Elimina la tarea con el id indicado y devuelve la fila eliminada.
// =============================================================================
export const borrarTarea = async (req, res, next) => {
    try {
        const id = validarId(req.params.id)
        const tareaEliminada = await eliminarTarea(id);
        res.status(200).json({
            ok:true,
            mensaje: 'Tarea eliminada correctamente',
            data: tareaEliminada
        })
        // const tareaEliminada = await eliminarTarea(req.params.id);
        // res.status(200).json(tareaEliminada);
    } catch (error) {
        next(error);
    }
};
