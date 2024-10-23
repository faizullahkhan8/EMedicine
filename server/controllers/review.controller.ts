import { NextFunction, Request, Response } from "express";

import { CatchAsyncError } from "../middlewares/catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";

import MedicineModel from "../models/medicine.model";
import ReviewModel from "../models/review.model";
import mongoose from "mongoose";
import ReviewReplyModel from "../models/reviewReply.model";

export interface IReviewOptions extends Document {
    userId: string;
    medicineId: string;
    reviewText: string;
    rating: number;
}

export const submitReview = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { reviewText, medicineId, rating } =
                req.body as IReviewOptions;

            if (
                !reviewText ||
                !medicineId ||
                !rating ||
                reviewText === undefined ||
                medicineId === undefined ||
                rating === undefined
            ) {
                throw new Error("In-complete data!");
            }

            if (rating < 1 || rating > 5) {
                throw new Error("Rating must be in range");
            }

            const dbMedicine = await MedicineModel.findById(medicineId);

            if (!dbMedicine) {
                throw new Error("Medicine not found!");
            }

            const review = new ReviewModel({
                userId: req.user._id,
                reviewText,
                medicineId,
                rating,
            });

            dbMedicine.reviews?.push(review._id as any);

            const medicineReviews = await ReviewModel.find({
                medicineId: { $eq: medicineId },
            });

            let reviewRating: number = 0;

            if (medicineReviews.length > 0) {
                medicineReviews.map((review) => {
                    reviewRating = reviewRating + review.rating;
                });

                dbMedicine.rating = Math.round(
                    reviewRating / medicineReviews.length
                );
            }

            await Promise.all([dbMedicine.save(), review.save()]);

            return res.status(200).json({
                success: true,
                message: "Review created successfully!",
                review,
            });
        } catch (error: any) {
            console.log("ERROR IN SUBMIT A REVIEW : ", error.message);
            return next(new ErrorHandler(error.message, 500));
        }
    }
);

export const getById = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const reviewId = req.params.reviewId;

            if (!reviewId) {
                throw new Error("Review id is missing!");
            }

            if (!mongoose.Types.ObjectId.isValid(reviewId)) {
                throw new Error("In-valid reveiw id");
            }

            const review = await ReviewModel.findById(reviewId);

            if (!review) {
                throw new Error("Review not found!");
            }

            return res.status(200).json({
                success: true,
                review,
            });
        } catch (error: any) {
            console.log("ERROR IN GET BY ID :", error.message);
            return next(new ErrorHandler(error.message, 500));
        }
    }
);

export const getMedicineReviews = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { medicineId } = req.params;

            if (!mongoose.Types.ObjectId.isValid(medicineId)) {
                throw new Error("Invalid medicine id!");
            }

            if (
                !medicineId ||
                medicineId === undefined ||
                medicineId === null
            ) {
                throw new Error("Missing medicine id!");
            }

            const allReviews = await ReviewModel.find({ medicineId });

            return res.status(200).json({
                success: true,
                reviewLen: allReviews.length,
                reviews: allReviews,
            });
        } catch (error: any) {
            console.log("ERROR IN GET MEDICINE REVIEWS : ", error.message);
            return next(new ErrorHandler(error.message, 500));
        }
    }
);

export const deleteMedicineReview = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { medicineId, reviewId } = req.params;

            if (
                !mongoose.Types.ObjectId.isValid(medicineId) ||
                !mongoose.Types.ObjectId.isValid(reviewId)
            ) {
                throw new Error("Invalid medicine or review id!");
            }

            const reviewMedicine = await MedicineModel.findById(medicineId);

            if (!reviewMedicine) {
                throw new Error("Reviewed medicine not found!");
            }

            const reviewIdIndex = reviewMedicine.reviews?.findIndex(
                (MedicineReviewId) => {
                    return MedicineReviewId.toString() === reviewId;
                }
            ) as number;

            if (reviewIdIndex === -1) {
                throw new Error("Review not found in the medicine object!");
            }

            const deletedReview = await ReviewModel.deleteOne({
                $and: [
                    { _id: { $eq: reviewId } },
                    { userId: { $eq: req.user._id } },
                ],
            });

            if (deletedReview.deletedCount <= 0) {
                throw new Error(
                    "Review not found or not authorize for this review!"
                );
            }

            reviewMedicine.reviews?.splice(reviewIdIndex, 1);

            await reviewMedicine.save({ validateModifiedOnly: true });

            return res.status(200).json({
                success: true,
                message: "Review deleted successfully!",
            });
        } catch (error: any) {
            console.log("ERROR IN DELETE MEDICINE REVIEW :", error.message);
            return next(new ErrorHandler(error.message, 500));
        }
    }
);

export const createReviewReply = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const reviewId = req.params.reviewId;
            const { replyText } = req.body;

            if (!replyText) {
                throw new Error("Missing review reply text!");
            }

            const newReviewReply = new ReviewReplyModel({
                replyText,
                userId: req.user._id,
                reviewId,
            });

            const review = await ReviewModel.findById(reviewId);

            if (!review) {
                throw new Error("Review not found!");
            }

            review.reply.push(newReviewReply._id as any);

            await Promise.all([
                review.save({ validateModifiedOnly: true }),
                newReviewReply.save(),
            ]);

            return res.status(201).json({
                success: true,
                message: "Review reply created successfully.",
            });
        } catch (error: any) {
            console.log("ERROR IN CREATE REVIEW REPLY :", error.messaege);
            return next(new ErrorHandler(error.message, 500));
        }
    }
);
