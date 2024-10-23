import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middlewares/catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import InventoryModel from "../models/inventory.model";

export const getByMedicineId = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const medicineId = req.params.medicineId;

            const dbMedicineInventory = await InventoryModel.findOne({
                medicineId: { $eq: medicineId },
            });

            if (!dbMedicineInventory) {
                throw new Error("Inventory not found with the given id!");
            }

            return res.status(200).json({
                success: true,
                inventory: dbMedicineInventory,
            });
        } catch (error: any) {
            console.log(
                "ERROR IN INVENTORY GET BY MEDICINE ID :",
                error.message
            );
            return next(new ErrorHandler(error.message, 500));
        }
    }
);

export const updateInventory = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const medicineId = req.params.medicineId;
            const { quantity } = req.body as { quantity: number };

            if (!quantity) {
                throw new Error("Missing medicine quantity!");
            }

            if (quantity < 1) {
                throw new Error("Quantity must be greater then '0' !");
            }

            const dbMedicineInventory = await InventoryModel.findOne({
                medicineId: { $eq: medicineId },
            });

            if (!dbMedicineInventory) {
                throw new Error("Inventory not found!");
            }

            dbMedicineInventory.quantity += quantity;

            await dbMedicineInventory.save({ validateModifiedOnly: true });

            return res.status(200).json({
                success: true,
                medicineInventory: dbMedicineInventory,
            });
        } catch (error: any) {
            console.log("ERROR IN UPDATE INVENTORY : ", error.message);
            return next(new ErrorHandler(error.message, 500));
        }
    }
);

export const lowQuantityProductsAlert = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const query = req.body || {};

            const medicineInventories = await InventoryModel.find(query);

            if (medicineInventories.length < 1) {
                throw new Error("No product yet!");
            }

            return res.status(200).json({
                success: true,
                inentory: medicineInventories,
            });
        } catch (error: any) {
            console.log("ERROR IN LOW QUANTITY PRODUCTS ALERT", error.message);
            return next(new ErrorHandler(error.message, 500));
        }
    }
);
