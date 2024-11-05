import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middlewares/catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import MedicineModel from "../models/medicine.model";
import ReviewModel from "../models/review.model";
import mongoose from "mongoose";
import ReviewReplyModel from "../models/reviewReply.model";
import NotificationModel from "../models/notification.model";
import { getReciverSocketId, io } from "../socket/socket";

export interface IReviewOptions extends Document {
    userId: string;
    medicineId: string;
    reviewText: string;
    rating: number;
}

// Utility to validate ObjectId
const isValidObjectId = (id: string): boolean =>
    mongoose.Types.ObjectId.isValid(id);

/**
 * Submit a new review for a medicine.
 * Validates input, checks medicine existence, and updates medicine's rating.
 */
export const submitReview = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        const { reviewText, medicineId, rating } = req.body as IReviewOptions;

        // Validate essential review data
        if (!reviewText || !medicineId || !rating || rating < 1 || rating > 5) {
            return next(
                new ErrorHandler("Incomplete or invalid review data.", 400)
            );
        }

        // Check if the medicine exists
        const dbMedicine = await MedicineModel.findById(medicineId);
        if (!dbMedicine)
            return next(new ErrorHandler("Medicine not found!", 404));

        // Create and save the review
        const review = new ReviewModel({
            userId: req.user._id,
            reviewText,
            medicineId,
            rating,
        });
        await review.save();

        // Add review to medicine and calculate new average rating
        dbMedicine.reviews?.push(review._id as any);
        const medicineReviews = await ReviewModel.find({ medicineId });

        const reviewRatingSum = medicineReviews.reduce(
            (sum, review) => sum + review.rating,
            0
        );
        dbMedicine.rating = Math.round(
            reviewRatingSum / medicineReviews.length
        );

        await dbMedicine.save({ validateModifiedOnly: true });

        if (req.user.notification) {
            const notification = new NotificationModel({
                userId: dbMedicine.userId,
                type: "review",
                message: `Your product ${dbMedicine.name} reviewed by ${req.user.fullname}.`,
            });

            await notification.save({ validateModifiedOnly: true });

            // send notification by socket.io
            const userSocketId = getReciverSocketId(dbMedicine.userId);

            if (userSocketId) {
                io.to(userSocketId).emit("notification", notification);
            }
        }

        return res.status(200).json({
            success: true,
            message: "Review created successfully!",
            review,
        });
    }
);

/**
 * Retrieve a review by its ID.
 */
export const getById = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        const { reviewId } = req.params;

        // Validate review ID
        if (!reviewId || !isValidObjectId(reviewId)) {
            return next(new ErrorHandler("Invalid review ID!", 400));
        }

        // Fetch review from database
        const review = await ReviewModel.findById(reviewId);
        if (!review) return next(new ErrorHandler("Review not found!", 404));

        return res.status(200).json({ success: true, review });
    }
);

/**
 * Get all reviews for a specific medicine.
 */
export const getMedicineReviews = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        const { medicineId } = req.params;

        // Validate medicine ID
        if (!medicineId || !isValidObjectId(medicineId)) {
            return next(new ErrorHandler("Invalid medicine ID!", 400));
        }

        // Fetch all reviews for the medicine
        const allReviews = await ReviewModel.find({ medicineId });
        return res.status(200).json({
            success: true,
            reviewLen: allReviews.length,
            reviews: allReviews,
        });
    }
);

/**
 * Delete a review from a specific medicine by review ID.
 */
export const deleteMedicineReview = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        const { medicineId, reviewId } = req.params;

        // Validate IDs
        if (!isValidObjectId(medicineId) || !isValidObjectId(reviewId)) {
            return next(
                new ErrorHandler("Invalid medicine or review ID!", 400)
            );
        }

        // Verify medicine existence and find review index
        const dbMedicine = await MedicineModel.findById(medicineId);
        if (!dbMedicine)
            return next(new ErrorHandler("Reviewed medicine not found!", 404));

        // Remove the review from the medicine's review array
        const reviewIndex = dbMedicine.reviews?.indexOf(reviewId as any);
        if (reviewIndex === -1 || reviewIndex === undefined) {
            return next(
                new ErrorHandler(
                    "Review not associated with this medicine!",
                    404
                )
            );
        }
        dbMedicine.reviews?.splice(reviewIndex, 1);

        // Delete the review if it belongs to the current user
        const deletedReview = await ReviewModel.findOneAndDelete({
            _id: reviewId,
            userId: req.user._id,
        });

        if (!deletedReview)
            return next(
                new ErrorHandler("Unauthorized or review not found.", 403)
            );

        await dbMedicine.save({ validateModifiedOnly: true });
        return res.status(200).json({
            success: true,
            message: "Review deleted successfully!",
        });
    }
);

/**
 * Add a reply to a review.
 */
export const createReviewReply = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        const { reviewId } = req.params;
        const { replyText } = req.body;

        // Validate input
        if (!replyText || !isValidObjectId(reviewId)) {
            return next(
                new ErrorHandler("Invalid input for reply creation.", 400)
            );
        }

        // Check if review exists
        const review = await ReviewModel.findById(reviewId);
        if (!review) return next(new ErrorHandler("Review not found!", 404));

        // Create and save reply
        const newReply = new ReviewReplyModel({
            replyText,
            userId: req.user._id,
            reviewId,
        });

        await newReply.save();

        // Associate reply with the review
        review.reply.push(newReply._id as any);
        await review.save({ validateModifiedOnly: true });

        if (req.user.notification) {
            const notification = new NotificationModel({
                userId: review.userId, // main repaly user
                message: `You have new review replay by ${req.user.fullname}.`,
                type: "review",
            });

            await notification.save({ validateModifiedOnly: true });

            const userSocketId = getReciverSocketId(review.userId);

            if (userSocketId) {
                io.to(userSocketId).emit("notification", notification);
            }
        }

        return res.status(201).json({
            success: true,
            message: "Review reply created successfully.",
        });
    }
);
