import {
    getDate,
    todosLosClientes,
    nuevoCliente,
    editarCliente,
    eliminarCliente
} from '../models/Cliente.js';

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

const validarNum = (numTexto) => {
    const num = Number(numTexto);

    if(!Number.isInteger(num) || num <= 0){
        throw crearError('El saldo debe ser un número entero positivo.', 400 )
    }
    return num
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
// obtenerClientes()       →  GET  /api/clientes
// =============================================================================
// Devuelve el listado completo de clientes ordenado por id DESC.
// =============================================================================
export const obtenerClientes = async (req, res, next) => {
    try {
        const clientes = await todosLosClientes();
        res.status(200).json(clientes);
    } catch (error) {
        next(error);
    }
};

// =============================================================================
// crearCliente()          →  POST  /api/clientes
// =============================================================================
// Crea un nuevo cliente.
// Body esperado: { "first_name": "...", "last_name": "...", ... }
// Valida los campos obligatorios ANTES de llamar al Model.
// =============================================================================
export const crearCliente = async (req, res, next) => {
    try {

   

        const nombre = normalizarTexto(req.body.first_name);
        const apellido = normalizarTexto(req.body.last_name);
        const email = normalizarTexto(req.body.email);
        const saldo = validarNum(req.body.saldo)
        // const titulo = normalizarTexto(req.body.titulo);
        // const descripcion = normalizarTexto(req.body.descripcion)

        if(!nombre || !apellido || !email || !saldo){
            throw crearError('Los campos "nombre", "apellidon", "email" y "saldo" son obligatorios.', 400)
        }

        const usuario = await nuevoCliente( { nombre, apellido, email, saldo } )
        // console.log('Salida de usuario result-->', usuario)
        res.status(201).json({
            ok:true,
            mensaje : 'Usuario creado correctamente',
            data: usuario
        })

    } catch (error) {
        next(error);
    }
};

// =============================================================================
// actualizarCliente()     →  PUT  /api/clientes/:id
// =============================================================================
// Actualiza first_name, last_name, email, saldo del cliente con el id indicado.
// Verifica que el id de la URL coincida con el del body para evitar
// actualizaciones accidentales de la fila equivocada.
// =============================================================================
export const actualizarCliente = async ( req, res, next ) => {
    try {
    
        const idUrl = validarId(req.params.id);
        const idBody = validarId(req.body.id);

        const nombre = normalizarTexto(req.body.first_name);
        const apellido = normalizarTexto(req.body.last_name);
        const email = normalizarTexto(req.body.email);
        const saldo = validarNum(req.body.saldo)

        if(idUrl !== idBody){
            throw crearError(
                `El id de la URL (${idUrl} no coincide con el id enviado en el body (${idBody}))`,
                400
            )
        }

        if(!nombre || !apellido || !email || !saldo){
            throw crearError('Los campos "nombre", "apellidon", "email" y "saldo" son obligatorios.', 400)
        }


        const clienteActualizado = await editarCliente({
            id:idUrl,
            nombre,
            apellido,
            email,
            saldo
        })

        res.status(200).json({
            ok:true,
            mensaje : 'Cliente actualizado correctamente',
            data: clienteActualizado
        })

    } catch (error) {
        next(error);
    }
};

// =============================================================================
// borrarCliente()         →  DELETE  /api/clientes/:id
// =============================================================================
// Elimina el cliente con el id indicado y devuelve la fila eliminada.
// =============================================================================
export const borrarCliente = async (req, res, next) => {
    try {
        const id = validarId(req.params.id)
        const clienteEliminado = await eliminarCliente(id);
        res.status(200).json({
            ok:true,
            mensaje: 'Cliente eliminado correctamente',
            data: clienteEliminado
        })

    } catch (error) {
        next(error);
    }
};
