// Import necessary modules and middlewares
import { Router } from "express";
import { authorizeRole, isAuthenticated } from "../middlewares/auth";
import {
    getByMedicineId,
    lowQuantityProductsAlert,
    updateInventory,
} from "../controllers/inventory.controller";

// Initialize router
const router = Router();

// Test route to verify authentication and authorization
router.get("/test", isAuthenticated, (req, res, next) => {
    return res.status(200).json({
        success: true,
        message: "Inventory routes are working!",
    });
});

// Route to get inventory details by medicine ID
// Requires admin role authentication
router.get(
    "/get/:medicineId",
    isAuthenticated,
    authorizeRole("admin"),
    getByMedicineId
);

// Route to update inventory details by medicine ID
// Requires admin role authentication
router.put(
    "/:medicineId",
    isAuthenticated,
    authorizeRole("admin"),
    updateInventory
);

// Route to get low-quantity products alert
// Requires admin role authentication
router.get(
    "/low-quantity-products",
    isAuthenticated,
    authorizeRole("admin"),
    lowQuantityProductsAlert
);

// Export the router
export default router;
