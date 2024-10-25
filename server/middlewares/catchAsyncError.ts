import { NextFunction, Request, Response } from "express";

// Middleware to catch asynchronous errors in route handlers
export const CatchAsyncError =
    (
        theFunc: (
            req: Request,
            res: Response,
            next: NextFunction
        ) => Promise<any>
    ) =>
    (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(theFunc(req, res, next)).catch(next);
    };
