import { Request, Response } from "express";
import { generateAccessToken, verifyRefreshToken } from "../../utils/jwt.utils";
import { makeResponse } from "../../utils/makeResponse.utils";
import { UserService } from "./auth.service";
import { OtpService } from "./otp.service";
import User from "../shared/user.model";
import MailService from "./email.service";
import { AppError } from "../../utils/appError.utils";

const isProduction = process.env.NODE_ENV === 'production';

/**
 * @desc Handles user registration
 * @method POST
 * @route /auth/signup
 */

async function signupHandler(req: Request, res: Response): Promise<void> {
    const { fullName, email, password } = req.body;

    try {
        const { user, accessToken, refreshToken } = await UserService.register(fullName, email, password);

        res.status(201).json(makeResponse("User registered successfully", { user, accessToken, refreshToken }));
    } catch (error) {
        if (error instanceof AppError) {
            res.status(error.statusCode).json(makeResponse(error.message));
            return;
        }

        console.error("Unexpected Error:", error);
        res.status(500).json(makeResponse("Internal Server Error"));
        return;
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

        res.status(200).json(makeResponse("Login successful", { user, accessToken, refreshToken }));
    } catch (error) {
        if (error instanceof AppError) {
            res.status(error.statusCode).json(makeResponse(error.message));
            return;
        }

        console.error("Unexpected Error:", error);
        res.status(500).json(makeResponse("Internal Server Error"));
        return;
    }
}

/**
 * @desc Handles OTP verfication
 * @method POST
 * @route /auth/verify-email
 */
async function verifyEmailHandler(req: Request, res: Response): Promise<void> {
    const { email, code } = req.body;

    try {
        await OtpService.verifyOtp(email, code, "verify");

        const user = await User.findOneAndUpdate(
            { email },
            { isVerified: true },
            { new: true }
        );

        if (!user) {
            throw new AppError("User not found", 404);
        }

        await MailService.sendWelcomeEmail(email);

        res.status(200).json(makeResponse("Email verified successfully"));
    } catch (error) {
        if (error instanceof AppError) {
            res.status(error.statusCode).json(makeResponse(error.message));
            return;
        }

        console.error("Unexpected Error:", error);
        res.status(500).json(makeResponse("Internal Server Error"));
    }
}

/**
 * @desc Handles token refereshing
 * @method POST
 * @route /auth/refresh
 */
async function refreshTokenHandler(req: Request, res: Response): Promise<void> {
    const refreshToken = req.body;
    if (!refreshToken) {
        throw new AppError("No refresh token provided", 401);
    }
    try {
        const payload = verifyRefreshToken(refreshToken);
        const newAccessToken = generateAccessToken(payload);
        
        res.status(200).json(makeResponse("Access token refreshed", newAccessToken))
    } catch (error) {
        if (error instanceof AppError) {
            res.status(error.statusCode).json(makeResponse(error.message));
            return;
        }

        console.error("Unexpected Error:", error);
        res.status(500).json(makeResponse("Internal Server Error"));
    }
}

/**
 * @desc Handles forgot password
 * @method POST
 * @route /auth/forgot-password
 */
async function forgotPasswordHandler(req: Request, res: Response): Promise<void> {
    const { email } = req.body;

    try {
        if (!email) throw new AppError("Email is required", 400);

        const user = await User.findOne({ email });
        if (!user) throw new AppError("No user found with this email", 404);

        await OtpService.generateAndSendOTP(email, "reset-password");

        res.status(200).json(makeResponse("OTP sent to your email for password reset"));
    } catch (error) {
        if (error instanceof AppError) {
            res.status(error.statusCode).json(makeResponse(error.message));
            return;
        }

        console.error("Unexpected Error:", error);
        res.status(500).json(makeResponse("Internal Server Error"));
    }
}

/**
 * @desc Handles verify reset password otp
 * @method POST
 * @route /auth/verify-reset-otp
 */
async function verifyResetOtpHandler(req: Request, res: Response): Promise<void> {
    const { email, code } = req.body;

    try {
        if (!email || !code) throw new AppError("Email and OTP are required", 400);

        await OtpService.verifyOtp(email, code, "reset-password");

        res.status(200).json(makeResponse("OTP verified. You may now reset your password."));
    } catch (error) {
        if (error instanceof AppError) {
            res.status(error.statusCode).json(makeResponse(error.message));
            return;
        }

        console.error("Unexpected Error:", error);
        res.status(500).json(makeResponse("Internal Server Error"));
    }
}

/**
 * @desc Handles reset password
 * @method POST
 * @route /auth/reset-password
 */
async function resetPasswordHandler(req: Request, res: Response) {
    const { email, newPassword } = req.body;

    try {
        if (!email || !newPassword) {
            throw new AppError("Email and new password are required", 400);
        }

        const user = await User.findOne({ email });
        if (!user) throw new AppError("User not found", 404);

        user.password = newPassword;
        await user.save();

        res.status(200).json(makeResponse("Password has been reset successfully"));
    } catch (error) {
        if (error instanceof AppError) {
            res.status(error.statusCode).json(makeResponse(error.message));
            return;
        }

        console.error("Unexpected Error:", error);
        res.status(500).json(makeResponse("Internal Server Error"));
    }
}

/**
 * @desc Handles resend otp
 * @method POST
 * @route /auth/resend-otp
 */
async function resendOtpHandler(req: Request, res: Response) {
    const { email, type = "verify" } = req.body;

    try {
        if (!email) throw new AppError("Email is required", 400);

        const user = await User.findOne({ email });
        if (!user) throw new AppError("User not found", 404);

        // Optional: check if user is already verified
        if (type === "verify" && user.isVerified) {
            throw new AppError("User already verified", 400);
        }

        // ✅ Re-send OTP
        await OtpService.generateAndSendOTP(email, type);

        return res.status(200).json(makeResponse("OTP resent successfully"));
    } catch (error) {
        if (error instanceof AppError) {
            res.status(error.statusCode).json(makeResponse(error.message));
            return;
        }

        console.error("Unexpected Error:", error);
        res.status(500).json(makeResponse("Internal Server Error"));
    }
}

/**
 * @desc Handles user logout
 * @method POST
 * @route /auth/logout
 */
async function logoutHandler(req: Request, res: Response): Promise<void> {
    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'none' : 'lax',
    });

    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'none' : 'lax',
    });

    res.status(200).json(makeResponse("Logout successful"));
}

export { refreshTokenHandler, signupHandler, loginHandler, verifyEmailHandler, logoutHandler, forgotPasswordHandler, resendOtpHandler, verifyResetOtpHandler, resetPasswordHandler };
