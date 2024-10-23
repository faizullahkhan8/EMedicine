// Import required modules
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ErrorMiddleware } from "./middlewares/error.middleware";
import ErrorHandler from "./utils/ErrorHandler";

// Import routers
import userRouter from "./routes/user.route";
import medicineRouter from "./routes/medicine.route";
import reviewRoute from "./routes/review.route";
import orderRoute from "./routes/order.route";
import inventoryRoute from "./routes/inventory.route";

// Create Express app instance
export const app = express();

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
