import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "./catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import jwt, { JwtPayload } from "jsonwebtoken";
import UserModel from "../models/user.model";

// Middleware to check if the user is authenticated
export const isAuthenticated = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        const { access_token, refresh_token } = req.cookies;

        // Check if both tokens are missing
        if (!access_token && !refresh_token) {
            return next(
                new ErrorHandler("Session expired! Please log in again.", 401)
            );
        }

        // If the access token is missing but a refresh token exists
        if (!access_token && refresh_token) {
            return next(new ErrorHandler("Access token expired!", 400));
        }

        // Verify access token
        let userId: string | null = null;
        try {
            const decoded = jwt.verify(
                access_token,
                process.env.ACCESS_TOKEN_SECRET as string
            ) as JwtPayload;
            userId = decoded.id;
        } catch (error) {
            return next(
                new ErrorHandler("Invalid or expired access token", 400)
            );
        }

        if (!userId) {
            return next(new ErrorHandler("Invalid access token", 400));
        }

        // Fetch the user from the database using the ID from the access token
        const user = await UserModel.findById(userId);

        if (!user) {
            return next(new ErrorHandler("User not found", 404));
        }

        // Attach the user object to the request object for further use in other middlewares or routes
        req.user = user;
        next();
    }
);

// Middleware to authorize specific user roles
export const authorizeRole = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            return next(new ErrorHandler("Not authorized", 403));
        }

        // Check if the user's role is included in the allowed roles
        if (!roles.includes(req.user.role)) {
            return next(
                new ErrorHandler(
                    `Role: ${req.user.role} is not authorized to access this resource`,
                    403
                )
            );
        }

        next();
    };
};
