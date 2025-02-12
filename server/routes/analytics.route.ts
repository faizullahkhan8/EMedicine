import { NextFunction, Request, Response, Router } from "express";
import { isAuthenticated } from "../middlewares/auth";
import {
    getOrdersAnaylyticsData,
    getUsersAnaylyticsData,
} from "../controllers/analytics.controller";

const router = Router();

// Health check route to verify API status
router.get("/test", (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({
        success: true,
        message: "Analytics routes are working successfully.",
    });
});

// Get analytics data for users (Requires authentication)
router.get("/get-user-data", isAuthenticated, getUsersAnaylyticsData);

// Get analytics data for orders (Requires authentication)
router.get("/get-order-data", isAuthenticated, getOrdersAnaylyticsData);

export default router;
