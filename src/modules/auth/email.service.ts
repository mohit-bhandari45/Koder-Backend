import nodemailer from "nodemailer";

export default class MailService {
    private static transporter = nodemailer.createTransport({
        service: "Gmail", // or your SMTP provider
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    static async sendEmail(to: string, subject: string, text: string, html?: string) {
        return this.transporter.sendMail({
            from: `"Koder" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text,
            html,
        });
    }

    static async sendWelcomeEmail(to: string) {
        const subject = "Welcome to our app 🎉";
        const message = "Thanks for verifying your email. We're glad you're here!";
        return this.sendEmail(to, subject, message);
    }
}
