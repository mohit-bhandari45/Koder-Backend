import nodemailer from "nodemailer";
import { emailQueue } from "../../bullmq/queues/emailQueue";

export default class MailService {
    private static transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
        connectionTimeout: 30_000,
        greetingTimeout: 30_000,
        socketTimeout: 30_000,
    });

    static async sendEmail(
        to: string,
        subject: string,
        html: string,
        text?: string
    ) {
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
        const html = `
            <div style="font-family: sans-serif; padding: 20px; color: #333">
                <h2>Welcome! 🎉</h2>
                <p>Thanks for verifying your email. We're glad you're here!</p>
                <p style="font-size: 12px; color: #888;">Koder App Team</p>
            </div>
        `;

        const job = await emailQueue.add(
            "email-welcome",
            { to, subject, html },
            {
                attempts: 3,
                backoff: {
                    type: "exponential",
                    delay: 5000,
                },
                removeOnComplete: true,
                removeOnFail: false,
            }
        );

        console.log(`✅ Email job queued with ID: ${job.id}`);
    }
}