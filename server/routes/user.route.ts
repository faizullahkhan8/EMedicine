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

/**
 * Route for user registration.
 * Allows any user to register a new account.
 */
router.post("/register", Register);

/**
 * Route for email verification after registration.
 * This verifies the user's email address.
 */
router.post("/verify-email", verifyEmail);

/**
 * Route for user login.
 * Authenticates a user and provides tokens for further access.
 */
router.post("/login", login);

/**
 * Route for two-factor authentication (2FA) verification.
 * Verifies the 2FA code during login or other sensitive actions.
 */
router.get("/two-factor-verification", twoFactorAuthVerification);

/**
 * Route for user logout.
 * Logs out the authenticated user by invalidating tokens.
 * Requires the user to be authenticated.
 */
router.post("/logout", isAuthenticated, logout);

/**
 * Route for updating optional user information.
 * Allows authenticated users to update additional details in their profile.
 */
router.put(
    "/optional-info-update/:userId",
    isAuthenticated,
    optionalInfoUpdate
);

/**
 * Route for refreshing access tokens.
 * Provides a new access token using a valid refresh token.
 */
router.get("/refresh", updateAccessToken);

/**
 * Route to get user details by ID.
 * Requires the user to be authenticated.
 */
router.get("/getById/:userId", isAuthenticated, getUserById);

/**
 * Route to get a list of all users.
 * Requires the user to be authenticated.
 */
router.get("/getAll", isAuthenticated, getAllUser);

/**
 * Route for toggling 2FA (Two-Factor Authentication) for a user.
 * Allows users to enable or disable 2FA for their account.
 */
router.put("/toggle-2fa", isAuthenticated, toggle2FA);

/**
 * Route for changing the password of an authenticated user.
 * Users must be logged in to change their password.
 */
router.put("/change-password", isAuthenticated, changePassword);

/**
 * Route for changing the account status (e.g., activate/deactivate).
 * Allows authenticated users to change the status of their account.
 */
router.put("/change-account-status", isAuthenticated, changeAccountStatus);

/**
 * Route for initiating the forgot password process.
 * This sends an email to the user with further instructions.
 */
router.put("/forgot-password", forgotPassword);

/**
 * Route for verifying the email as part of the forgot password process.
 * After verification, the user can proceed to reset their password.
 */
router.post("/forgot-password/verify-email", forgotPasswordEmailVerification);

/**
 * Route for setting a new password after verification.
 * Requires the user to be authenticated.
 */
router.post("/forgot-password/new-password", isAuthenticated, newPassword);

/**
 * Route to get a list of incomplete fields in the user's profile.
 * This helps users identify missing information in their account.
 */
router.get("/get-incomplete-fields", isAuthenticated, getIncompletedFields);

export default router;
