import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth";
import {
    getUserNotifications,
    toggleNotification,
} from "../controllers/notification.controller";

const router = Router();

// Health check route to verify API status
router.get("/test", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Notification API is working correctly!",
    });
});

// Get user notifications (Requires authentication)
router.get("/get/user-notification", isAuthenticated, getUserNotifications);

// Toggle notification settings for a user (Requires authentication)
router.post("/toggle", isAuthenticated, toggleNotification);

export default router;
