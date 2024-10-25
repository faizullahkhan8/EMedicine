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

/**
 * Test route for orders.
 * This route can be used to verify that authentication is working.
 * Accessible to authenticated users.
 */
router.get("/test", isAuthenticated, test);

/**
 * Route to place a new order.
 * Accessible to any authenticated user.
 */
router.post("/place", isAuthenticated, placeOrder);

/**
 * Route to get details of a specific order by its ID.
 * Accessible to any authenticated user.
 */
router.get("/get/:orderId", isAuthenticated, getById);

/**
 * Route to get all orders.
 * Accessible to any authenticated user.
 */
router.get("/all", isAuthenticated, getAllOrder);

/**
 * Route to delete an order by its ID.
 * Accessible to authenticated users, but you may want to limit this to certain roles (e.g., 'admin') in the future.
 */
router.delete("/:orderId", isAuthenticated, deleteOrder);

/**
 * Route to update an order by its ID.
 * Only users with the 'admin' role can update orders.
 */
router.put("/:orderId", isAuthenticated, authorizeRole("admin"), updateOrder);

export default router;
