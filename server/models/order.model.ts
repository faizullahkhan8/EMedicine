import mongoose, { Document } from "mongoose";

// Interface defining the structure of the Order document
export interface IOrderOptions extends Document {
    userId: mongoose.Types.ObjectId; // Reference to the user who placed the order
    medicineList: { medicineId: mongoose.Types.ObjectId; quantity: number }[]; // List of medicines with their quantities
    totalPrice: number; // Total price of the order
    deliveryAddress: string; // Address where the order will be delivered
    status: "delivered" | "shipped" | "inProgress" | "canceled"; // Current status of the order
    paymentMethod: string; // Method used for payment (e.g., credit card, PayPal)
    cancellationReason?: string; // Optional reason for cancellation
}

// Schema definition for the Order model
const orderSchema: mongoose.Schema<IOrderOptions> = new mongoose.Schema(
    {
        userId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Users", // Reference to the Users collection
            required: true, // This field is required
        },
        medicineList: [
            {
                medicineId: {
                    type: mongoose.SchemaTypes.ObjectId, // Reference to the Medicine ID
                    required: true, // Medicine ID is required
                    ref: "Medicines", // Reference to the Medicines collection
                },
                quantity: {
                    type: Number,
                    required: true, // Quantity is required
                    min: 1, // Minimum quantity should be 1
                },
            },
        ],
        totalPrice: {
            type: Number,
            required: true, // Total price is required
            min: 0, // Total price cannot be negative
        },
        deliveryAddress: {
            type: String,
            required: true, // Delivery address is required
        },
        status: {
            type: String,
            required: true,
            default: "inProgress", // Default status is "inProgress"
        },
        paymentMethod: {
            type: String,
            required: true, // Payment method is required
        },
        cancellationReason: {
            type: String,
            default: null, // Default value for cancellation reason is null
        },
    },
    {
        timestamps: true, // Automatically manage createdAt and updatedAt fields
    }
);

// Order model based on the order schema
const OrderModel: mongoose.Model<IOrderOptions> = mongoose.model(
    "Orders",
    orderSchema,
    "Orders" // Collection name in the database
);

export default OrderModel; // Exporting the model for use in other parts of the application
