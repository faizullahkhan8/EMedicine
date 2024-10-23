import {
    Document,
    model,
    Model,
    ObjectId,
    Schema,
    SchemaTypes,
} from "mongoose";

interface ITokenOptions extends Document {
    token: string;
    userId: ObjectId;
}

const tokenSchema: Schema<ITokenOptions> = new Schema(
    {
        token: {
            type: String,
            required: [true, "Token is required!"],
        },
        userId: {
            type: SchemaTypes.ObjectId,
            ref: "Users",
            required: true,
        },
    },
    { timestamps: true }
);

const tokenModel: Model<ITokenOptions> = model("Tokens", tokenSchema, "Tokens");

export default tokenModel;
