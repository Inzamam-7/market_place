class ApiError extends Error{
    constructor(statusCode,message){
        super(message);

        this.statusCode = statusCode;
        this.status="error";
        this.isOperational = true;
        Error.captureStackTrace(this,this.constructor)
    }
}

export default ApiError