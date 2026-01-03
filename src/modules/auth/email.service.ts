import nodemailer from "nodemailer";
import { IEmailEvent } from "../../kafka/producers/emailevent.types";
import sendEmailEvent from "../../kafka/producers/emailProducer";
import { emailQueue } from "../../bullmq/queues/emailQueue";

export default class MailService {
  private static transporter = nodemailer.createTransport({
    service: "Gmail", // or your SMTP provider
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  static async sendEmail(to: string, subject: string, html: string, text?: string) {
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

    /* KAFKA */
    // const emailEvent: IEmailEvent = {
    //     type: "email-welcome",
    //     to,
    //     subject,
    //     html,
    //     timestamp: new Date().toISOString(),
    // };

    // sendEmailEvent(emailEvent).catch(err =>
    //     console.error("Failed to push welcome email event to Kafka:", err)
    // );

    /* BULLMQ */
    const job = await emailQueue.add("email-welcome", { to, subject, html }, {
      attempts: 3,
      backoff: 5000,
      removeOnComplete: true,
    });
    console.log(`✅ Email job queued with ID: ${job.id}`);
  }
}
