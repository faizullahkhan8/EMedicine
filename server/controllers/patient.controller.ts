import { NextFunction, Request, Response } from "express";

export const test = (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({
        success: true,
        message: "Working successfully.",
    });
};
