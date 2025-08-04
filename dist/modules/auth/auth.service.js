"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = __importDefault(require("./user.model"));
const jwt_1 = require("../../utils/jwt");
const otp_service_1 = require("./otp.service");
class UserService {
    static async register(fullName, email, password) {
        // 🔍 Check if user already exists
        const existingUser = await user_model_1.default.findOne({ email });
        if (existingUser) {
            throw new Error("User already exists!");
        }
        // ✅ Create user
        const user = await user_model_1.default.create({
            fullName,
            email,
            password,
        });
        await otp_service_1.OtpService.generateAndSendOTP(email, "verify");
        const accessToken = (0, jwt_1.generateAccessToken)(user);
        const refreshToken = (0, jwt_1.generateRefreshToken)(user);
        return { user, accessToken, refreshToken };
    }
    static async login(email, password) {
        const user = await user_model_1.default.findOne({ email });
        if (!user) {
            throw new Error("Invalid email or password");
        }
        if (!user.password) {
            throw new Error("Account has no password. Use social login or set a password.");
        }
        const isMatch = await bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            throw new Error("Invalid email or password");
        }
        const accessToken = (0, jwt_1.generateAccessToken)(user);
        const refreshToken = (0, jwt_1.generateRefreshToken)(user);
        return { user, accessToken, refreshToken };
    }
}
exports.UserService = UserService;
