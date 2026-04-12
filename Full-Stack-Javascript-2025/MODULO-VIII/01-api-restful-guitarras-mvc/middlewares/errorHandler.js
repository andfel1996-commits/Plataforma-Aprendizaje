import { sendError } from '../utils/apiResponse.js';
// Middleware de manejo centralizado de errores
// Express lo reconoce como manejador de errores porque tiene EXACTAMENTE 4 parámetros
// Si tuviera 3 parámetros, Express lo trataría como un middleware normal y nunca lo activaría
export const errorHandler = (err, req, res, next) => {
  // Registra el error completo en consola del servidor (con stack trace) para depuración
  console.error('[ERROR_HANDLER]', err);

  // Extrae el código de estado del error en este orden de prioridad:
  // 1. err.statusCode → viene de ApiError (nuestra clase personalizada)
  // 2. err.status     → algunos errores de librerías usan 'status' en lugar de 'statusCode'
  // 3. 500            → valor por defecto si el error no tiene código HTTP definido
  const statusCode = err.statusCode || err.status || 500;

  // Clasifica si es un error del servidor (500+) o del cliente (4xx)
  const isServerError = statusCode >= 500;

  return sendError({
    res,
    statusCode,
    // Usa el mensaje del error o un mensaje genérico si no tiene
    message: err.message || 'Ocurrió un error en el servidor',
    // SEGURIDAD: para errores 500+ no exponemos detalles internos al cliente
    // (podrían revelar rutas de archivos, queries SQL, etc.)
    // Para errores 4xx sí mostramos detalles (listas de campos inválidos, etc.)
    details: isServerError ? undefined : err.details
  });
};