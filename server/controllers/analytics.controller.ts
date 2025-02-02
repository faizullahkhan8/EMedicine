import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middlewares/catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import UserModel from "../models/user.model";
import { generateLast12MonthsData } from "../utils/analytics.generator";
import OrderModel from "../models/order.model";

export const getUsersAnaylyticsData = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const usersAnalytics = await generateLast12MonthsData(UserModel);

            return res.status(200).json({
                success: true,
                UserAnalytics: usersAnalytics,
            });
        } catch (error: any) {
            console.log("Error in getUsersAnaylyticsData : ", error.message);
            return next(new ErrorHandler(error.message, 500));
        }
    }
);

export const getOrdersAnaylyticsData = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const ordersAnalytics = await generateLast12MonthsData(OrderModel);

            return res.status(200).json({
                success: true,
                OrderAnalytics: ordersAnalytics,
            });
        } catch (error: any) {
            console.log("Error in getOrderAnaylyticsData : ", error.message);
            return next(new ErrorHandler(error.message, 500));
        }
    }
);
