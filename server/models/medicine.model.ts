import mongoose, { Schema, model, Document, Model } from "mongoose";
import ReviewModel from "./review.model";

export interface IMedicineOptions extends Document {
    userId: mongoose.Types.ObjectId;
    name: string;
    category: string;
    price: number;
    discount?: number;
    expiryDate: Date;
    mfgDate: Date;
    mfgLicenceNo: number;
    manufacturer: string;
    imageUrl?: string;
    rating?: number;
    reviews?: mongoose.Types.ObjectId[];
    sideEffects: [string];
    usageDetails: string;
    type: string; // e.g tablet,syrups,capsoule etc
    popularity?: number;
    isDeleted: boolean;
    deletedBy: mongoose.Types.ObjectId;
}

const medicineSchema: Schema<IMedicineOptions> = new Schema(
    {
        userId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Users",
            required: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        category: {
            type: String,
            required: true,
            trim: true,
        },
        price: {
            type: Number,
            required: true,
        },
        discount: {
            type: Number,
            required: true,
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
            trim: true,
        },
        imageUrl: {
            type: String,
            trim: true,
        },
        rating: {
            type: Number,
            default: 0,
        },
        reviews: {
            type: [mongoose.SchemaTypes.ObjectId],
            ref: "Reviews",
        },
        sideEffects: {
            type: [String],
            trim: true,
        },
        usageDetails: {
            type: String,
            trim: true,
        },
        type: {
            type: String,
            required: true,
        },
        popularity: {
            type: Number,
            default: 0,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
        deletedBy: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Users",
        },
    },
    {
        timestamps: true,
    }
);

medicineSchema.pre<IMedicineOptions>("deleteOne", async function (next) {
    await Promise.all([
        ReviewModel.deleteMany({ medicineId: { $eq: this._id } }),
    ]);
});

const MedicineModel: Model<IMedicineOptions> = model(
    "Medicines",
    medicineSchema,
    "Medicines"
);

export default MedicineModel;
