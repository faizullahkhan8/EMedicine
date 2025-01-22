import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middlewares/catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";

export const requestDoctorAccount = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
        } catch (error: any) {
            console.log("Error in request doctor account : ", error.message);
            return next(new ErrorHandler(error.message, 500));
        }
    }
);
