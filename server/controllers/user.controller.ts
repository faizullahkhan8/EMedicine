import { Request, Response, NextFunction } from "express";
import { UserModel } from "../models/User";
import { TokenModel } from "../models/Token";
import { sendToken, signJwtToken } from "../utils/jwt";
import { sendEmail } from "../utils/email";
import { ErrorHandler } from "../utils/errorHandler";

const NUM_INCLUDE_REGEX = /^(?=.*\d)(?=.*[a-zA-Z]).{6,}$/;

export const register = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { fullname, email, password, gender, dob, accountType } =
            req.body;

        if (
            !fullname ||
            !email ||
            !password ||
            !gender ||
            !dob ||
            !accountType
        ) {
            throw new ErrorHandler("Incomplete registration data", 400);
        }

        const isEmailExists = await UserModel.findOne({ email });

        if (isEmailExists) {
            throw new ErrorHandler("Email already exists", 409);
        }

        const isPasswordValid = NUM_INCLUDE_REGEX.test(password);

        if (!isPasswordValid) {
            throw new ErrorHandler(
                "Password must be 6 characters long and contain at least one number and one letter",
                400
            );
        }

        const user = new UserModel({
            fullname,
            email,
            password,
            gender,
            dob,
            accountType,
        });

        await user.save();

        const verificationToken = signJwtToken(
            { userId: user._id },
            process.env.VERIFICATION_TOKEN_SECRET,
            "15m"
        );

        const verificationLink = `${process.env.CLIENT_URL}/verify-email/${verificationToken}`;

        await sendEmail({
            to: email,
            subject: "Email Verification",
            text: `Hello ${fullname},\n\nPlease verify your email by clicking the following link:\n\n${verificationLink}\n\nThank you!`,
        });

        return res
            .status(201)
            .json({
                success: true,
                message: "Registration successful. Please verify your email.",
            });
    } catch (error) {
        return next(error);
    }
};

export const verifyEmail = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const verificationToken = req.params.token;

        if (!verificationToken) {
            throw new ErrorHandler("Verification token missing", 400);
        }

        const { userId } = jwt.verify(
            verificationToken,
            process.env.VERIFICATION_TOKEN_SECRET
        ) as any;

        if (!userId) {
            throw new ErrorHandler("Invalid verification token", 403);
        }

        const user = await UserModel.findById(userId);

        if (!user) {
            throw new ErrorHandler("User not found", 404);
        }

        if (user.isEmailVerified) {
            throw new ErrorHandler("Email already verified", 409);
        }

        user.isEmailVerified = true;

        await user.save();

        return res
            .status(200)
            .json({ success: true, message: "Email verified successfully" });
    } catch (error) {
        return next(error);
    }
};

// ... (other routes and handlers)

export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw new ErrorHandler("Incomplete login data", 400);
        }

        const user = await UserModel.findOne({ email });

        if (!user) {
            throw new ErrorHandler("Invalid email or password", 401);
        }

        const isPasswordMatch = await user.ComparePassword(password);

        if (!isPasswordMatch) {
            throw new ErrorHandler("Invalid email or password", 401);
        }

        if (user.accountStatus === "inActive") {
            throw new ErrorHandler(
                "Account deactivated. Please contact support",
                403
            );
        }

        await sendToken(user, res);

        return res
            .status(200)
            .json({ success: true, message: "Login successful" });
    } catch (error) {
        return next(error);
    }
};

// ... (other routes and handlers)

export const getUserById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = req.params.userId;

        if (!userId) {
            throw new ErrorHandler("User ID missing", 400);
        }

        const user = await UserModel.findById(userId).select("-password");

        if (!user) {
            throw new ErrorHandler("User not found", 404);
        }

        if (user.accountStatus === "inActive") {
            throw new ErrorHandler("User has deactivated their account", 403);
        }

        return res.status(200).json({ success: true, user });
    } catch (error) {
        return next(error);
    }
};

// ... (other routes and handlers)

export const toggle2FA = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = req.user as IUser;

        user.twoFactor = !user.twoFactor;

        await user.save();

        return res
            .status(200)
            .json({
                success: true,
                message: `2FA successfully toggled to ${user.twoFactor}`,
            });
    } catch (error) {
        return next(error);
    }
};

// ... (other routes and handlers)

export const changePassword = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = req.user as IUser;
        const { oldPassword, newPassword } = req.body;

        if (!oldPassword || !newPassword) {
            throw new ErrorHandler("Incomplete password data", 400);
        }

        if (oldPassword === newPassword) {
            throw new ErrorHandler(
                "New password must be different from the old password",
                400
            );
        }

        const isPasswordMatch = await user.ComparePassword(oldPassword);

        if (!isPasswordMatch) {
            throw new ErrorHandler("Invalid old password", 401);
        }

        const isPasswordValid = NUM_INCLUDE_REGEX.test(newPassword);

        if (!isPasswordValid) {
            throw new ErrorHandler(
                "Password must be 6 characters long and contain at least one number and one letter",
                400
            );
        }

        user.password = newPassword;

        await user.save();

        return res
            .status(200)
            .json({ success: true, message: "Password changed successfully" });
    } catch (error) {
        return next(error);
    }
};

// ... (other routes and handlers)

export const changeAccountStatus = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = req.user as IUser;
        const { accountStatus } = req.body;

        if (!accountStatus) {
            throw new ErrorHandler("Account status missing", 400);
        }

        if (
            accountStatus !== "active" &&
            accountStatus !== "inActive" &&
            accountStatus !== "suspended"
        ) {
            throw new ErrorHandler("Invalid account status", 400);
        }

        user.accountStatus = accountStatus;

        await user.save();

        return res
            .status(200)
            .json({
                success: true,
                message: `Account status successfully changed to ${user.accountStatus}`,
            });
    } catch (error) {
        return next(error);
    }
};

// ... (other routes and handlers)

export const forgotPassword = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { email } = req.body;

        if (!email) {
            throw new ErrorHandler("Email missing", 400);
        }

        const user = await UserModel.findOne({ email });

        if (!user) {
            throw new ErrorHandler("User not found", 404);
        }

        const verificationToken = signJwtToken(
            { userId: user._id },
            process.env.VERIFICATION_TOKEN_SECRET,
            "15m"
        );

        const verificationLink = `${process.env.CLIENT_URL}/reset-password/${verificationToken}`;

        await sendEmail({
            to: email,
            subject: "Password Reset Request",
            text: `Hello ${user.fullname},\n\nYou requested a password reset. Please click the following link to reset your password:\n\n${verificationLink}\n\nThank you!`,
        });

        return res
            .status(200)
            .json({
                success: true,
                message:
                    "Password reset request sent successfully. Please check your email.",
            });
    } catch (error) {
        return next(error);
    }
};

// ... (other routes and handlers)

export const newPassword = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = req.user as IUser;
        const { newPassword } = req.body;
        const verificationToken = req.params.token;

        if (!newPassword) {
            throw new ErrorHandler("New password missing", 400);
        }

        if (!verificationToken) {
            throw new ErrorHandler("Verification token missing", 400);
        }

        const { userId } = jwt.verify(
            verificationToken,
            process.env.VERIFICATION_TOKEN_SECRET
        ) as any;

        if (!userId || userId !== user._id.toString()) {
            throw new ErrorHandler("Invalid verification token", 403);
        }

        const isPasswordValid = NUM_INCLUDE_REGEX.test(newPassword);

        if (!isPasswordValid) {
            throw new ErrorHandler(
                "Password must be 6 characters long and contain at least one number and one letter",
                400
            );
        }

        user.password = newPassword;

        await user.save();

        return res
            .status(200)
            .json({ success: true, message: "Password reset successfully" });
    } catch (error) {
        return next(error);
    }
};

// ... (other routes and handlers)

// Add more routes and handlers as needed
