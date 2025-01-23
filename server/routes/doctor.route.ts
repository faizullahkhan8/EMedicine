import { Router } from "express";
import { authorizeRole, isAuthenticated } from "../middlewares/auth";
import {
    approveDoctorAccount,
    requestDoctorAccount,
} from "../controllers/doctor.controller";

const router = Router();

router.get("/test", (req, res) => {
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

export default router;
