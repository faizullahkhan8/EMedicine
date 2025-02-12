import { Router } from "express";
import { authorizeRole, isAuthenticated } from "../middlewares/auth";
import {
    approveDoctorAccount,
    banDoctor,
    getAllDoctors,
    getAllNotApprovedDoctors,
    requestDoctorAccount,
    setMaxPatients,
} from "../controllers/doctor.controller";

const router = Router();

// Test route to check if the API is working
router.get("/test", isAuthenticated, (req, res) => {
    return res
        .status(200)
        .json({ success: true, message: "API is working correctly!" });
});

// Request a doctor account (requires authentication)
router.post("/request-account", isAuthenticated, requestDoctorAccount);

// Approve a doctor's account request (Admin only)
router.post(
    "/approve-account-request/:accountId",
    isAuthenticated,
    authorizeRole("admin"),
    approveDoctorAccount
);

// Get all approved doctors (Authenticated users)
router.get("/get-all", isAuthenticated, getAllDoctors);

// Get all non-approved doctors (Admin only)
router.get(
    "/get-all-not-approved",
    isAuthenticated,
    authorizeRole("admin"),
    getAllNotApprovedDoctors
);

// Ban a doctor (Admin only)
router.put(
    "/ban/:doctorId",
    isAuthenticated,
    authorizeRole("admin"),
    banDoctor
);

// Set maximum number of patients for a doctor (Admin only)
router.put(
    "/set-max-patients",
    isAuthenticated,
    authorizeRole("admin"),
    setMaxPatients
);

export default router;
