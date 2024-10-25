import mongoose from "mongoose";
import { CatchAsyncError } from "../middlewares/catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import NotificationModel from "../models/notification.model";

export const getUserNotifications = CatchAsyncError(async (req, res, next) => {
    try {
        const userId: mongoose.Types.ObjectId = req.user._id as any;

        if (!userId) {
            return next(new ErrorHandler("User ID is missing!", 404));
        }

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return next(new ErrorHandler("Invalid user ID!", 400));
        }

        const DBNotifications = await NotificationModel.find({ userId });

        if (DBNotifications.length < 1) {
            return next(
                new ErrorHandler("Notification not found in the database", 404)
            );
        }

        return res.status(200).json({
            success: true,
            notificationLen: DBNotifications.length,
            notification: DBNotifications,
        });
    } catch (error: any) {
        console.log("ERROR IN USER NOTIFICATION", error.message);
        return next(new ErrorHandler(error.message, 500));
    }
});
