import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/ErrorHandler";

// Global Error Middleware to handle all errors in the application
export const ErrorMiddleware = (
    err: Error & {
        statusCode?: number;
        code?: number;
        keyValue?: any;
        path?: string;
        name?: string;
    },
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // Default status and message if not provided
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal server error!";

    // Handle MongoDB CastError (e.g., invalid ObjectId)
    if (err.name === "CastError") {
        const message = `Resource not found. Invalid ${err.path}.`;
        err = new ErrorHandler(message, 400);
    }

    // Handle duplicate key errors (e.g., unique field constraints in MongoDB)
    if (err.code === 11000) {
        const message = `Duplicate field value entered: ${Object.keys(
            err.keyValue
        ).join(", ")}.`;
        err = new ErrorHandler(message, 400);
    }

    // Handle MongoDB validation errors (e.g., schema validation issues)
    if (err.name === "ValidationError") {
        const message = `Validation failed: ${Object.values(err)
            .map((val) => (val as any).message)
            .join(", ")}`;
        err = new ErrorHandler(message, 400);
    }

    // Handle invalid JWT token
    if (err.name === "JsonWebTokenError") {
        const message = "Invalid token. Please try again.";
        err = new ErrorHandler(message, 400);
    }

    // Handle expired JWT token
    if (err.name === "TokenExpiredError") {
        const message = "Token has expired. Please log in again.";
        err = new ErrorHandler(message, 400);
    }

    // Handle general errors
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message,
    });
};
