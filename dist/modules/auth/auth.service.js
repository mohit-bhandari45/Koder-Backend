"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = __importDefault(require("../shared/user.model"));
const jwt_1 = require("../../utils/jwt");
const otp_service_1 = require("./otp.service");
const AppError_1 = require("../../utils/AppError");
class UserService {
    static async register(fullName, email, password) {
        // 🔍 Check if user already exists
        const existingUser = await user_model_1.default.findOne({ email });
        if (existingUser) {
            throw new AppError_1.AppError("User already exists!", 400);
        }
        // ✅ Create user
        const user = await user_model_1.default.create({
            fullName,
            email,
            password,
        });
        // 📩 Send email verification OTP
        await otp_service_1.OtpService.generateAndSendOTP(email, "verify");
        // 🎟️ Generate tokens
        const accessToken = (0, jwt_1.generateAccessToken)(user);
        const refreshToken = (0, jwt_1.generateRefreshToken)(user);
        return { user, accessToken, refreshToken };
    }
    static async login(email, password) {
        // 1. Find user by email
        const user = await user_model_1.default.findOne({ email });
        if (!user) {
            throw new AppError_1.AppError("Invalid email or password", 400);
        }
        // 2. Check if password exists (social login users may not have one)
        if (!user.password) {
            throw new AppError_1.AppError("Account has no password. Use social login or set a password.", 400);
        }
        // 3. Compare provided password with hashed password in DB
        const isMatch = await bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            throw new AppError_1.AppError("Invalid email or password", 400);
        }
        // 4. Generate tokens
        const accessToken = (0, jwt_1.generateAccessToken)(user);
        const refreshToken = (0, jwt_1.generateRefreshToken)(user);
        // 5. Return response
        return { user, accessToken, refreshToken };
    }
}
exports.UserService = UserService;
