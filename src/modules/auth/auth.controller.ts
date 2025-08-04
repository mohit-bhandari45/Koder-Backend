import { Request, Response } from "express";
import { generateAccessToken, verifyRefreshToken } from "../../utils/jwt";
import { makeResponse } from "../../utils/makeResponse";
import { UserService } from "./auth.service";
import { OtpService } from "./otp.service";
import User from "./user.model";
import MailService from "./email.service";

/**
 * @desc Handles user registration
 * @method POST
 * @route /auth/signup
 */
async function signupHandler(req: Request, res: Response): Promise<void> {
    const { fullName, email, password } = req.body;

    try {
        const { user, accessToken, refreshToken } = await UserService.register(fullName, email, password);

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 15 * 60 * 1000
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(201).json(makeResponse("User registered successfully", user._id));
    } catch (error) {
        console.error("Signup error:", error);
        const message = (error as Error).message;
        const isKnown = message === "User already exists!";

        res
            .status(isKnown ? 400 : 500)
            .json(makeResponse(isKnown ? message : "Server Error"));
    }
}

/**
 * @desc Handles user login
 * @method POST
 * @route /auth/login
 */
async function loginHandler(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    try {
        const { user, accessToken, refreshToken } = await UserService.login(email, password);

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 15 * 60 * 1000 // 15 minutes
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        res.status(200).json(makeResponse("Login successful", user._id));
    } catch (error) {
        console.error("Login error:", error);

        const message = (error as Error).message;

        // If it's a known error (user not found, bad password, etc.)
        const isKnown = [
            "Invalid email or password",
            "Account has no password. Use social login or set a password."
        ].includes(message);

        res.status(isKnown ? 400 : 500).json(makeResponse(isKnown ? message : "Something went wrong. Please try again."));
    }
}

/**
 * @desc Handles OTP verfication
 * @method POST
 * @route /auth/verify
 */
async function verifyEmailHandler(req: Request, res: Response) {
  const { email, code } = req.body;

  try {
    await OtpService.verifyOtp(email, code, "verify");

    const user = await User.findOneAndUpdate(
      { email },
      { isVerified: true },
      { new: true }
    );

    if (!user) return res.status(404).json(makeResponse("User not found"));

    await MailService.sendWelcomeEmail(email);

    return res.status(200).json(makeResponse("Email verified successfully"));
  } catch (error) {
    return res.status(400).json(makeResponse((error as Error).message));
  }
}

/**
 * @desc Handles token refereshing
 * @method POST
 * @route /auth/refresh
 */
async function refreshTokenHandler(req: Request, res: Response) {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
        return res.status(401).json({ message: "No refresh token provided" });
    }
    try {
        const payload = verifyRefreshToken(refreshToken);
        const newAccessToken = generateAccessToken(payload);

        res.cookie('accessToken', newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 15 * 60 * 1000 // 15 minutes
        });
        res.status(200).json({ message: "Access token refreshed" });
    } catch (err) {
        res.status(401).json({ message: "Invalid refresh token" });
    }
}

export { refreshTokenHandler, signupHandler, loginHandler,verifyEmailHandler };
