import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'dev_jwt_secret';

export const verificarJWT = ( req, res , next ) => {
    
    const authHeader = req.headers.authorization;

    // Si no existe autorización no podemos autenticar al usario
    if(!authHeader){
        return res.status(401).json({
            status: 'error',
            code : 401,
            mensaje:'Token no proporcionado',
            instruccion : 'Envía Authorization: Bearer <tu_token>'
        })
    }

    // Validamos el formato estándar "Bearer <token>".
    // startsWith('Bearer ') exige el prefijo y el espacio.
    if(!authHeader.startsWith('Bearer ')){
        return res.status(401).json({
            status: 'error',
            code : 401,
            mensaje:'Formato de autorization inválido',
            instruccion : 'Debe ser: Authorization: Bearer <token>'
        })
    }

    const token  = authHeader.slice(7);
    try {

       const decodificado = jwt.verify(token, JWT_SECRET);
       req.user = decodificado
       return next();

    } catch (error) {
        let mensajeError = 'Token inválido';
        if(error.name === 'TokenExpiredError'){
             mensajeError = 'Token expirado. Debes hacer login de nuevo.';
        }else if(error.name === 'JsonWebTokenError'){
            mensajeError = 'Token inválido o corrupto';
        }

           // Respondemos 401 porque la autenticación falló.
            return res.status(401).json({
                status: 'error',
                code: 401,
                mensaje: mensajeError,
                tipo_error: error.name
            })
    }


}