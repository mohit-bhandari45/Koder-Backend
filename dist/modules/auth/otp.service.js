"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpService = void 0;
const otp_model_1 = __importDefault(require("../../models/otp.model"));
const generateotp_1 = require("../../utils/generateotp");
const email_service_1 = __importDefault(require("./email.service"));
class OtpService {
    static async generateAndSendOTP(email, type = "verify") {
        const code = (0, generateotp_1.generateOTP)();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
        await otp_model_1.default.deleteMany({ email, type });
        await otp_model_1.default.create({ email, code, type, expiresAt });
        const subject = "Verify Your Email Address";
        // const verificationURL = `https://yourapp.com/verify?email=${encodeURIComponent(email)}&type=${type}`;
        const text = `Your OTP code is ${code}. It is valid for 10 minutes.`;
        // Visit: ${verificationURL}`;
        const html = `
          <div style="font-family: sans-serif; padding: 20px; color: #333">
            <h2>Hi there 👋</h2>
            <p>You're almost done! Use the OTP below to verify your email address:</p>
            <h1 style="color: #4CAF50; font-size: 32px;">${code}</h1>
            <p>This code is valid for <strong>10 minutes</strong>.</p>
            <p style="margin-top: 30px;">If you did not request this, you can safely ignore this email.</p>
            <p style="font-size: 12px; color: #888;">Koder App Team</p>
          </div>
        `;
        // <p>Or click the button below to go to the verification page:</p>
        await email_service_1.default.sendEmail(email, subject, text, html);
    }
    static async verifyOtp(email, code, type) {
        const otpDoc = await otp_model_1.default.findOne({ email, code, type });
        if (!otpDoc)
            throw new Error("Invalid or expired OTP");
        if (otpDoc.expiresAt < new Date()) {
            await otpDoc.deleteOne();
            throw new Error("OTP expired");
        }
        await otpDoc.deleteOne();
        return true;
    }
}
exports.OtpService = OtpService;
