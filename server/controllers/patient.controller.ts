import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middlewares/catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import mongoose from "mongoose";
import DoctorModel from "../models/doctor.model";
import PatientModel from "../models/patient.model";

export const test = (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({
        success: true,
        message: "Working successfully.",
    });
};

export const getDoctorNo = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const doctorId = req.params.doctorId;

            if (!mongoose.Types.ObjectId.isValid(doctorId)) {
                return next(new ErrorHandler("Invalid doctor id", 400));
            }

            const dbDoctor = await DoctorModel.findById(doctorId);

            if (!dbDoctor) {
                return next(new ErrorHandler("Doctor not found", 404));
            }

            if (dbDoctor.ban.isBanned) {
                return next(
                    new ErrorHandler("Doctor is currently unavailable", 400)
                );
            }

            // time management logic goes here

            const currentDay = 1; //new Date().getDay();
            let isDoctorAvailableToday = false;

            dbDoctor.timing.daysInWeek.nameOfTheDays.map((day) => {
                if (currentDay === day) {
                    isDoctorAvailableToday = true;
                }
            });

            if (!isDoctorAvailableToday) {
                return next(
                    new ErrorHandler(
                        "Doctor not available today visit next time",
                        400
                    )
                );
            }

            // max patient logic goes here.

            const dbDoctorPatients = await PatientModel.findOne({
                doctorId: dbDoctor._id,
            });

            if (!dbDoctorPatients) {
                await PatientModel.create({
                    doctorId: dbDoctor._id,
                    patientInfo: [
                        {
                            patientId: req.user._id,
                            patientNo: 1,
                        },
                    ],
                    currentPatient: req.user._id,
                });

                return res.status(201).json({
                    success: true,
                    message: "You got doctor no successfully",
                });
            }

            const userId = req.user._id as string;

            dbDoctorPatients.patientInfo.map(
                (patient: { patientId: string; patientNo: number }) => {
                    if (patient.patientId.toString() === userId.toString()) {
                        return next(
                            new ErrorHandler(
                                "Patient already got a Number.",
                                400
                            )
                        );
                    }
                }
            );

            const newPatient = {
                patientId: req.user._id,
                patientNo: dbDoctorPatients.patientInfo.length + 1,
            } as { patientId: string; patientNo: number };

            dbDoctorPatients.patientInfo.push(newPatient);

            await dbDoctorPatients.save({ validateModifiedOnly: true });

            // send notification to the doctor as well as to the patient

            return res.status(201).json({
                success: true,
                message: "You got doctor no successfully",
            });
        } catch (error: any) {
            console.log("Error in get doctor no : ", error.message);
            return next(new ErrorHandler(error.message, 500));
        }
    }
);
