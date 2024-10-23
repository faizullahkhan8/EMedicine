import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middlewares/catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import MedicineModel, { IMedicineOptions } from "../models/medicine.model";
import ReviewModel from "../models/review.model";
import { ObjectId } from "mongoose";
import ReviewReplyModel from "../models/reviewReply.model";
import InventoryModel from "../models/inventory.model";

export const createMedicine = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const medicineData = req.body as any;

            const { name, category, type, quantity } = medicineData;

            const isAlreadyExists = await MedicineModel.findOne({
                name: {
                    $regex: "^" + name,
                    $options: "i",
                },
                category,
                type,
            });

            if (isAlreadyExists) {
                throw new Error(
                    `Medicine already exists with the fields, name: ${isAlreadyExists.name} , category: ${isAlreadyExists.category} , type: ${isAlreadyExists.type}`
                );
            }

            const dbMedicine = new MedicineModel({
                ...medicineData,
                userId: req.user._id,
            });

            await dbMedicine.save({ validateModifiedOnly: true });

            await InventoryModel.create({
                medicineId: dbMedicine._id,
                quantity: quantity | 0,
            });

            return res.status(201).json({
                success: true,
                message: "Medicine create successfully",
                medicine: dbMedicine,
            });
        } catch (error: any) {
            console.log("ERROR IN CREATE MEDICINE : ", error.message);
            return next(new ErrorHandler(error.message, 500));
        }
    }
);

export const updateMedicine = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const medicineData: IMedicineOptions = req.body as any;
            const { medicineId } = req.params;

            if (!medicineId) {
                throw new Error("Missing medicine id!");
            }

            const dbMedicine = await MedicineModel.findOneAndUpdate(
                {
                    $and: [
                        { _id: { $eq: medicineId } },
                        { userId: { $eq: req.user._id } },
                    ],
                },
                { $set: medicineData },
                { new: true }
            );

            if (!dbMedicine) {
                throw new Error(
                    "Somethings went wronge during medicine updation!"
                );
            }

            return res.status(201).json({
                success: true,
                message: "Medicine updated successfully!",
            });
        } catch (error: any) {
            console.log("ERROR IN UPDATE MEDICINE : ", error.messaege);
            return next(new ErrorHandler(error.message, 500));
        }
    }
);

export const getById = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { medicineId } = req.params;

            if (!medicineId) {
                throw new Error("Medicine id missing");
            }

            const dbMedicine = await MedicineModel.findById(medicineId);

            if (!dbMedicine) {
                throw new Error("Medinice not found!");
            }

            return res.status(200).json({
                success: true,
                message: "Medicine founded successfully",
                medicine: dbMedicine,
            });
        } catch (error: any) {
            console.log("ERROR IN GET BY ID", error.message);
            return next(new ErrorHandler(error.message, 500));
        }
    }
);

export const getAllMedicines = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const query = req.body || {};

            const queryKey = Object.keys(query)[0];
            const queryValue = Object.values(query)[0];

            const allMedicines = await MedicineModel.find(
                Object.keys(query).length > 0
                    ? {
                          [queryKey]: {
                              $regex: "^" + queryValue,
                              $options: "i",
                          },
                      }
                    : {}
            );

            if (allMedicines.length < 0) {
                throw new Error("No medicine yet in db!");
            }

            return res.status(200).json({
                success: true,
                medicineLen: allMedicines.length,
                medicines: allMedicines,
            });
        } catch (error: any) {
            console.log("ERROR IN GET ALL MEDICINES :", error);
            return next(new ErrorHandler(error.message, 500));
        }
    }
);

export const deleteMedicine = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { medicineId } = req.params;
            const userId = req.user._id;

            if (
                !medicineId ||
                medicineId === null ||
                medicineId === undefined
            ) {
                throw new Error("Medicine id is missing!");
            }

            const deletedMedicine = await MedicineModel.findById(medicineId);

            if (!deletedMedicine) {
                throw new Error("Medicine not found!");
            }

            if (deletedMedicine.isDeleted) {
                throw new Error("Medicine already deleted!");
            }

            deletedMedicine?.reviews?.map(async (reviewId: any) => {
                const deletedReveiw = await ReviewModel.findByIdAndDelete(
                    reviewId
                );
                deletedReveiw?.reply.map(async (replyId) => {
                    await ReviewReplyModel.deleteOne(replyId);
                });
            });

            deletedMedicine.reviews = [];

            deletedMedicine.deletedBy = userId as any;

            deletedMedicine.isDeleted = true;

            await deletedMedicine.save({ validateModifiedOnly: true });

            res.status(200).json({
                success: true,
                message: "Medicine deleted successfully!",
            });
        } catch (error: any) {
            console.log("ERROR IN DELETE MEDICINE : ", error.message);
            return next(new ErrorHandler(error.message, 500));
        }
    }
);

export const listPopularMedince = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const query = req.body || {};

            const poplarMedicines = await MedicineModel.find(query)
                .populate({
                    path: "reviews",
                    model: "Reviews",
                    select: "rating",
                })
                .sort({ rating: -1 })
                .limit(15);

            return res.status(200).json({
                success: true,
                poplarMedicines,
            });
        } catch (error: any) {
            console.log("ERROR IN LIST POPULAR MEDICINE :", error.message);
            return next(new ErrorHandler(error.message, 500));
        }
    }
);
