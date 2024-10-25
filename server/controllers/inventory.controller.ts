import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middlewares/catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import InventoryModel from "../models/inventory.model";

// Fetch inventory details by medicine ID
export const getByMedicineId = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { medicineId } = req.params;

            // Find inventory by medicine ID
            const inventory = await InventoryModel.findOne({ medicineId });

            if (!inventory) {
                // Return error if inventory not found
                return next(
                    new ErrorHandler(
                        "Inventory not found with the given ID",
                        404
                    )
                );
            }

            return res.status(200).json({
                success: true,
                inventory,
            });
        } catch (error: any) {
            console.error(
                "Error fetching inventory by medicine ID:",
                error.message
            );
            return next(new ErrorHandler(error.message, 500));
        }
    }
);

// Update inventory quantity by medicine ID
export const updateInventory = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { medicineId } = req.params;
            const { quantity } = req.body as { quantity: number };

            // Validate quantity input
            if (!quantity || quantity < 1) {
                return next(
                    new ErrorHandler(
                        "Quantity must be provided and greater than 0",
                        400
                    )
                );
            }

            // Find the inventory for the specified medicine
            const inventory = await InventoryModel.findOne({ medicineId });

            if (!inventory) {
                // Return error if inventory not found
                return next(
                    new ErrorHandler(
                        "Inventory not found with the given ID",
                        404
                    )
                );
            }

            // Update quantity
            inventory.quantity += quantity;

            // Save the updated inventory
            await inventory.save({ validateModifiedOnly: true });

            return res.status(200).json({
                success: true,
                inventory,
            });
        } catch (error: any) {
            console.error("Error updating inventory:", error.message);
            return next(new ErrorHandler(error.message, 500));
        }
    }
);

// Get products with low quantity based on query parameters
export const lowQuantityProductsAlert = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const number = req.body;

            // Find inventories based on the provided query
            const inventories = await InventoryModel.find({
                quantity: { $lt: number },
            });

            if (!inventories.length) {
                // Return error if no matching products found
                return next(
                    new ErrorHandler(
                        "No products found matching the criteria",
                        404
                    )
                );
            }

            return res.status(200).json({
                success: true,
                inventories,
            });
        } catch (error: any) {
            console.error(
                "Error fetching low quantity products:",
                error.message
            );
            return next(new ErrorHandler(error.message, 500));
        }
    }
);
