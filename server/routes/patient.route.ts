import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth";
import {
    getDoctorNo,
    getPatientsOfDoctor,
    removePatient,
    test,
} from "../controllers/patient.controller";

const router = Router();

router.get("/test", isAuthenticated, test);

router.post("/get-no/:doctorId", isAuthenticated, getDoctorNo);

router.get("/get-patients/:doctorId", isAuthenticated, getPatientsOfDoctor);

router.delete(
    "/remove-spacific-patient/:doctorId",
    isAuthenticated,
    removePatient
);

export default router;
