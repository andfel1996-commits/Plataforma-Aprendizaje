import ApiError from '../utils/ApiError.js';
import { verifyAccessTokenService } from '../services/auth.service.js';

export const authenticateJWT = (req, res, next) => {

  const authHeader = req.headers.authorization || '';

  if (!authHeader.startsWith('Bearer ')) {
    return next(new ApiError(401, 'Token no proporcionado. Usa Authorization: Bearer <token>.'));
  }

  const token = authHeader.slice(7).trim();

  try {
    const user = verifyAccessTokenService(token);
    req.user = user;
    return next();
  } catch (error) {
    return next(error);
  }
};

export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new ApiError(401, 'No autenticado.'));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(new ApiError(403, 'No tienes permisos para esta operación.'));
    }

    return next();
  };
};
