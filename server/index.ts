// Import required modules
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ErrorMiddleware } from "./middlewares/error.middleware";
import ErrorHandler from "./utils/ErrorHandler";

// Import the Express app instance and the database connection utility
import connectDB from "./utils/db";
import { app, server } from "./socket/socket";

// Import routers
import userRouter from "./routes/user.route";
import medicineRouter from "./routes/medicine.route";
import reviewRoute from "./routes/review.route";
import orderRoute from "./routes/order.route";
import inventoryRoute from "./routes/inventory.route";
import notificationRoute from "./routes/notification.route";
import doctorRoute from "./routes/doctor.route";

// // // Create Express app instance
// export const app = express();
// export const server = http.createServer(app);
// export const io = new Server(server);

// Configure middleware
app.use(express.json({ limit: "50mb" })); // Parse JSON requests
app.use(cookieParser()); // Parse cookies
app.use(
    cors({
        origin: [process.env.ORIGIN || ""],
        methods: ["POST", "GET", "PUT", "DELETE"],
        credentials: true,
    })
); // Enable CORS

// Define API routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/medicine", medicineRouter);
app.use("/api/v1/review", reviewRoute);
app.use("/api/v1/order", orderRoute);
app.use("/api/v1/inventory", inventoryRoute);
app.use("/api/v1/notification", notificationRoute);
app.use("/api/v1/doctor", doctorRoute);

// Health check endpoint
app.get("/test", (req: Request, res: Response, next: NextFunction) => {
    return res
        .status(200)
        .json({ success: true, message: "API working successfully" });
});

// Catch-all route for unknown endpoints
app.all("*", (req: Request, res: Response, next: NextFunction) => {
    return next(new ErrorHandler(`Route ${req.originalUrl} not found`, 404));
});

// Error handling middleware
app.use(ErrorMiddleware);

// Load environment variables from the .env file, making them accessible throughout the application
import dotenv from "dotenv";
dotenv.config();

// Retrieve the port number from environment variables or use a default port (8000) if not specified
const PORT = process.env.PORT || 8000;

// Start the server and listen for incoming requests on the specified port
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);

    // Establish connection to the database when the server starts
    connectDB();
});
