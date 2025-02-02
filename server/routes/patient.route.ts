import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth";
import {
    getDoctorNo,
    getIndividualPatients,
    getPatientsOfDoctor,
    removePatient,
    test,
} from "../controllers/patient.controller";

const router = Router();

router.get("/test", isAuthenticated, test);

router.post("/get-no/:doctorId", isAuthenticated, getDoctorNo);

router.get("/get-all-patients/:doctorId", isAuthenticated, getPatientsOfDoctor);
router.get("/get-patient/:doctorId", isAuthenticated, getIndividualPatients);

router.delete(
    "/remove-spacific-patient/:doctorId",
    isAuthenticated,
    removePatient
);

export default router;
