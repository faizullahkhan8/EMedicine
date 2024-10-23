import mongoose, { Document, Model, Schema } from "mongoose";

export interface IReviewReplyOptions extends Document {
    userId: mongoose.Types.ObjectId;
    reviewId: mongoose.Types.ObjectId;
    replyText: string;
}

const reviewReplySchema: Schema<IReviewReplyOptions> = new Schema(
    {
        userId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Users",
            required: true,
        },
        reviewId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Reviews",
            required: true,
        },
        replyText: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const ReviewReplyModel: Model<IReviewReplyOptions> = mongoose.model(
    "ReviewsReply",
    reviewReplySchema,
    "ReviewsReply"
);

export default ReviewReplyModel;
