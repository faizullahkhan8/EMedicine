import { NextFunction, Request, Response, Router } from "express";
import { isAuthenticated } from "../middlewares/auth";
import {
    getOrdersAnaylyticsData,
    getUsersAnaylyticsData,
} from "../controllers/analytics.controller";

const router = Router();

router.get("/test", (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({
        success: true,
        message: "Working successfully.",
    });
});

router.get("/get-user-data", isAuthenticated, getUsersAnaylyticsData);
router.get("/get-order-data", isAuthenticated, getOrdersAnaylyticsData);

export default router;
