import { Router } from "express";
import {
    login,
    logout,
    optionalInfoUpdate,
    updateAccessToken,
    Register,
    twoFactorAuthVerification,
    verifyEmail,
    getUserById,
    toggle2FA,
    getAllUser,
    changePassword,
    changeAccountStatus,
    forgotPassword,
    forgotPasswordEmailVerification,
    newPassword,
    getIncompletedFields,
} from "../controllers/user.controller";
import { isAuthenticated } from "../middlewares/auth";

const router = Router();

router.post("/register", Register);
router.post("/verify-email", verifyEmail);
router.post("/login", login);
router.get("/two-factor-verification", twoFactorAuthVerification);
router.post("/logout", isAuthenticated, logout);
router.put(
    "/optional-info-update/:userId",
    isAuthenticated,
    optionalInfoUpdate
);
router.get("/refresh", updateAccessToken);
router.get("/getById/:userId", isAuthenticated, getUserById);
router.get("/getAll", isAuthenticated, getAllUser);
router.put("/toggle-2fa", isAuthenticated, toggle2FA);
router.put("/change-password", isAuthenticated, changePassword);
router.put("/change-account-status", isAuthenticated, changeAccountStatus);
router.put("/forgot-password", forgotPassword);
router.post("/forgot-password/verify-email", forgotPasswordEmailVerification);
router.post("/forgot-password/new-password", isAuthenticated, newPassword);
router.get("/get-incomplete-fields", isAuthenticated, getIncompletedFields);

export default router;
