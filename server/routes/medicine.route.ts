import { Router } from "express";
import { authorizeRole, isAuthenticated } from "../middlewares/auth";
import {
    createMedicine,
    deleteMedicine,
    getAllMedicines,
    getById,
    listPopularMedince,
    updateMedicine,
} from "../controllers/medicine.controller";

const router = Router();

router.post(
    "/create",
    isAuthenticated,
    authorizeRole("doctor", "admin"),
    createMedicine
);

router.post(
    "/update/:medicineId",
    isAuthenticated,
    authorizeRole("doctor", "admin"),
    updateMedicine
);
router.get("/get/:medicineId", isAuthenticated, getById);
router.get("/popular", isAuthenticated, listPopularMedince);
router.get("/all", isAuthenticated, getAllMedicines);
router.delete(
    "/:medicineId",
    isAuthenticated,
    authorizeRole("admin", "doctor"),
    deleteMedicine
);

export default router;
