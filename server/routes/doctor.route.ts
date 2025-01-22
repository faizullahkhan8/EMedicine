import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth";
import { requestDoctorAccount } from "../controllers/doctor.controller";

const router = Router();

router.get("/test", (req, res) => {
    return res.status(200).json({
        success: true,
        message: "working!",
    });
});

router.post("/request-account", isAuthenticated, requestDoctorAccount);

export default router;
