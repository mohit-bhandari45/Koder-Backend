"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenHandler = refreshTokenHandler;
exports.signupHandler = signupHandler;
exports.loginHandler = loginHandler;
exports.verifyEmailHandler = verifyEmailHandler;
exports.logoutHandler = logoutHandler;
exports.forgotPasswordHandler = forgotPasswordHandler;
exports.resendOtpHandler = resendOtpHandler;
exports.verifyResetOtpHandler = verifyResetOtpHandler;
exports.resetPasswordHandler = resetPasswordHandler;
const jwt_1 = require("../../utils/jwt");
const makeResponse_1 = require("../../utils/makeResponse");
const auth_service_1 = require("./auth.service");
const otp_service_1 = require("./otp.service");
const user_model_1 = __importDefault(require("../shared/user.model"));
const email_service_1 = __importDefault(require("./email.service"));
const AppError_1 = require("../../utils/AppError");
const bcrypt_1 = __importDefault(require("bcrypt"));
/**
 * @desc Handles user registration
 * @method POST
 * @route /auth/signup
 */
async function signupHandler(req, res) {
    const { fullName, email, password } = req.body;
    try {
        const { user, accessToken, refreshToken } = await auth_service_1.UserService.register(fullName, email, password);
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
        res.status(201).json((0, makeResponse_1.makeResponse)("User registered successfully", user._id));
    }
    catch (error) {
        if (error instanceof AppError_1.AppError) {
            res.status(error.statusCode).json((0, makeResponse_1.makeResponse)(error.message));
            return;
        }
        console.error("Unexpected Error:", error);
        res.status(500).json((0, makeResponse_1.makeResponse)("Internal Server Error"));
        return;
    }
}
/**
 * @desc Handles user login
 * @method POST
 * @route /auth/login
 */
async function loginHandler(req, res) {
    const { email, password } = req.body;
    try {
        const { user, accessToken, refreshToken } = await auth_service_1.UserService.login(email, password);
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
        res.status(200).json((0, makeResponse_1.makeResponse)("Login successful", user._id));
    }
    catch (error) {
        if (error instanceof AppError_1.AppError) {
            res.status(error.statusCode).json((0, makeResponse_1.makeResponse)(error.message));
            return;
        }
        console.error("Unexpected Error:", error);
        res.status(500).json((0, makeResponse_1.makeResponse)("Internal Server Error"));
        return;
    }
}
/**
 * @desc Handles OTP verfication
 * @method POST
 * @route /auth/verify
 */
async function verifyEmailHandler(req, res) {
    const { email, code } = req.body;
    try {
        await otp_service_1.OtpService.verifyOtp(email, code, "verify");
        const user = await user_model_1.default.findOneAndUpdate({ email }, { isVerified: true }, { new: true });
        if (!user) {
            throw new AppError_1.AppError("User not found", 404);
        }
        await email_service_1.default.sendWelcomeEmail(email);
        res.status(200).json((0, makeResponse_1.makeResponse)("Email verified successfully"));
    }
    catch (error) {
        if (error instanceof AppError_1.AppError) {
            res.status(error.statusCode).json((0, makeResponse_1.makeResponse)(error.message));
            return;
        }
        console.error("Unexpected Error:", error);
        res.status(500).json((0, makeResponse_1.makeResponse)("Internal Server Error"));
    }
}
/**
 * @desc Handles token refereshing
 * @method POST
 * @route /auth/refresh
 */
async function refreshTokenHandler(req, res) {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
        return res.status(401).json({ message: "No refresh token provided" });
    }
    try {
        const payload = (0, jwt_1.verifyRefreshToken)(refreshToken);
        const newAccessToken = (0, jwt_1.generateAccessToken)(payload);
        res.cookie('accessToken', newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 15 * 60 * 1000 // 15 minutes
        });
        res.status(200).json({ message: "Access token refreshed" });
    }
    catch (err) {
        res.status(401).json({ message: "Invalid refresh token" });
    }
}
/**
 * @desc Handles forgot password
 * @method POST
 * @route /auth/forgot-password
 */
async function forgotPasswordHandler(req, res) {
    const { email } = req.body;
    try {
        if (!email)
            throw new AppError_1.AppError("Email is required", 400);
        const user = await user_model_1.default.findOne({ email });
        if (!user)
            throw new AppError_1.AppError("No user found with this email", 404);
        await otp_service_1.OtpService.generateAndSendOTP(email, "reset-password");
        res.status(200).json((0, makeResponse_1.makeResponse)("OTP sent to your email for password reset"));
    }
    catch (error) {
        if (error instanceof AppError_1.AppError) {
            res.status(error.statusCode).json((0, makeResponse_1.makeResponse)(error.message));
            return;
        }
        console.error("Unexpected Error:", error);
        res.status(500).json((0, makeResponse_1.makeResponse)("Internal Server Error"));
    }
}
/**
 * @desc Handles verify reset password otp
 * @method POST
 * @route /auth/verify-reset-otp
 */
async function verifyResetOtpHandler(req, res) {
    const { email, code } = req.body;
    try {
        if (!email || !code)
            throw new AppError_1.AppError("Email and OTP are required", 400);
        await otp_service_1.OtpService.verifyOtp(email, code, "reset-password");
        res.status(200).json((0, makeResponse_1.makeResponse)("OTP verified. You may now reset your password."));
    }
    catch (error) {
        if (error instanceof AppError_1.AppError) {
            res.status(error.statusCode).json((0, makeResponse_1.makeResponse)(error.message));
            return;
        }
        console.error("Unexpected Error:", error);
        res.status(500).json((0, makeResponse_1.makeResponse)("Internal Server Error"));
    }
}
/**
 * @desc Handles reset password
 * @method POST
 * @route /auth/logout
 */
async function resetPasswordHandler(req, res) {
    const { email, newPassword } = req.body;
    try {
        if (!email || !newPassword) {
            throw new AppError_1.AppError("Email and new password are required", 400);
        }
        const user = await user_model_1.default.findOne({ email });
        if (!user)
            throw new AppError_1.AppError("User not found", 404);
        const hashedPassword = await bcrypt_1.default.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();
        res.status(200).json((0, makeResponse_1.makeResponse)("Password has been reset successfully"));
    }
    catch (error) {
        if (error instanceof AppError_1.AppError) {
            res.status(error.statusCode).json((0, makeResponse_1.makeResponse)(error.message));
            return;
        }
        console.error("Unexpected Error:", error);
        res.status(500).json((0, makeResponse_1.makeResponse)("Internal Server Error"));
    }
}
/**
 * @desc Handles resend otp
 * @method POST
 * @route /auth/resend-otp
 */
async function resendOtpHandler(req, res) {
    const { email, type = "verify" } = req.body;
    try {
        if (!email)
            throw new AppError_1.AppError("Email is required", 400);
        const user = await user_model_1.default.findOne({ email });
        if (!user)
            throw new AppError_1.AppError("User not found", 404);
        // Optional: check if user is already verified
        if (type === "verify" && user.isVerified) {
            throw new AppError_1.AppError("User already verified", 400);
        }
        // ✅ Re-send OTP
        await otp_service_1.OtpService.generateAndSendOTP(email, type);
        return res.status(200).json((0, makeResponse_1.makeResponse)("OTP resent successfully"));
    }
    catch (error) {
        if (error instanceof AppError_1.AppError) {
            res.status(error.statusCode).json((0, makeResponse_1.makeResponse)(error.message));
            return;
        }
        console.error("Unexpected Error:", error);
        res.status(500).json((0, makeResponse_1.makeResponse)("Internal Server Error"));
    }
}
/**
 * @desc Handles user logout
 * @method POST
 * @route /auth/logout
 */
async function logoutHandler(req, res) {
    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
    });
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
    });
    res.status(200).json((0, makeResponse_1.makeResponse)("Logout successful"));
}
