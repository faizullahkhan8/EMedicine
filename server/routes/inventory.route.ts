import { Router } from "express";
import { authorizeRole, isAuthenticated } from "../middlewares/auth";
import {
    getByMedicineId,
    lowQuantityProductsAlert,
    updateInventory,
} from "../controllers/inventory.controller";

const router = Router();

router.get("/test", isAuthenticated, (req, res, next) => {
    return res.status(200).json({
        success: true,
        message: "working!",
    });
});

router.get(
    "/get/:medicineId",
    isAuthenticated,
    authorizeRole("admin"),
    getByMedicineId
);
router.put(
    "/:medicineId",
    isAuthenticated,
    authorizeRole("admin"),
    updateInventory
);
router.get(
    "/low-quantity-products",
    isAuthenticated,
    authorizeRole("admin"),
    lowQuantityProductsAlert
);

export default router;
