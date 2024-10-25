import mongoose, { Schema, model, Document, Model } from "mongoose";
import ReviewModel from "./review.model";

// Interface defining the structure of the Medicine document
export interface IMedicineOptions extends Document {
    userId: mongoose.Types.ObjectId; // Reference to the user who added the medicine
    name: string; // Name of the medicine
    category: string; // Category of the medicine
    price: number; // Price of the medicine
    discount?: number; // Optional discount on the medicine
    expiryDate: Date; // Expiration date of the medicine
    mfgDate: Date; // Manufacturing date of the medicine
    mfgLicenceNo: number; // Manufacturing license number
    manufacturer: string; // Manufacturer of the medicine
    imageUrl?: string; // Optional URL for the medicine's image
    rating?: number; // Optional rating of the medicine
    reviews?: mongoose.Types.ObjectId[]; // Array of associated review IDs
    sideEffects: string[]; // List of potential side effects
    usageDetails: string; // Instructions on how to use the medicine
    type: string; // Type of medicine (e.g., tablet, syrup, capsule)
    popularity?: number; // Optional popularity score
    isDeleted: boolean; // Flag for soft deletion
    deletedBy?: mongoose.Types.ObjectId; // ID of the user who deleted the medicine
}

// Schema definition for the Medicine model
const medicineSchema: Schema<IMedicineOptions> = new Schema(
    {
        userId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Users", // Reference to the Users collection
            required: true,
        },
        name: {
            type: String,
            required: true,
            trim: true, // Trims whitespace from the input
        },
        category: {
            type: String,
            required: true,
            trim: true, // Trims whitespace from the input
        },
        price: {
            type: Number,
            required: true,
        },
        discount: {
            type: Number,
            default: 0, // Default discount set to 0 if not specified
        },
        mfgDate: {
            type: Date,
            required: true,
        },
        mfgLicenceNo: {
            type: Number,
            required: true,
        },
        expiryDate: {
            type: Date,
            required: true,
        },
        manufacturer: {
            type: String,
            required: true,
            trim: true, // Trims whitespace from the input
        },
        imageUrl: {
            type: String,
            trim: true, // Trims whitespace from the input
        },
        rating: {
            type: Number,
            default: 0, // Default rating set to 0
        },
        reviews: {
            type: [mongoose.SchemaTypes.ObjectId], // Array of references to reviews
            ref: "Reviews",
        },
        sideEffects: {
            type: [String], // List of side effects
            trim: true,
        },
        usageDetails: {
            type: String,
            trim: true, // Trims whitespace from the input
        },
        type: {
            type: String,
            required: true, // Type is a required field
        },
        popularity: {
            type: Number,
            default: 0, // Default popularity set to 0
        },
        isDeleted: {
            type: Boolean,
            default: false, // Default isDeleted flag set to false
        },
        deletedBy: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Users", // Reference to the Users collection
        },
    },
    {
        timestamps: true, // Automatically manages createdAt and updatedAt fields
    }
);

// Pre-hook to delete associated reviews when a medicine is deleted
medicineSchema.pre<IMedicineOptions>("deleteOne", async function (next) {
    await ReviewModel.deleteMany({ medicineId: { $eq: this._id } }); // Delete all reviews associated with the medicine
    next(); // Proceed to the next middleware or function
});

// Medicine model based on the medicine schema
const MedicineModel: Model<IMedicineOptions> = model(
    "Medicines",
    medicineSchema,
    "Medicines" // Collection name in the database
);

export default MedicineModel; // Exporting the model for use in other parts of the application
