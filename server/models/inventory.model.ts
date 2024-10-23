import mongoose, { Document, Schema } from "mongoose";

interface IInventoryOptions extends Document {
    medicineId: mongoose.Types.ObjectId;
    quantity: number;
}

const inventorySchema: Schema<IInventoryOptions> = new mongoose.Schema(
    {
        medicineId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Medicines",
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    { timestamps: true }
);

const InventoryModel: mongoose.Model<IInventoryOptions> = mongoose.model(
    "Inventory",
    inventorySchema,
    "Inventory"
);

export default InventoryModel;
