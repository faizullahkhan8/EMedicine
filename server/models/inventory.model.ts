import mongoose, { Document, Schema } from "mongoose";

// Interface defining the structure of the Inventory document
interface IInventoryOptions extends Document {
    medicineId: mongoose.Types.ObjectId; // Reference to the associated medicine
    quantity: number; // Quantity of the medicine in stock
}

// Schema definition for the Inventory model
const inventorySchema: Schema<IInventoryOptions> = new mongoose.Schema(
    {
        medicineId: {
            type: mongoose.SchemaTypes.ObjectId, // Using ObjectId type for referencing
            ref: "Medicines", // Reference to the Medicines collection
            required: true, // This field is required
        },
        quantity: {
            type: Number, // Quantity must be a number
            required: true, // This field is required
            default: 0, // Default value set to 0
        },
    },
    { timestamps: true } // Automatically manage createdAt and updatedAt fields
);

// Inventory model based on the inventory schema
const InventoryModel: mongoose.Model<IInventoryOptions> = mongoose.model(
    "Inventory",
    inventorySchema,
    "Inventory" // Collection name in the database
);

export default InventoryModel; // Exporting the model for use in other parts of the application
