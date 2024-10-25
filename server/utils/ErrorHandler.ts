// Custom error handler class extending the built-in Error class
class ErrorHandler extends Error {
    statusCode: number; // Holds the HTTP status code for the error

    constructor(message: string, statusCode: number) {
        // Call the parent Error class constructor with the error message
        super(message);

        this.statusCode = statusCode; // Set the status code for the error

        // Capture the stack trace to help with debugging (Excludes the constructor from the trace)
        Error.captureStackTrace(this, this.constructor);
    }
}

export default ErrorHandler;
