import {
    Document,
    model,
    Model,
    ObjectId,
    Schema,
    SchemaTypes,
} from "mongoose";

// Define the structure of TokenOptions data for MongoDB
interface ITokenOptions extends Document {
    token: string; // JWT or any authentication token
    userId: ObjectId; // References the User document
}

// Define the schema for the Token model
const tokenSchema: Schema<ITokenOptions> = new Schema(
    {
        token: {
            type: String,
            required: [true, "Token is required!"], // Ensures the token field is not empty
            trim: true, // Removes extra whitespace before saving
        },
        userId: {
            type: SchemaTypes.ObjectId,
            ref: "Users", // References the User model for relational data
            required: [true, "User ID is required!"], // Ensures userId is present
        },
    },
    {
        timestamps: true, // Automatically creates `createdAt` and `updatedAt` timestamps
        versionKey: false, // Disables the `__v` field for cleaner documents
        strict: true, // Ensures that only defined schema fields are saved to the DB
    }
);

// Optional: Virtual field to return token information without modifying the original schema
tokenSchema.virtual("user", {
    ref: "Users",
    localField: "userId",
    foreignField: "_id",
    justOne: true,
});

// Indexes for optimization - Index the token field for faster search queries
tokenSchema.index({ token: 1 }, { unique: true });

// Pre-save hook (if needed): Example for adding custom logic before saving
tokenSchema.pre<ITokenOptions>("save", function (next) {
    // Logic before saving a token, e.g., encrypting the token (if applicable)
    next();
});

// Create the Token model with schema
const TokenModel: Model<ITokenOptions> = model<ITokenOptions>(
    "Tokens",
    tokenSchema,
    "Tokens"
);

// Export the token model to use in other parts of the app
export default TokenModel;
