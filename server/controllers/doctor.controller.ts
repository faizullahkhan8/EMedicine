import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middlewares/catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import DoctorModel, { IDoctorOptions } from "../models/doctor.model";
import NotificationModel from "../models/notification.model";
import { getReciverSocketId, io } from "../socket/socket";
import mongoose from "mongoose";

// create doctor account
export const requestDoctorAccount = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = req.body as IDoctorOptions;

            if (
                await DoctorModel.findOne({
                    $or: [{ email: data.email }, { cnic: data.cnic }],
                })
            ) {
                return next(
                    new ErrorHandler("Email or CNIC already exists.", 400)
                );
            }

            if (await DoctorModel.findOne({ userAccountId: req.user._id })) {
                return next(
                    new ErrorHandler(
                        "Maximum one doctor account is allowed.",
                        400
                    )
                );
            }

            if (req.user._id) {
                data.userAccountId = req.user._id as string;
            }

            if (data.isApproved) {
                data.isApproved = false;
            }

            await DoctorModel.create(data);

            return res.status(201).json({
                success: true,
                message: "Doctor account request submitted successfully.",
            });
        } catch (error: any) {
            console.log("Error in request doctor account : ", error.message);
            return next(new ErrorHandler(error.message, 500));
        }
    }
);

// approve doctor account for admin
export const approveDoctorAccount = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const accountId = req.params.accountId;

            if (!accountId) {
                return next(
                    new ErrorHandler("Please provide a account ID", 404)
                );
            }

            const dbDoctorAccount = await DoctorModel.findById(accountId);

            if (!dbDoctorAccount) {
                return next(new ErrorHandler("Doctor account not found!", 404));
            }

            if (dbDoctorAccount.isApproved === true) {
                return next(
                    new ErrorHandler("Doctor account alredy approved.", 400)
                );
            }

            dbDoctorAccount.isApproved = true;

            await dbDoctorAccount.save({ validateModifiedOnly: true });

            // send notification
            if (req.user.notification) {
                const newNotification = new NotificationModel({
                    userId: dbDoctorAccount.userAccountId,
                    type: "Account",
                    message: `${dbDoctorAccount.name} has been approved successfully. Now you can login with the specified credentials.`,
                });

                const userSocketId = getReciverSocketId(
                    dbDoctorAccount.userAccountId
                );

                if (userSocketId) {
                    io.to(userSocketId).emit("notification", newNotification);
                }

                await newNotification.save();
            }

            return res.status(200).json({
                success: true,
                message: "Doctor account approved successfully.",
            });
        } catch (error: any) {
            console.log("Error in request doctor account : ", error.message);
            return next(new ErrorHandler(error.message, 500));
        }
    }
);

// get all doctor for user
export const getAllDoctors = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { limit } = req.query;

            const allDoctor = await DoctorModel.find({}).limit(limit as any);

            return res.status(200).json({
                success: true,
                doctors: allDoctor,
            });
        } catch (error: any) {
            console.log("Error in get all doctors : ", error.message);
            return next(new ErrorHandler(error.message, 500));
        }
    }
);

// get all those doctor which are not approved for admin
export const getAllNotApprovedDoctors = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const doctors = await DoctorModel.find({
                isApproved: false,
            }).sort({
                createdAt: -1,
            });

            return res.status(200).json({
                success: true,
                doctorsLength: doctors.length,
                doctors,
            });
        } catch (error: any) {
            console.log("Error in get all not approved : ", error.message);
            return next(new ErrorHandler(error.message, 500));
        }
    }
);

export const banDoctor = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const doctorId = req.params.doctorId;

            if (!mongoose.Types.ObjectId.isValid(doctorId)) {
                return next(new ErrorHandler("Invalid doctor Id", 400));
            }

            const { reason, duration } = req.body;

            const dbDoctor = await DoctorModel.findById(doctorId);

            if (!dbDoctor) {
                return next(new ErrorHandler("Doctor account not found!", 404));
            }

            if (dbDoctor.ban.isBanned) {
                return next(new ErrorHandler("Doctor already banned!", 400));
            }

            const defaultBanMessage =
                "You have banned by the administrator. Please contact the administrator.";

            dbDoctor.ban.isBanned = true;
            dbDoctor.ban.reason = reason || defaultBanMessage;
            dbDoctor.ban.duration = duration;

            await dbDoctor.save({ validateModifiedOnly: true });

            return res.status(201).json({
                success: true,
                message: `${dbDoctor.name},${dbDoctor.email} banned successfully.`,
            });
        } catch (error: any) {
            console.log("Error in banDoctor : ", error.message);
            return next(new ErrorHandler(error.message, 500));
        }
    }
);
