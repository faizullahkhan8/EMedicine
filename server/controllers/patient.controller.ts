import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middlewares/catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import mongoose from "mongoose";
import DoctorModel from "../models/doctor.model";
import PatientModel from "../models/patient.model";
import { io, getReciverSocketId } from "../socket/socket";
import NotificationModel from "../models/notification.model";

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
            const currentDate = new Date();
            let isDoctorAvailableToday = false;

            dbDoctor.timing.daysInWeek.nameOfTheDays.map((day) => {
                if (currentDate.getDay() === day) {
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
                            createdAt: currentDate,
                        },
                    ],
                    currentPatient: req.user._id,
                });

                // DOCTOR NOTIFICATION
                if (req.user.notification) {
                    const notification = new NotificationModel({
                        userId: doctorId,
                        type: "patient",
                        message: `You new patient " ${req.user.fullname}. "`,
                    });

                    const doctorSocketId = getReciverSocketId(doctorId);

                    if (doctorSocketId) {
                        io.to(doctorSocketId).emit(
                            "notification",
                            notification
                        );
                    }

                    await notification.save();
                }

                return res.status(201).json({
                    success: true,
                    message: "You got doctor no successfully",
                });
            }

            if (dbDoctor.maxPatients <= dbDoctorPatients.patientInfo.length) {
                return next(new ErrorHandler("Patients reached maximum", 400));
            }

            const userId = req.user._id as string;

            let isPatientAlreadyRegistered = false;

            dbDoctorPatients.patientInfo.map(
                (patient: { patientId: string; patientNo: number }) => {
                    if (patient.patientId.toString() === userId.toString()) {
                        isPatientAlreadyRegistered = true;
                    }
                }
            );

            if (isPatientAlreadyRegistered) {
                return next(
                    new ErrorHandler("Patient already registered.", 400)
                );
            }

            const newPatient = {
                patientId: req.user._id,
                patientNo: dbDoctorPatients.patientInfo.length + 1,
                createdAt: currentDate,
            } as { patientId: string; patientNo: number; createdAt: Date };

            dbDoctorPatients.patientInfo.push(newPatient);

            await dbDoctorPatients.save({ validateModifiedOnly: true });

            // DOCTOR NOTIFICATION
            if (req.user.notification) {
                const notification = new NotificationModel({
                    userId: doctorId,
                    type: "patient",
                    message: `You new patient " ${req.user.fullname}. "`,
                });

                const doctorSocketId = getReciverSocketId(doctorId);

                if (doctorSocketId) {
                    io.to(doctorSocketId).emit("notification", notification);
                }

                await notification.save();
            }

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

// GET PAIENTS OF SPACIFIC DOCTOR
export const getPatientsOfDoctor = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const doctorId = req.params.doctorId;

            const dbDoctorPatients = await PatientModel.findOne({
                doctorId: doctorId,
            }).populate("patientInfo", "patientId");

            if (!dbDoctorPatients) {
                return next(
                    new ErrorHandler("Patients document not found!", 404)
                );
            }

            if (dbDoctorPatients.patientInfo.length < 1) {
                return next(new ErrorHandler("Patients not found!", 404));
            }

            return res.status(200).json({
                success: true,
                PatientsLength: dbDoctorPatients.patientInfo.length,
                PatientInfo: dbDoctorPatients,
            });
        } catch (error: any) {
            console.log("Error in getPatientsOfDoctor : ", error.message);
            return next(new ErrorHandler(error.message, 500));
        }
    }
);
