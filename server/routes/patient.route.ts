import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth";
import { test } from "../controllers/patient.controller";

const router = Router();

router.get("/test", isAuthenticated, test);

export default router;
