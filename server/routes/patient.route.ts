import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth";
import { getDoctorNo, test } from "../controllers/patient.controller";

const router = Router();

router.get("/test", isAuthenticated, test);

router.post("/get-no/:doctorId", isAuthenticated, getDoctorNo);

export default router;
