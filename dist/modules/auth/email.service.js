"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
class MailService {
    static async sendEmail(to, subject, text, html) {
        return this.transporter.sendMail({
            from: `"Koder" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text,
            html,
        });
    }
    static async sendWelcomeEmail(to) {
        const subject = "Welcome to our app 🎉";
        const message = "Thanks for verifying your email. We're glad you're here!";
        return this.sendEmail(to, subject, message);
    }
}
MailService.transporter = nodemailer_1.default.createTransport({
    service: "Gmail", // or your SMTP provider
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});
exports.default = MailService;
