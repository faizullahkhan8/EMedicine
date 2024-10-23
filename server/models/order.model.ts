import mongoose, { Document } from "mongoose";

export interface IOrderOptions extends Document {
    userId: mongoose.Types.ObjectId;
    medicineList: [{ medicineId: mongoose.Types.ObjectId; quantity: number }];
    totalPrice: number;
    deliveryAddress: string;
    status: "delivered" | "shipped" | "inProgress" | "cenceled";
    paymentMethod: string;
    cencelationReason?: string;
}

const orderSchema: mongoose.Schema<IOrderOptions> = new mongoose.Schema(
    {
        userId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Users",
            required: true,
        },
        medicineList: [
            {
                medicineId: mongoose.SchemaTypes.ObjectId,
                quantity: Number,
                totalPrice: Number,
            },
        ],
        totalPrice: {
            type: Number,
            required: true,
        },
        deliveryAddress: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
            default: "inProgress",
        },
        paymentMethod: {
            type: String,
            required: true,
        },
        cencelationReason: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const OrderModel: mongoose.Model<IOrderOptions> = mongoose.model(
    "Orders",
    orderSchema,
    "Orders"
);

export default OrderModel;
