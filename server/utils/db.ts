// Importing Mongoose to interact with MongoDB
import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Retrieve the database connection string from environment variables
const dbUrl: string = process.env.DB_URI || "";

// Function to establish a connection to MongoDB
const connectDB = async (): Promise<void> => {
    try {
        // Attempt to connect to MongoDB using the provided URI
        await mongoose.connect(dbUrl);
        console.log("Database connected successfully");
    } catch (error: any) {
        // Log the error message and retry connection after 5 seconds in case of failure
        console.error("Database connection failed:", error.message);
        setTimeout(connectDB, 5000); // Retry after 5 seconds
    }
};

export default connectDB;
