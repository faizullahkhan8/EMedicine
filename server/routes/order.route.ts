import { Router } from "express";
import { authorizeRole, isAuthenticated } from "../middlewares/auth";
import {
    deleteOrder,
    getAllOrder,
    getById,
    placeOrder,
    test,
    updateOrder,
} from "../controllers/order.controller";

const router = Router();

router.get("/test", isAuthenticated, test);
router.post("/place", isAuthenticated, placeOrder);
router.get("/get/:orderId", isAuthenticated, getById);
router.get("/all", isAuthenticated, getAllOrder);
router.delete("/:orderId", isAuthenticated, deleteOrder);
router.put("/:orderId", isAuthenticated, authorizeRole("admin"), updateOrder);

export default router;
