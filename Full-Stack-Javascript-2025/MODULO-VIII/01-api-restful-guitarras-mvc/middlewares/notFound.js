import { sendError } from '../utils/apiResponse.js';

export const notFoundHandler = ( req, res ) => {

    return sendError({
        res,
        statusCode:404,
        message: `La ruta ${req.method} ${req.originalUrl} no existe.`
    });
}