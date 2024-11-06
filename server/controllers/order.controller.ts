import { NextFunction, Response, Request } from "express";
import { CatchAsyncError } from "../middlewares/catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import OrderModel, { IOrderOptions } from "../models/order.model";
import MedicineModel from "../models/medicine.model";
import mongoose from "mongoose";
import InventoryModel from "../models/inventory.model";
import NotificationModel from "../models/notification.model";
import { getReciverSocketId, io } from "../socket/socket";

// Test route to check API is working
export const test = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        return res.status(200).json({
            success: true,
            message: "Working successfully!",
        });
    }
);

interface IOrderItemOptions {
    medicineId: mongoose.Types.ObjectId;
    quantity: number;
    totalPrice: number;
}

// Place a new order
export const placeOrder = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        const { medicineList, deliveryAddress, paymentMethod } =
            req.body as IOrderOptions;

        // Validate order data
        if (!medicineList.length || !deliveryAddress || !paymentMethod) {
            return next(new ErrorHandler("Order data is missing!", 400));
        }

        // Validate medicine quantity
        if (medicineList.some((med) => med.quantity < 1)) {
            return next(
                new ErrorHandler(
                    "Each medicine quantity must be greater than '0'.",
                    400
                )
            );
        }

        try {
            // Process each medicine and calculate total price
            const orderMedicines: IOrderItemOptions[] = await Promise.all(
                medicineList.map(async (medicine) => {
                    const dbMedicine = await MedicineModel.findById(
                        medicine.medicineId
                    );

                    if (!dbMedicine) {
                        throw new ErrorHandler("Medicine not found.", 404);
                    }

                    const inventory = await InventoryModel.findOne({
                        medicineId: medicine.medicineId,
                    });

                    if (!inventory || inventory.quantity < medicine.quantity) {
                        throw new ErrorHandler(
                            `${dbMedicine.name} is out of stock or insufficient in inventory.`,
                            400
                        );
                    }

                    const totalPrice = dbMedicine.price * medicine.quantity;

                    return {
                        medicineId: dbMedicine._id,
                        quantity: medicine.quantity,
                        totalPrice,
                    } as any;
                })
            );

            const totalOrderPrice = orderMedicines.reduce(
                (sum, item) => sum + item.totalPrice,
                0
            );

            // Save the new order in database
            const newOrder = new OrderModel({
                medicineList: orderMedicines,
                totalPrice: totalOrderPrice.toFixed(2),
                paymentMethod,
                userId: req.user._id,
                deliveryAddress,
            });

            await newOrder.save({ validateModifiedOnly: true });

            // Update inventory quantities
            await Promise.all(
                orderMedicines.map(async (item) => {
                    const inventory = await InventoryModel.findOne({
                        medicineId: item.medicineId,
                    });
                    if (inventory) {
                        inventory.quantity -= item.quantity;
                        await inventory.save({ validateModifiedOnly: true });
                    }
                })
            );

            // send the notification via socket.io if user has enabled
            if (req.user.notification) {
                // create the instance of notificaton
                const notification = new NotificationModel({
                    userId: req.user._id,
                    type: "order",
                    message: "Order placed successfully",
                });

                await notification.save({ validateModifiedOnly: true });

                const userSocketId = getReciverSocketId(req.user._id);

                if (userSocketId) {
                    io.to(userSocketId).emit("notification", notification);
                }
            }

            return res.status(201).json({
                success: true,
                message: "Order placed successfully.",
                order: newOrder,
            });
        } catch (error: any) {
            console.error("ERROR IN PLACE ORDER :", error.message);
            return next(new ErrorHandler(error.message, 500));
        }
    }
);

// Retrieve a specific order by ID
export const getById = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        const { orderId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(orderId)) {
            return next(new ErrorHandler("Invalid order ID format.", 400));
        }

        try {
            const order = await OrderModel.findById(orderId);
            if (!order) {
                return next(new ErrorHandler("Order not found.", 404));
            }

            return res.status(200).json({
                success: true,
                order,
            });
        } catch (error: any) {
            console.error("ERROR IN ORDER GET BY ID:", error.message);
            return next(new ErrorHandler(error.message, 500));
        }
    }
);

// Retrieve all orders with optional query filters
export const getAllOrders = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        const query = req.body || {};

        try {
            const orders = await OrderModel.find(query);
            if (!orders.length) {
                return next(
                    new ErrorHandler(
                        "No orders found for the given query.",
                        404
                    )
                );
            }

            return res.status(200).json({
                success: true,
                totalOrders: orders.length,
                orders,
            });
        } catch (error: any) {
            console.error("ERROR IN GET ALL ORDERS:", error.message);
            return next(new ErrorHandler(error.message, 500));
        }
    }
);

// Delete an order by ID
export const deleteOrder = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        const { orderId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(orderId)) {
            return next(new ErrorHandler("Invalid order ID format.", 400));
        }

        try {
            const deletedOrder = await OrderModel.findByIdAndDelete(orderId);
            if (!deletedOrder) {
                return next(new ErrorHandler("Order not found.", 404));
            }

            // Optionally: Update inventory if necessary

            return res.status(200).json({
                success: true,
                message: "Order deleted successfully.",
            });
        } catch (error: any) {
            console.error("ERROR IN DELETE ORDER:", error.message);
            return next(new ErrorHandler(error.message, 500));
        }
    }
);

// Update an order by ID
export const updateOrder = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        const { orderId } = req.params;
        const updateData = req.body;

        if (!mongoose.Types.ObjectId.isValid(orderId)) {
            return next(new ErrorHandler("Invalid order ID format.", 400));
        }

        if (!updateData) {
            return next(new ErrorHandler("Order update data is missing.", 400));
        }

        try {
            const updatedOrder = await OrderModel.findByIdAndUpdate(
                orderId,
                updateData,
                { new: true }
            );

            if (!updatedOrder) {
                return next(new ErrorHandler("Order not found.", 404));
            }

            // send the notification via socket.io if user has enabled
            if (req.user.notification) {
                // create the instance of notificaton
                const notification = new NotificationModel({
                    userId: req.user._id,
                    type: "order",
                    message: `Order status changed to ${updatedOrder.status}`,
                });

                await notification.save({ validateModifiedOnly: true });

                const userSocketId = getReciverSocketId(req.user._id);

                if (userSocketId) {
                    io.to(userSocketId).emit("notification", notification);
                }
            }

            return res.status(200).json({
                success: true,
                message: "Order updated successfully.",
                order: updatedOrder,
            });
        } catch (error: any) {
            console.error("ERROR IN UPDATE ORDER:", error.message);
            return next(new ErrorHandler(error.message, 500));
        }
    }
);

// Cancel an order
export const cancelOrder = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        const { orderId } = req.params;
        const { cancellationReason } = req.body;

        if (!mongoose.Types.ObjectId.isValid(orderId)) {
            return next(new ErrorHandler("Invalid order ID format.", 400));
        }

        if (!cancellationReason) {
            return next(
                new ErrorHandler("Cancellation reason is required.", 400)
            );
        }

        try {
            const order = await OrderModel.findById(orderId);
            if (!order) {
                return next(new ErrorHandler("Order not found.", 404));
            }

            if (
                order.status === "canceled" ||
                order.status === "delivered" ||
                order.status === "shipped"
            ) {
                return next(
                    new ErrorHandler("Order cannot be cencelled now", 400)
                );
            }

            order.status = "canceled";
            order.cancellationReason = cancellationReason;
            await order.save();

            await Promise.all([
                order.medicineList.map(async (medicine) => {
                    const medicineInentory = await InventoryModel.findOne({
                        medicineId: medicine.medicineId,
                    });

                    //[ATTENTION] review leter for (if the medicineInventory.quantity is "0" then what wil happen)

                    if (medicineInentory?.quantity) {
                        medicineInentory.quantity += medicine.quantity;

                        medicineInentory.save({ validateModifiedOnly: true });
                    }
                }),
            ]);

            // send the notification via socket.io if user has enabled
            if (req.user.notification) {
                // create the instance of notificaton
                const notification = new NotificationModel({
                    userId: req.user._id,
                    type: "order",
                    message: `Order cancelled successfully.`,
                });

                await notification.save({ validateModifiedOnly: true });

                const userSocketId = getReciverSocketId(req.user._id);

                if (userSocketId) {
                    io.to(userSocketId).emit("notification", notification);
                }
            }

            return res.status(200).json({
                success: true,
                message: "Order cancelled successfully.",
                order,
            });
        } catch (error: any) {
            console.error("ERROR IN CANCEL ORDER:", error.message);
            return next(new ErrorHandler(error.message, 500));
        }
    }
);
