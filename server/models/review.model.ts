import mongoose, { Document, Model, Schema } from "mongoose";
import ReviewReplyModel from "./reviewReply.model";

// Interface defining the structure of the Review document
export interface IReviewOptions extends Document {
    userId: mongoose.Types.ObjectId; // Reference to the user who made the review
    medicineId: mongoose.Types.ObjectId; // Reference to the medicine being reviewed
    reply: mongoose.Types.ObjectId[]; // Array of replies associated with the review
    reviewText: string; // Text content of the review
    rating: number; // Rating given by the user (e.g., 1-5 stars)
}

// Schema definition for the Review model
const reviewSchema: Schema<IReviewOptions> = new Schema(
    {
        userId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Users", // Reference to the Users collection
            required: true, // This field is required
        },
        medicineId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Medicines", // Reference to the Medicines collection
            required: true, // This field is required
        },
        reply: {
            type: [mongoose.SchemaTypes.ObjectId],
            ref: "ReviewsReply", // Reference to the Replies associated with the review
        },
        reviewText: {
            type: String,
            required: true, // Review text is required
            trim: true, // Trims whitespace from the beginning and end
        },
        rating: {
            type: Number,
            required: true, // Rating is required
            min: 0, // Minimum rating
            max: 5, // Maximum rating
            default: 0, // Default rating
        },
    },
    {
        timestamps: true, // Automatically manage createdAt and updatedAt fields
    }
);

// Middleware to delete associated replies when a review is deleted
reviewSchema.pre<IReviewOptions>("deleteOne", async function (next) {
    console.log("Deleting review with ID:", this._id); // Logging the review ID being deleted
    await ReviewReplyModel.deleteMany({ reviewId: this._id }); // Delete all replies associated with this review
    next(); // Proceed to the next middleware
});

// Review model based on the review schema
const ReviewModel: Model<IReviewOptions> = mongoose.model(
    "Reviews",
    reviewSchema,
    "Reviews" // Collection name in the database
);

export default ReviewModel; // Exporting the model for use in other parts of the application
