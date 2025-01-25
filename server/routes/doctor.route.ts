import { Router } from "express";
import { authorizeRole, isAuthenticated } from "../middlewares/auth";
import {
    approveDoctorAccount,
    banDoctor,
    getAllDoctors,
    getAllNotApprovedDoctors,
    requestDoctorAccount,
} from "../controllers/doctor.controller";

const router = Router();

router.get("/test", isAuthenticated, (req, res) => {
    return res.status(200).json({
        success: true,
        message: "working!",
    });
});

router.post("/request-account", isAuthenticated, requestDoctorAccount);

router.post(
    "/approve-account-request/:accountId",
    isAuthenticated,
    authorizeRole("admin"),
    approveDoctorAccount
);

router.get("/get-all", isAuthenticated, getAllDoctors);

router.get(
    "/get-all-not-approved",
    isAuthenticated,
    authorizeRole("admin"),
    getAllNotApprovedDoctors
);

router.put(
    "/ban/:doctorId",
    isAuthenticated,
    authorizeRole("admin"),
    banDoctor
);

export default router;
