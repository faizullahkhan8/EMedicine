import mongoose, { Document, Model, Schema } from "mongoose";

// Interface defining the structure of the Review Reply document
export interface IReviewReplyOptions extends Document {
    userId: mongoose.Types.ObjectId; // Reference to the user who made the reply
    reviewId: mongoose.Types.ObjectId; // Reference to the review being replied to
    replyText: string; // Text content of the reply
}

// Schema definition for the Review Reply model
const reviewReplySchema: Schema<IReviewReplyOptions> = new Schema(
    {
        userId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Users", // Reference to the Users collection
            required: true, // This field is required
        },
        reviewId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Reviews", // Reference to the Reviews collection
            required: true, // This field is required
        },
        replyText: {
            type: String,
            required: true, // Reply text is required
            trim: true, // Trims whitespace from the beginning and end
        },
    },
    {
        timestamps: true, // Automatically manage createdAt and updatedAt fields
    }
);

// Review Reply model based on the review reply schema
const ReviewReplyModel: Model<IReviewReplyOptions> = mongoose.model(
    "ReviewsReply",
    reviewReplySchema,
    "ReviewsReply" // Collection name in the database
);

export default ReviewReplyModel; // Exporting the model for use in other parts of the application
