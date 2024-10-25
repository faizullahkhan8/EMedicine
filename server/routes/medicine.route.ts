import { Router } from "express";
import { authorizeRole, isAuthenticated } from "../middlewares/auth";
import {
    createMedicine,
    deleteMedicine,
    getAllMedicines,
    getById,
    listPopularMedicine,
    updateMedicine,
} from "../controllers/medicine.controller";

const router = Router();

/**
 * Route to create a new medicine.
 * Only authenticated users with roles 'doctor' or 'admin' can create medicines.
 */
router.post(
    "/create",
    isAuthenticated,
    authorizeRole("doctor", "admin"),
    createMedicine
);

/**
 * Route to update an existing medicine by its ID.
 * Only authenticated users with roles 'doctor' or 'admin' can update medicines.
 */
router.post(
    "/update/:medicineId",
    isAuthenticated,
    authorizeRole("doctor", "admin"),
    updateMedicine
);

/**
 * Route to get a specific medicine by its ID.
 * This route is accessible to any authenticated user.
 */
router.get("/get/:medicineId", isAuthenticated, getById);

/**
 * Route to list popular medicines.
 * Accessible to authenticated users.
 */
router.get("/popular", isAuthenticated, listPopularMedicine);

/**
 * Route to get all medicines.
 * Accessible to authenticated users.
 */
router.get("/all", isAuthenticated, getAllMedicines);

/**
 * Route to delete a medicine by its ID.
 * Only authenticated users with roles 'admin' or 'doctor' can delete medicines.
 */
router.delete(
    "/:medicineId",
    isAuthenticated,
    authorizeRole("admin", "doctor"),
    deleteMedicine
);

export default router;
