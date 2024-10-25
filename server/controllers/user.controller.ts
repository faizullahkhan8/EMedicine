import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { CatchAsyncError } from "../middlewares/catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";

import UserModel, { IUser } from "../models/user.model";
import TokenModel from "../models/token.model";

import { sendToken, signJwtToken } from "../utils/jwt";

import sendEmail from "../utils/sendEmail";
import NotificationModel from "../models/notification.model";

const NUM_INCLUDE_REGEX = /^(?=.*\d).{6,}$/;

export const Register = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { fullname, username, email, password, gender } =
                req.body as IUser;

            if (!fullname || !username || !email || !password || !gender) {
                throw new Error("In-complete data!");
            }

            if (username.length < 6) {
                throw new Error("Username must be atleast 6 characters");
            }

            const isUserNameExists = await UserModel.findOne({ username });

            if (isUserNameExists) {
                throw new Error("Username already taken!");
            }

            if (NUM_INCLUDE_REGEX.test(password)) {
                throw new Error(
                    "Password must be 6 character and consists of atleast 1 number"
                );
            }

            const verificationCode: number = Math.floor(Math.random() * 999999);

            const jwtPayload = {
                user: { fullname, username, gender, password, email },
                verificationCode,
            };

            const token = signJwtToken(
                jwtPayload,
                process.env.VERIFICATION_TOKEN_SECRET || "",
                "15m"
            ) as string;

            res.cookie("verification_token", token, {
                maxAge: Number.parseInt(
                    process.env.VERIFICATION_COOKIE_EXPIRE || ""
                ),
                sameSite: "strict",
            });

            const data = {
                user: { name: fullname },
                activationCode: verificationCode,
            };

            await sendEmail({
                data,
                email,
                subject: "User verification email!",
                template: "verification-email.ejs",
            });

            return res.status(200).json({
                success: true,
                message: "Verification email sent succesfully",
            });
        } catch (error: any) {
            console.log("ERROR IN REGISTER", error.message);
            return next(new ErrorHandler(error.message, 500));
        }
    }
);

interface IVerificationTokenOption {
    user: IUser;
    verificationCode: number;
}

export const verifyEmail = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const verficationToken = req.cookies.verification_token;

            const { user, verificationCode: tokenVerificationCode } =
                jwt.verify(
                    verficationToken,
                    process.env.VERIFICATION_TOKEN_SECRET || ""
                ) as IVerificationTokenOption;

            const { userVerificationCode } = req.body;

            if (!userVerificationCode) {
                throw new Error("verificaiton code is missing!s");
            }

            if (tokenVerificationCode !== userVerificationCode) {
                throw new Error("In-valid verification code!");
            }

            await UserModel.create(user);

            res.clearCookie("verification_token");

            await NotificationModel.create({
                userId: req.user._id,
                type: "profile",
                message: "Complete your profile by adding your information",
            });

            // send notification via socket.io

            return res.status(201).json({
                success: true,
                message: "User successfully registered!",
            });
        } catch (error: any) {
            console.log("ERROR IN VERIFY EMAIL", error.message);
            return next(new ErrorHandler(error.message, 500));
        }
    }
);

interface ILoginOptions {
    username: string;
    password: string;
}

export const login = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { username, password } = req.body as ILoginOptions;

            if (!username || !password) {
                throw new Error("In-complete data!");
            }

            const isUserExists = await UserModel.findOne({ username });

            if (!isUserExists) {
                throw new Error("In-valid credientials!");
            }

            const isPasswrodMatch = await isUserExists.ComparePassword(
                password
            );

            if (!isPasswrodMatch) {
                throw new Error("In-valid credientials!");
            }

            if (isUserExists.twoFactor) {
                const verificationCode = Math.floor(Math.random() * 999999);

                console.log(verificationCode);

                const twoFactorAuthToken = signJwtToken(
                    { userId: isUserExists._id, verificationCode },
                    process.env.TWO_FACTOR_TOKEN_SECRET || "",
                    "15m"
                );

                res.cookie("two_factor_token", twoFactorAuthToken);

                const data = {
                    user: { name: isUserExists.fullname },
                    activationCode: verificationCode,
                };

                await sendEmail({
                    data,
                    email: isUserExists.email,
                    template: "verification-email.ejs",
                    subject: "Two factor verfication email",
                });

                await NotificationModel.create({
                    userId: req.user._id,
                    type: "greeting",
                    message: `Welcome back ${req.user.fullname}`,
                });

                // send notification via socket.io

                return res.status(200).json({
                    success: true,
                    message: "Two factor code send to your email.",
                });
            }

            isUserExists.lastLogin = new Date(Date.now());

            await isUserExists.save({ validateModifiedOnly: true });

            await sendToken(isUserExists, res);

            return res.status(200).json({
                success: true,
                message: "User loged in successfully",
            });
        } catch (error: any) {
            console.log("ERROR IN LOGIN :", error.message);
            return next(new ErrorHandler(error.message, 500));
        }
    }
);

interface twoFactorAuthOptions {
    userId: string;
    verificationCode: number;
}

export const twoFactorAuthVerification = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const twoFactorAuthToken = req.cookies.two_factor_token;

            const userVerificationCode = req.body.verificationCode;

            if (!twoFactorAuthToken) {
                throw new Error("Two factor token is missing");
            }

            if (!userVerificationCode) {
                throw new Error("Verification code is missing!");
            }

            const {
                userId: tokenUserId,
                verificationCode: tokenVerificationCode,
            } = jwt.verify(
                twoFactorAuthToken,
                process.env.TWO_FACTOR_TOKEN_SECRET || ""
            ) as twoFactorAuthOptions;

            if (tokenVerificationCode !== userVerificationCode) {
                throw new Error("In-valid verification code");
            }

            const isUserExists = await UserModel.findById(tokenUserId);

            if (!isUserExists) {
                throw new Error("User not exists!");
            }

            isUserExists.lastLogin = new Date(Date.now());

            if (isUserExists.accountStatus === "inActive") {
                isUserExists.accountStatus = "active";
            }

            await isUserExists.save({ validateModifiedOnly: true });

            res.clearCookie("two_factor_token");

            await sendToken(isUserExists, res);

            return res.status(200).json({
                success: true,
                message: "User loged in successfully",
            });
        } catch (error: any) {
            console.log(
                "ERROR IN 2 FACTOR AUTH VERIFICATION : ",
                error.message
            );
            return next(new ErrorHandler(error.message, 500));
        }
    }
);

export const optionalInfoUpdate = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.params.userId;
            const {
                fullname,
                twoFactor,
                profilePic,
                bio,
                address,
                contactNo,
                cnic,
                specialty,
            } = req.body as IUser;

            if (!userId) {
                throw new Error("User id is missing!");
            }

            const isUserExists = req.user;

            if (fullname !== isUserExists.fullname && fullname !== undefined) {
                isUserExists.fullname = fullname;
            }
            if (
                specialty !== isUserExists.specialty &&
                specialty !== undefined
            ) {
                isUserExists.specialty = specialty;
            }
            if (
                contactNo !== isUserExists.contactNo &&
                contactNo !== undefined
            ) {
                isUserExists.contactNo = contactNo;
            }
            if (cnic !== isUserExists.cnic && cnic !== undefined) {
                isUserExists.cnic = cnic;
            }
            if (
                twoFactor !== isUserExists.twoFactor &&
                twoFactor !== undefined
            ) {
                isUserExists.twoFactor = twoFactor;
            }
            if (
                profilePic !== isUserExists.profilePic &&
                profilePic !== undefined
            ) {
                isUserExists.profilePic = profilePic;
            }
            if (bio !== isUserExists.bio && bio !== undefined) {
                isUserExists.bio = bio;
            }
            if (address !== isUserExists.address && address !== undefined) {
                isUserExists.address = address;
            }

            await isUserExists.save({ validateModifiedOnly: true });

            res.status(201).json({
                success: true,
                messsage: "User info update successfully",
                isUserExists,
            });
        } catch (error: any) {
            console.log("ERROR IN OPTIONAL INFO UPDATE : ", error.message);
            return next(new ErrorHandler(error.message, 500));
        }
    }
);

export const logout = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user._id;
            const refresh_token = req.cookies.refresh_token;

            await TokenModel.deleteOne({ token: refresh_token, userId });

            res.clearCookie("access_token");
            res.clearCookie("refresh_token");

            return res.status(200).json({
                success: true,
                message: "User loged out successfully",
            });
        } catch (error: any) {
            console.log("ERROR IN LOGOUT : ", error.message);
            return next(new ErrorHandler(error.message, 500));
        }
    }
);

interface IRefreshOptions {
    refresh_token: string;
}

export const updateAccessToken = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { refresh_token } = req.cookies as IRefreshOptions;

            if (!refresh_token) {
                throw new Error("Somethings wents wronge, Login again");
            }

            const isTokenExists = await TokenModel.findOne({
                token: refresh_token,
            });

            if (!isTokenExists) {
                throw new Error("In-valid refresh token");
            }

            const decoded = jwt.verify(
                refresh_token,
                process.env.REFRESH_TOKEN_SECRET || ""
            ) as any;

            if (!decoded) {
                throw new Error("In-valid token!");
            }

            const user = await UserModel.findById(decoded.id);

            res.clearCookie("refresh_token");
            res.clearCookie("access_token");

            await sendToken(user as IUser, res);

            return res.status(200).json({
                success: true,
                message: "Token updated successfully.",
            });
        } catch (error: any) {
            console.log("ERROR IN REFRESH TOKEN : ", error.message);
            return next(new ErrorHandler(error.message, 500));
        }
    }
);

export const getUserById = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.params.userId;

            if (!userId) {
                throw new Error("User id missing!");
            }

            const isUserExists = await UserModel.findById(userId).select(
                "-password"
            );

            if (!isUserExists) {
                throw new Error("User not found!");
            }

            if (isUserExists.accountStatus === "inActive") {
                throw new Error("User has deactivated thier account!");
            }

            return res.status(200).json({
                success: true,
                user: isUserExists,
            });
        } catch (error: any) {
            console.log("ERROR IN GET USER BY ID : ", error.message);
            return next(new ErrorHandler(error.message, 500));
        }
    }
);

export const getAllUser = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userQuery = req.query;

            let query = userQuery || {};

            const allUsers = await UserModel.find(query).select("-password");

            if (allUsers.length < 0) {
                throw new Error("No users yet!");
            }

            return res.status(200).json({
                success: true,
                usersLen: allUsers.length,
                users: allUsers,
            });
        } catch (error: any) {
            console.log("ERROR IN GET ALL USERS : ", error.message);
            return next(new ErrorHandler(error.message, 500));
        }
    }
);

export const toggle2FA = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user._id;

            const user = await UserModel.findById(userId);

            if (!user) {
                throw new Error("User not found!");
            }

            user.twoFactor = !user.twoFactor;

            await user.save({ validateModifiedOnly: true });

            return res.status(201).json({
                succss: true,
                message: `2FA successfully toggled to ${user.twoFactor}`,
            });
        } catch (error: any) {
            console.log("ERROR IN TOGGLE 2FA : ", error.message);
            return next(new ErrorHandler(error.message, 500));
        }
    }
);

export const changePassword = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = req.user;
            const { oldPassword, newPassword } = req.body;

            if (!oldPassword || !newPassword) {
                throw new Error("In-complete data!");
            }

            if (oldPassword === newPassword) {
                throw new Error("Password must be different of old password!");
            }

            const isPasswordMatch = await user.ComparePassword(oldPassword);

            if (!isPasswordMatch) {
                throw new Error("In-correct password!");
            }

            const isPasswordValid = NUM_INCLUDE_REGEX.test(newPassword);

            if (!isPasswordValid) {
                throw new Error(
                    "Password must be 6 character and consists of atleast 1 number"
                );
            }

            user.password = newPassword;

            await user.save({ validateModifiedOnly: true });

            await NotificationModel.create({
                userId: req.user._id,
                type: "auth",
                message: "Password changed successfully.",
            });

            // send notification via socket.io and send email

            return res.status(200).json({
                success: true,
                message: "Password changed successfully",
            });
        } catch (error: any) {
            console.log("ERROR IN CHANGE PASSWORD : ", error.message);
            return next(new ErrorHandler(error.message, 500));
        }
    }
);

interface IChangeAccountStatusOptions {
    accountStatus: "active" | "inActive" | "suspended";
}

export const changeAccountStatus = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = req.user;

            const { accountStatus } = req.body as IChangeAccountStatusOptions;

            if (!accountStatus) {
                throw new Error("missing account status!");
            }

            user.accountStatus = accountStatus;

            await user.save({ validateModifiedOnly: true });

            // send email

            return res.status(200).json({
                success: true,
                message: `Account status successfully changed to ${user.accountStatus}`,
            });
        } catch (error: any) {
            console.log("ERROR IN CHANGE ACCOUNT STATUS : ", error.message);
            return next(new ErrorHandler(error.message, 500));
        }
    }
);

interface IForgotPasswordOption {
    email: string;
}

export const forgotPassword = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email } = req.body as IForgotPasswordOption;

            if (!email) {
                throw new Error("email is missing!");
            }

            const isUserExists = await UserModel.findOne({ email });

            if (!isUserExists) {
                throw new Error("User not found!");
            }

            const verficationCode = Math.floor(Math.random() * 999999);

            const jwtPayload = {
                user: { id: isUserExists._id },
                verficationCode,
            };

            const verficationToken = signJwtToken(
                jwtPayload,
                process.env.VERIFICATION_TOKEN_SECRET || "",
                "15m"
            );

            const cookieOptions = {
                expires: new Date(Date.now() + 15 * 60 * 1000),
                maxAge: 15 * 60 * 1000,
                httpOnly: true,
            };

            res.cookie(
                "email_verification_token",
                verficationToken,
                cookieOptions
            );

            const data = {
                user: { name: isUserExists.fullname },
                activationCode: verficationCode,
            };

            console.log(verficationCode);

            await sendEmail({
                data,
                email,
                subject: "Forgot Password Email Verification Mail.",
                template: "verification-email.ejs",
            });

            return res.status(200).json({
                success: true,
                message: "Verification email sent successfully!",
            });
        } catch (error: any) {
            console.log("ERROR IN FORGOT PASSWORD : ", error.message);
            return next(new ErrorHandler(error.message, 500));
        }
    }
);

interface IFPVerificationOption {
    verificationCode: string;
    newPassword: string;
}

export const forgotPasswordEmailVerification = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { verificationCode: userVerificationCode } =
                req.body as IFPVerificationOption;
            const verficationToken = req.cookies.email_verification_token;

            if (!userVerificationCode) {
                throw new Error("In-complete data!");
            }

            if (!verficationToken) {
                throw new Error("token is missing!");
            }

            const { user, verficationCode: tokenVerificationCode } = jwt.verify(
                verficationToken,
                process.env.VERIFICATION_TOKEN_SECRET || ""
            ) as any;

            if (userVerificationCode !== tokenVerificationCode) {
                throw new Error("In-valid verification code!");
            }

            const dbUser = await UserModel.findById(user.id);

            if (!dbUser) {
                throw new Error("User not found!");
            }

            res.clearCookie("email_verification_token");

            const forgot_password_token = signJwtToken(
                { id: dbUser._id },
                process.env.VERIFICATION_TOKEN_SECRET || "",
                "30m"
            );

            const cookieOptions = {
                expires: new Date(Date.now() + 30 * 60 * 1000),
                maxAge: 30 * 60 * 1000,
                httpOnly: true,
            };

            res.cookie("forgot_password_token", forgotPassword, cookieOptions);

            await sendToken(dbUser, res);

            return res.status(201).json({
                success: true,
                message: "Email verified successfully",
            });
        } catch (error: any) {
            console.log(
                "ERROR IN FORGOT PASSWORD EMAIL VERIFICATION : ",
                error.message
            );
            return next(new ErrorHandler(error.message, 500));
        }
    }
);

export const newPassword = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { newPassword } = req.body;
            const user = req.user;
            const forgotPasswordToken = req.cookies.forgot_password_token;

            if (!forgotPasswordToken) {
                throw new Error("You cannot change your password here!");
            }

            const { id: tokenUserId } = jwt.verify(
                forgotPasswordToken,
                process.env.VERIFICATION_TOKEN_SECRET || ""
            ) as any;

            if (user._id !== tokenUserId) {
                throw new Error("In-valid user token!");
            }

            if (!newPassword) {
                throw new Error("New password is missing!");
            }

            res.clearCookie("forgot_password_token");

            user.password = newPassword;

            await user.save({ validateModifiedOnly: true });

            // send notification via socket.io and email

            return res.status(200).json({
                success: true,
                message: "Password reset successfully",
            });
        } catch (error: any) {
            console.log("ERROR IN NEW PASSWORD : ", error.message);
            return next(new ErrorHandler(error.message, 500));
        }
    }
);

export const getIncompletedFields = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const incompleteFields = req.user.completedFields;

            return res.status(200).json({
                success: true,
                fields: incompleteFields,
            });
        } catch (error: any) {
            console.log("ERROR IN GET IN-COMPLETED FIELDS : ", error.message);
            return next(new ErrorHandler(error.message, 500));
        }
    }
);
