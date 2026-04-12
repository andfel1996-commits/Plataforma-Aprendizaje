import { sendSuccess } from '../utils/apiResponse.js';
import {
    loginService,
    logoutService,
    refreshTokenService
} from '../services/auth.service.js'

export const login = (req, res, next ) => {
    try {
        const data = loginService(req.body);
        return sendSuccess({
            res,
            message : 'Autenticación existosa.',
            data
        })
    } catch (error) {
        return next(error)
    }
}

export const refreshToken = ( req, res, next) => {

    try {
        const data = refreshTokenService(req.body);
        return sendSuccess({
            res,
            message: 'Token renovado correctamente',
            data
        })
    } catch (error) {
        return next(error)
    }

}

export const logout = ( req, res, next) => {

    try {
        const data = logoutService(req.body);
        return sendSuccess({
            res,
            message: 'Logout exitoso',
            data
        })
    } catch (error) {
        return next(error)
    }
    
}