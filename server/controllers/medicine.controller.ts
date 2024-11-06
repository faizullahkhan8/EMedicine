import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middlewares/catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import MedicineModel, { IMedicineOptions } from "../models/medicine.model";
import ReviewModel from "../models/review.model";
import ReviewReplyModel from "../models/reviewReply.model";
import InventoryModel from "../models/inventory.model";
import NotificationModel from "../models/notification.model";
import { getReciverSocketId, io } from "../socket/socket";

// [ATTENTION] implement the medicine registeration request and approval logic

// Create a new medicine entry in the database
export const createMedicine = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        const { name, category, type, quantity, ...otherData } = req.body;

        // Check if the medicine already exists
        const existingMedicine = await MedicineModel.findOne({
            name: { $regex: "^" + name, $options: "i" },
            category,
            type,
        });

        if (existingMedicine) {
            return next(
                new ErrorHandler(
                    `Medicine with name "${existingMedicine.name}", category "${existingMedicine.category}", and type "${existingMedicine.type}" already exists.`,
                    409
                )
            );
        }

        // Save the new medicine and initialize inventory
        const newMedicine = new MedicineModel({
            ...otherData,
            name,
            category,
            type,
            userId: req.user._id,
        });

        await newMedicine.save({ validateModifiedOnly: true });

        // send the notification via socket.io if user has enabled
        if (req.user.notification) {
            // create the instance of notificaton
            const notification = new NotificationModel({
                userId: req.user._id,
                type: "medicine",
                message: "Product pending for approval.",
            });

            await notification.save({ validateModifiedOnly: true });

            const userSocketId = getReciverSocketId(req.user._id);

            if (userSocketId) {
                io.to(userSocketId).emit("notification", notification);
            }
        }

        return res.status(201).json({
            success: true,
            message: "Medicine is pending for approval.",
            medicine: newMedicine,
        });
    }
);

// approve medicine
export const medicineApproval = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { medicineId } = req.body;

            if (!medicineId) {
                return next(new ErrorHandler("Missing medicine id.", 400));
            }

            const dbMedicine = (await MedicineModel.findById(
                medicineId
            ).populate("userId")) as any;

            if (!dbMedicine) {
                return next(new ErrorHandler("Medicine not found.", 404));
            }

            if (dbMedicine?.isApproved) {
                return next(
                    new ErrorHandler("Medicine already approved.", 409)
                );
            }

            dbMedicine.isApproved = true;

            await dbMedicine.save({ validateModifiedOnly: true });

            await InventoryModel.create({
                medicineId: dbMedicine._id,
            });

            // send Notification to the medicine user
            if (dbMedicine.userId.notification) {
                const notification = new NotificationModel({
                    userId: dbMedicine.userId._id,
                    type: "medicine",
                    message: `Your product: Name: ${dbMedicine.name}, Category:${dbMedicine.category}, Type:${dbMedicine.type} has been successfully approved.`,
                });

                await notification.save({ validateModifiedOnly: true });

                const userSocketId = getReciverSocketId(
                    dbMedicine.userId._id.toString()
                );

                if (userSocketId) {
                    io.to(userSocketId).emit("notification", notification);
                }
            }

            return res.status(201).json({
                success: true,
                message: "Medicine successfully approved",
            });
        } catch (error: any) {
            console.log("ERROR IN MEDICINE APPROVAL :", error.message);
            return next(new ErrorHandler(error.message, 500));
        }
    }
);

// Update an existing medicine by ID
export const updateMedicine = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        const { medicineId } = req.params;
        const updateData: IMedicineOptions = req.body;

        if (!medicineId) {
            return next(new ErrorHandler("Medicine ID is required.", 400));
        }

        // Find and update the medicine
        const updatedMedicine = await MedicineModel.findOneAndUpdate(
            { _id: medicineId, userId: req.user._id },
            { $set: updateData },
            { new: true }
        );

        if (!updatedMedicine) {
            return next(new ErrorHandler("Medicine update failed.", 404));
        }

        return res.status(200).json({
            success: true,
            message: "Medicine updated successfully.",
            medicine: updatedMedicine,
        });
    }
);

// Retrieve a medicine by its ID
export const getById = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        const { medicineId } = req.params;

        if (!medicineId) {
            return next(new ErrorHandler("Medicine ID is required.", 400));
        }

        // Find the medicine by ID
        const medicine = await MedicineModel.findById(medicineId);

        if (!medicine) {
            return next(new ErrorHandler("Medicine not found.", 404));
        }

        return res.status(200).json({
            success: true,
            message: "Medicine retrieved successfully.",
            medicine,
        });
    }
);

// Retrieve all medicines, with optional filters
export const getAllMedicines = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        const query = req.body || {};
        const filter = query
            ? {
                  [Object.keys(query)[0]]: {
                      $regex: "^" + Object.values(query)[0],
                      $options: "i",
                  },
              }
            : {};

        // Get all medicines with optional filtering
        const medicines = await MedicineModel.find(filter);

        if (medicines.length === 0) {
            return next(
                new ErrorHandler("No medicines found in the database.", 404)
            );
        }

        return res.status(200).json({
            success: true,
            total: medicines.length,
            medicines,
        });
    }
);

// Delete a medicine by ID, mark as deleted, and remove associated reviews
export const deleteMedicine = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        const { medicineId } = req.params;
        const userId = req.user._id as any;

        if (!medicineId) {
            return next(new ErrorHandler("Medicine ID is required.", 400));
        }

        // Find the medicine to delete
        const medicine = await MedicineModel.findById(medicineId);

        if (!medicine) {
            return next(new ErrorHandler("Medicine not found.", 404));
        }

        if (medicine.isDeleted) {
            return next(
                new ErrorHandler("Medicine is already marked as deleted.", 400)
            );
        }

        // Delete associated reviews and replies
        if (medicine.reviews) {
            for (const reviewId of medicine.reviews) {
                const review = await ReviewModel.findByIdAndDelete(reviewId);
                if (review?.reply) {
                    await ReviewReplyModel.deleteMany({
                        _id: { $in: review.reply },
                    });
                }
            }
        }

        // Mark medicine as deleted
        medicine.isDeleted = true;
        medicine.deletedBy = userId;
        medicine.reviews = [];
        await medicine.save({ validateModifiedOnly: true });

        // send the notification via socket.io if user has enabled
        if (req.user.notification) {
            // create the instance of notificaton
            const notification = new NotificationModel({
                userId: medicine.userId,
                type: "medicine",
                message: `Your Product: { name: ${medicine.name} } is deleted, if this is not your action. Please contact the Admin`,
            });

            await notification.save({ validateModifiedOnly: true });

            const userSocketId = getReciverSocketId(medicine.userId);

            if (userSocketId) {
                io.to(userSocketId).emit("notification", notification);
            }
        }

        return res.status(200).json({
            success: true,
            message: "Medicine deleted successfully.",
        });
    }
);

// List popular medicines based on rating
export const listPopularMedicine = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        const query = req.body || {};

        // Fetch popular medicines, sorted by rating
        const popularMedicines = await MedicineModel.find(query)
            .populate("reviews", "rating")
            .sort({ rating: -1 })
            .limit(15);

        return res.status(200).json({
            success: true,
            popularMedicines,
        });
    }
);
