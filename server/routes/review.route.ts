import { Router } from "express";
import { authorizeRole, isAuthenticated } from "../middlewares/auth";
import {
    createReviewReply,
    deleteMedicineReview,
    getById,
    getMedicineReviews,
    submitReview,
} from "../controllers/review.controller";

const router = Router();

/**
 * Route to submit a new review for a medicine.
 * Accessible to any authenticated user.
 */
router.post("/create", isAuthenticated, submitReview);

/**
 * Route to get all reviews for a specific medicine by its ID.
 * Accessible to any authenticated user.
 */
router.get(
    "/medicine-reviews/:medicineId",
    isAuthenticated,
    getMedicineReviews
);

/**
 * Route to get details of a specific review by its ID.
 * Accessible to any authenticated user.
 */
router.get("/get/:reviewId", isAuthenticated, getById);

/**
 * Route to delete a review for a specific medicine.
 * Accessible to authenticated users (authorization role-based control can be uncommented).
 */
router.delete(
    "/:medicineId/delete/:reviewId",
    isAuthenticated,
    // authorizeRole("admin", "user"), // Uncomment if roles are needed
    deleteMedicineReview
);

/**
 * Route to reply to a review.
 * Only users with the 'admin' role can reply to reviews.
 */
router.post(
    "/reply/:reviewId",
    isAuthenticated,
    authorizeRole("admin"),
    createReviewReply
);

export default router;
