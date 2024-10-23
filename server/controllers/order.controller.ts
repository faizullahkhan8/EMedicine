import { NextFunction, Response, Request } from "express";
import { CatchAsyncError } from "../middlewares/catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import OrderModel, { IOrderOptions } from "../models/order.model";
import MedicineModel from "../models/medicine.model";
import mongoose from "mongoose";
import InventoryModel from "../models/inventory.model";

export const test = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        return res.status(200).json({
            success: true,
            message: "working successfully!",
        });
    }
);

interface IOrderItemOptions {
    medicineId: mongoose.Types.ObjectId;
    quantity: number;
    totalPrice: number;
}

export const placeOrder = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { medicineList, deliveryAddress, paymentMethod } =
                req.body as IOrderOptions;

            medicineList.map((medicine, index) => {
                if (medicine.quantity < 1) {
                    throw new Error(
                        "Medicine quantity must be greater the '0' !"
                    );
                }
            });

            if (medicineList.length < 0 || !deliveryAddress || !paymentMethod) {
                throw new Error("Order data is missing!");
            }

            let orderMedicines: Array<IOrderItemOptions> = await Promise.all(
                medicineList.map(async (medicine) => {
                    // try {
                    const dbMedicine = await MedicineModel.findById(
                        medicine.medicineId
                    );

                    if (!dbMedicine) {
                        throw new Error("Medicine not found!");
                    }

                    const medicineInventory = await InventoryModel.findOne({
                        medicineId: medicine.medicineId,
                    });

                    if (!medicineInventory) {
                        throw new Error(
                            `${dbMedicine.name} inventory not found!`
                        );
                    }

                    if (medicineInventory.quantity === 0) {
                        throw new Error(`${dbMedicine.name} Inventory empty!`);
                    }

                    if (medicineInventory.quantity < medicine.quantity) {
                        let err = new Error(
                            `${dbMedicine.name} is out of stack!`
                        );

                        throw err;
                    }

                    let totalPriceOfTheMedicine =
                        dbMedicine.price * medicine.quantity;

                    return {
                        medicineId: dbMedicine._id,
                        quantity: medicine.quantity,
                        totalPrice: totalPriceOfTheMedicine,
                    } as IOrderItemOptions;
                })
            );

            let orderTotalPrice = Number(0);

            orderMedicines.map((item) => {
                orderTotalPrice += item.totalPrice;
            });

            const dbOrder = new OrderModel({
                medicineList: orderMedicines,
                totalPrice: orderTotalPrice.toFixed(2),
                paymentMethod,
                userId: req.user._id,
            });

            if (!dbOrder) {
                throw new Error("Somethings wents wronge!");
            }

            await dbOrder.save({ validateModifiedOnly: true });

            dbOrder.medicineList.map(async (item) => {
                let orderMedicinesInventory = await InventoryModel.findOne({
                    medicineId: item.medicineId,
                });

                if (orderMedicinesInventory?.quantity) {
                    orderMedicinesInventory.quantity -= item.quantity;

                    await orderMedicinesInventory.save({
                        validateModifiedOnly: true,
                    });
                }
            });

            // send notification email to the user

            return res.status(201).json({
                success: true,
                message: "Order placed successfully",
            });
        } catch (error: any) {
            console.log("ERROR IN PLACE ORDER :", error.message);
            return next(new ErrorHandler(error.message, 500));
        }
    }
);

export const getById = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const orderId = req.params.orderId;
            if (!orderId) {
                throw new Error("Missing order id!");
            }

            if (!mongoose.Types.ObjectId.isValid(orderId)) {
                throw new Error("Invalid order id!");
            }

            const dbOrder = await OrderModel.findById(orderId);

            if (!dbOrder) {
                throw new Error("Order not found!");
            }

            return res.status(200).json({
                success: true,
                order: dbOrder,
            });
        } catch (error: any) {
            console.log("ERROR IN ORDER GET BY ID :", error.message);
            return next(new ErrorHandler(error.message, 500));
        }
    }
);

export const getAllOrder = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const query = req.body || {};

            const dbOrders = await OrderModel.find(query);

            if (dbOrders.length < 1) {
                throw new Error("No orders with the corsponding query!");
            }

            return res.status(200).json({
                success: true,
                orderLen: dbOrders.length,
                orders: dbOrders,
            });
        } catch (error: any) {
            console.log("ERROR IN ORDER GET ALL :", error.message);
            return next(new ErrorHandler(error.message, 500));
        }
    }
);

export const deleteOrder = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const deleteOrderId = req.params.orderId;

            if (!deleteOrderId) {
                throw new Error("Missing order id!");
            }

            if (!mongoose.Types.ObjectId.isValid(deleteOrderId)) {
                throw new Error("Invalid order id!");
            }

            const deletedOrder = await OrderModel.findByIdAndDelete(
                deleteOrderId
            );

            if (!deletedOrder) {
                throw new Error("Order not found!");
            }

            // todo : update invantory

            return res.status(200).json({
                success: true,
                message: `Order delelted sucessfully!`,
            });
        } catch (error: any) {
            console.log("ERROR IN DELETE ORDER : ", error.message);
            return next(new ErrorHandler(error.message, 500));
        }
    }
);

export const updateOrder = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const orderOption = req.body || {};
            const orderId = req.params.orderId;

            if (!orderId) {
                throw new Error("Missing order id!");
            }

            if (!mongoose.Types.ObjectId.isValid(orderId)) {
                throw new Error("Invalid order id!");
            }

            if (!orderOption) {
                throw new Error("Missing order data!");
            }

            const updatedOrder = await OrderModel.findByIdAndUpdate(
                orderId,
                { $set: orderOption },
                { new: true }
            );

            if (!updatedOrder) {
                throw new Error("Order not found!");
            }

            return res.status(201).json({
                success: true,
                message: "Order updated successfully!",
                updatedOrder,
            });
        } catch (error: any) {
            console.log("ERROR IN UPDATE ERROR : ", error.message);
            return next(new ErrorHandler(error.message, 500));
        }
    }
);

export const cencelOrder = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const orderId = req.params.orderId;
            const { cencelationReason } = req.body;

            if (!orderId) {
                throw new Error("Missing order Id!");
            }

            if (!mongoose.Types.ObjectId.isValid(orderId)) {
                throw new Error("Invalid order id!");
            }
        } catch (error: any) {
            console.log("ERROR IN CENCEL ORDER : ", error.message);
            return next(new ErrorHandler(error.message, 500));
        }
    }
);
