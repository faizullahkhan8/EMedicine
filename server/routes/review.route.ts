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

router.post("/create", isAuthenticated, submitReview);
router.get(
    "/medicine-reviews/:medicineId",
    isAuthenticated,
    getMedicineReviews
);
router.get("/get/:reviewId", isAuthenticated, getById);

router.delete(
    "/:medicineId/delete/:reviewId",
    isAuthenticated,
    // authorizeRole("admin", "user"),
    deleteMedicineReview
);

// REVIEW REPLY ROUTES
router.post(
    "/reply/:reviewId",
    isAuthenticated,
    authorizeRole("admin"),
    createReviewReply
);

export default router;
