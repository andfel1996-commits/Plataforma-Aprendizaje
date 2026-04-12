export class ApiError extends Error {
    constructor(statusCode, message = 'Algo salió mal', error=[], stack = ''){
        super(message)
        this.statusCode = statusCode;
        this.data = null //payload no es existoso
        this.message = message;
        this.success = false; // Marca explícitamente que la operación falló.
        this.error = error;
        if(stack){
            this.stack = stack
        }else{
            Error.captureStackTrace(this, this.constructor)
        }
    }
}