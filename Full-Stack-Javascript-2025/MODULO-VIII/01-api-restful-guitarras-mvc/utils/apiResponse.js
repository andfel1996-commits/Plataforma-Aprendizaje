export const sendSuccess = ({
    res,                              // Objeto de respuesta de Express 
    statusCode = 200,                 // Código HTTP por defecto 200
    message = 'Operación existos',   // mensaje descriptivo
    data = null,                     // Datos del recurso a devolver
    meta = undefined,                // Metadatos opcionales (ejemplo : paginación: total, page, limit)
    links = undefined,               // Enlaces HATEOAS opcionales (Link de navegación de API)
    location = undefined             // URL del recurso recien creado
}) => {

    // Esto es stándar REST cuando se crea un recurso nuevo ( HTTP 201 Created )
    if(location){
        res.location( location )
    }

    // Construimos el cuerpo base de la respuesta
    const payload = {
        status:'success', // Operación exitosa
        code : statusCode,
        message
    }
    // Solo agrega "data" al payload si fue proporcionado (evita campos null innecesarios)
    if( data !== undefined ) payload.data = data

    // Solo agrega meta al payload si fue proporcionado ( ejemplo: total:7,page:1, limit:10 )
    if( meta !== undefined ) payload.meta = meta

    // Solo agrega "links" al payload si fue proporcionado (ejemplo : self: /api/v1/guitars)
    if( links !== undefined ) payload.links = links

    return res.status(statusCode).json( payload )

}

// Función reutilizable para enviar respuestas HTTP de error de forma estandarizada
export const sendError = ({
    res,
    statusCode = 500,
    message='Ocurrió un error en el servidor',
    details= undefined
}) => {
    
    // Construimos el cuerpo base del error con los campos obligatorios
    const payload = {
        status:'error',
        code: statusCode,
        message
    }

    // Solo agrega "details" si existe y no es null
    // Util para incluir errores de validación o stack traces
    if(details !== undefined && details !== null){
        payload.details = details
    }

    return res.status(statusCode).json(payload)
}