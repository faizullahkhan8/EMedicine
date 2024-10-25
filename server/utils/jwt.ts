import { Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { IUser } from "../models/user.model";
import TokenModel from "../models/token.model";

/**
 * Generate a JWT token.
 *
 * @description Signs a JWT Token with the provided payload, secret, and expiration time.
 *
 * @param {object} payload - The token payload containing user data.
 * @param {string} jwtSecret - Secret key for signing the token.
 * @param {string|number} expiresIn - Token expiration time (e.g., '1h', '1d', '7d').
 * @returns {string} A signed JWT token.
 *
 * @example
 * const payload = { username: "johnDoe" };
 * const secret = "mySecretKey";
 * const expiresIn = "1h";
 * const token = signJwtToken(payload, secret, expiresIn);
 *
 * @author Faiz
 */
export const signJwtToken = (
    payload: object,
    jwtSecret: Secret,
    expiresIn: string | number
): string => {
    return jwt.sign(payload, jwtSecret, { expiresIn });
};

interface ITokenOption {
    expires: Date;
    maxAge: number;
    httpOnly: boolean;
    sameSite: "lax" | "strict" | "none" | undefined;
    secure?: boolean;
}

/**
 * Send JWT tokens as cookies in the response.
 *
 * @description Generates and sends both access and refresh tokens as cookies with specified options.
 *
 * @param {IUser} user - The user object.
 * @param {Response} res - The Express response object.
 *
 * @example
 * sendToken(user, res);
 */
export const sendToken = async (user: IUser, res: Response): Promise<void> => {
    const accessToken = await user.SignAccessToken(); // Generate access token for the user
    const refreshToken = await user.SignRefreshToken(); // Generate refresh token for the user

    // Fetch token expiration times from environment variables
    const ACCESS_TOKEN_EXPIRE: number = parseInt(
        process.env.ACCESS_TOKEN_EXPIRE || "60"
    );
    const REFRESH_TOKEN_EXPIRE: number = parseInt(
        process.env.REFRESH_TOKEN_EXPIRE || "7"
    );

    // Set cookie options for the access token
    const accessTokenOptions: ITokenOption = {
        expires: new Date(Date.now() + ACCESS_TOKEN_EXPIRE * 60 * 1000), // Access token expiration
        maxAge: ACCESS_TOKEN_EXPIRE * 60 * 1000, // Max age in milliseconds
        httpOnly: true, // Prevent client-side scripts from accessing the token
        sameSite: "lax", // CSRF protection
        secure: process.env.NODE_ENV !== "development", // Secure flag for HTTPS in production
    };

    // Set cookie options for the refresh token
    const refreshTokenOptions: ITokenOption = {
        expires: new Date(
            Date.now() + REFRESH_TOKEN_EXPIRE * 24 * 60 * 60 * 1000
        ), // Refresh token expiration
        maxAge: REFRESH_TOKEN_EXPIRE * 24 * 60 * 60 * 1000, // Max age in milliseconds
        httpOnly: true, // Prevent client-side scripts from accessing the token
        sameSite: "lax", // CSRF protection
        secure: process.env.NODE_ENV !== "development", // Secure flag for HTTPS in production
    };

    // Check if a token for this user already exists in the database
    const existingToken = await TokenModel.findOne({ userId: user._id });

    if (!existingToken) {
        // If no token exists, create a new one for the user
        await TokenModel.create({ token: refreshToken, userId: user._id });
    } else {
        // If token exists, update it with the new refresh token
        existingToken.token = refreshToken;
        await existingToken.save();
    }

    // Send the tokens as cookies in the response
    res.cookie("access_token", accessToken, accessTokenOptions);
    res.cookie("refresh_token", refreshToken, refreshTokenOptions);
};
