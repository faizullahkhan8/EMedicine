import mongoose from "mongoose";

interface INotificationOptions extends mongoose.Document {
    userId: mongoose.Types.ObjectId;
    message: string;
    type: string;
    isRead: boolean;
}

const NotificationSchema: mongoose.Schema<INotificationOptions> =
    new mongoose.Schema(
        {
            userId: {
                type: mongoose.SchemaTypes.ObjectId,
                ref: "Users",
                required: [true, "user ID is required."],
            },
            message: {
                type: String,
                trim: true,
                required: [true, "Message is required."],
            },
            type: {
                type: String,
                trim: true,
                required: [true, "Notification type is required."],
            },
            isRead: {
                type: Boolean,
                default: false,
            },
        },
        {
            timestamps: true, // Automatically creates `createdAt` and `updatedAt` timestamps
            versionKey: false, // Disables the `__v` field for cleaner documents
            strict: true, // Ensures that only defined schema fields are saved to the DB
        }
    );

const NotificationModel: mongoose.Model<INotificationOptions> = mongoose.model(
    "Notifications",
    NotificationSchema,
    "Notifications"
);

export default NotificationModel;
