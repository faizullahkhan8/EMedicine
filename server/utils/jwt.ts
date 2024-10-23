import { Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { IUser } from "../models/user.model";
import TokenModel from "../models/token.model";
import tokenModel from "../models/token.model";

/**
 * Generate a JWT token.
 *
 * @description Signs a JWT Token with the provided payload,secret,and expiration time,
 * sets it as a cookie with specified name and options.
 *
 * @param {object} payload - Token payload containing user data.
 * @param {string} jwtSecret - Secret key for signing the token.
 * @param {string|number} expiresIn - Token expiration time (e.g.,'1h',"1m","1d","7 days")
 *
 * @example
 * const payload = {username:"joheDeo"};
 * const secret = "mySecretKey";
 * const expiresIn = "1h"
 * const token = signJwtToken(payload,secret,expiresIn);
 *
 * @returns {string} token if success
 *
 * @author Faiz Ullah Khan
 */
export const signJwtToken = (
    paylaod: object,
    jwtSecret: Secret,
    expiresIn: string
) => {
    const token = jwt.sign(paylaod, jwtSecret, {
        expiresIn,
    });

    return token;
};

interface ITokenOption {
    expires: Date;
    maxAge: number;
    httpOnly: boolean;
    sameSite: "lax" | "strict" | "none" | undefined;
    secure?: boolean;
}

export const sendToken = async function (user: IUser, res: Response) {
    const accessToken = await user.SignAccessToken();
    const refreshToken = await user.SignRefreshToken();

    const ACCESS_TOKEN_EXPIRE: number = Number.parseInt(
        process.env.ACCESS_TOKEN_EXPIRE || ""
    );
    const REFRESH_TOKEN_EXPIRE: number = Number.parseInt(
        process.env.REFRESH_TOKEN_EXPIRE || ""
    );

    const accessTokenOptions: ITokenOption = {
        expires: new Date(Date.now() + ACCESS_TOKEN_EXPIRE * 60 * 1000),
        maxAge: ACCESS_TOKEN_EXPIRE * 60 * 1000,
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV !== "development",
    };

    const refreshTokenOptions: ITokenOption = {
        expires: new Date(
            Date.now() * REFRESH_TOKEN_EXPIRE + 24 * 60 * 60 * 1000
        ),
        maxAge: REFRESH_TOKEN_EXPIRE * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV !== "development",
    };

    const isTokenExistsWithGivenId = await TokenModel.findOne({
        userId: user._id,
    });

    if (!isTokenExistsWithGivenId) {
        await TokenModel.create({ token: refreshToken, userId: user._id });
    } else {
        isTokenExistsWithGivenId.token = refreshToken;
        await isTokenExistsWithGivenId.save();
    }

    res.cookie("access_token", accessToken, accessTokenOptions);
    res.cookie("refresh_token", refreshToken, refreshTokenOptions);
};
