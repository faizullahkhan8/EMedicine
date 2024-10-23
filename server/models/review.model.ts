import mongoose, { Document, Model, Schema } from "mongoose";
import ReviewReplyModel from "./reviewReply.model";

export interface IReviewOptions extends Document {
    userId: mongoose.Types.ObjectId;
    medicineId: mongoose.Types.ObjectId;
    reply: mongoose.Types.ObjectId[];
    reviewText: string;
    rating: number;
}

const reviewSchema: Schema<IReviewOptions> = new Schema(
    {
        userId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Users",
            required: true,
        },
        medicineId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Medicines",
            required: true,
        },
        reply: {
            type: [mongoose.SchemaTypes.ObjectId],
            ref: "ReviewsReply",
        },

        reviewText: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

reviewSchema.pre<IReviewOptions>("deleteOne", async function (next) {
    console.log("controll in review model", this._id);
    const review = this;
    await ReviewReplyModel.deleteMany({ reviewId: review._id });
    next();
});

const ReviewModel: Model<IReviewOptions> = mongoose.model(
    "Reviews",
    reviewSchema,
    "Reviews"
);

export default ReviewModel;
