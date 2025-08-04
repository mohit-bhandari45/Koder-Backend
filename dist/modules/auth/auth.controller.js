"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenHandler = refreshTokenHandler;
exports.signupHandler = signupHandler;
exports.loginHandler = loginHandler;
exports.verifyEmailHandler = verifyEmailHandler;
const jwt_1 = require("../../utils/jwt");
const makeResponse_1 = require("../../utils/makeResponse");
const auth_service_1 = require("./auth.service");
const otp_service_1 = require("./otp.service");
const user_model_1 = __importDefault(require("./user.model"));
const email_service_1 = __importDefault(require("./email.service"));
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
        console.error("Signup error:", error);
        const message = error.message;
        const isKnown = message === "User already exists!";
        res
            .status(isKnown ? 400 : 500)
            .json((0, makeResponse_1.makeResponse)(isKnown ? message : "Server Error"));
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
        console.error("Login error:", error);
        const message = error.message;
        // If it's a known error (user not found, bad password, etc.)
        const isKnown = [
            "Invalid email or password",
            "Account has no password. Use social login or set a password."
        ].includes(message);
        res.status(isKnown ? 400 : 500).json((0, makeResponse_1.makeResponse)(isKnown ? message : "Something went wrong. Please try again."));
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
        if (!user)
            return res.status(404).json((0, makeResponse_1.makeResponse)("User not found"));
        await email_service_1.default.sendWelcomeEmail(email);
        return res.status(200).json((0, makeResponse_1.makeResponse)("Email verified successfully"));
    }
    catch (error) {
        return res.status(400).json((0, makeResponse_1.makeResponse)(error.message));
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
