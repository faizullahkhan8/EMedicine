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

// Health check route to verify API status
router.get("/test", isAuthenticated, test);

// Get the doctor's number by doctorId (Requires authentication)
router.post("/get-no/:doctorId", isAuthenticated, getDoctorNo);

// Get all patients associated with a specific doctor (Requires authentication)
router.get("/get-all-patients/:doctorId", isAuthenticated, getPatientsOfDoctor);

// Get details of an individual patient by doctorId (Requires authentication)
router.get("/get-patient/:doctorId", isAuthenticated, getIndividualPatients);

// Remove a specific patient from a doctor's list (Requires authentication)
router.delete(
    "/remove-specific-patient/:doctorId",
    isAuthenticated,
    removePatient
);

export default router;
