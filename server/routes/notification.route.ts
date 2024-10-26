import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth";
import {
    getUserNotifications,
    toggleNotification,
} from "../controllers/notification.controller";

const router = Router();

router.get("/test", (req, res) => {
    res.status(200).json({ success: true, message: "Working." });
});

router.get("/get/user-notification", isAuthenticated, getUserNotifications);
router.post("/toggle", isAuthenticated, toggleNotification);

export default router;
