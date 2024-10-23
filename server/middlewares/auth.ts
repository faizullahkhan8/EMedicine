import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "./catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import UserModel from "../models/user.model";
import { sendToken } from "../utils/jwt";

export const isAuthenticated = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        const { access_token, refresh_token } = req.cookies;

        if (!access_token && refresh_token) {
            return next(new ErrorHandler("Access token expired!", 400));
        }

        if (!access_token && !refresh_token) {
            return next(new ErrorHandler("Session expired! Login again", 401));
        }

        const { id } = jwt.verify(
            access_token,
            process.env.ACCESS_TOKEN_SECRET as string
        ) as JwtPayload;

        if (!id) {
            return next(new ErrorHandler("Invalid access token", 400));
        }

        const user = await UserModel.findOne({ _id: id });

        if (!user) {
            return next(new ErrorHandler("User not found", 404));
        }

        req.user = user;

        next();
    }
);

// VALIDATE USER ROLE
export const authorizeRole = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new ErrorHandler(
                    `Role: ${req.user.role} is not allowed to access this resources`,
                    403
                )
            );
        }
        next();
    };
};
