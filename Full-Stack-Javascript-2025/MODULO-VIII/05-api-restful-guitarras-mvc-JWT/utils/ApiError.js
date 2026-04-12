export default class ApiError extends Error{
    constructor(statusCode, message, details = null ){
        super(message)
        this.name = 'ApiError',
        this.statusCode = statusCode,
        this.details = details
    }
}
// throw new ApiError(404, 'Guitarra no encontrada');

