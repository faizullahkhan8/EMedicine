import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middlewares/catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import DoctorModel, { IDoctorOptions } from "../models/doctor.model";

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

            dbDoctorAccount.isApproved = true;

            await dbDoctorAccount.save({ validateModifiedOnly: true });

            // send notification

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
