import { emailQueue } from "../../bullmq/queues/emailQueue";
import { IEmailEvent } from "../../kafka/producers/emailevent.types";
import sendEmailEvent from "../../kafka/producers/emailProducer";
import { AppError } from "../../utils/appError.utils";
import { generateOTP } from "../../utils/generateotp.utils";
import MailService from "./email.service";
import OTPTokenModel from "./otp.model";

export class OtpService {
  static async generateAndSendOTP(
    email: string,
    type: "verify" | "reset-password",
  ) {
    const code = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await OTPTokenModel.deleteMany({ email, type });
    await OTPTokenModel.create({ email, code, type, expiresAt });

    const subject =
      type === "verify" ? "Verify Your Email Address" : "Reset Your Password";
    // const verificationURL = `https://yourapp.com/verify?email=${encodeURIComponent(email)}&type=${type}`;

    const html = `
      <div style="font-family: sans-serif; padding: 20px; color: #333">
        <h2>Hi there 👋</h2>
        <p>${
          type === "verify"
            ? "Use the OTP below to verify your email address:"
            : "Use the OTP below to reset your password:"
        }</p>
        <h1 style="color: #4CAF50; font-size: 32px;">${code}</h1>
        <p>This code is valid for <strong>10 minutes</strong>.</p>
        <p style="margin-top: 30px;">If you did not request this, you can safely ignore this email.</p>
        <p style="font-size: 12px; color: #888;">Koder App Team</p>
      </div>
    `;

    const text =
      type === "verify"
        ? `Your email verification OTP is ${code}. It is valid for 10 minutes.`
        : `Your password reset OTP is ${code}. It is valid for 10 minutes.`;
    // Visit: ${verificationURL}`;

    // <p>Or click the button below to go to the verification page:</p>

    // await MailService.sendEmail(email, subject, text, html);  // kafka instead of this

    /* KAFKA */
    // const emailEvent: IEmailEvent = {
    //   type: type === "verify" ? "email-otp" : "email-reset-password",
    //   to: email,
    //   subject,
    //   text,
    //   html,
    //   meta: { code },
    //   timestamp: new Date().toISOString(),
    // };

    // sendEmailEvent(emailEvent)
    //   .catch(err => console.error("Failed to push OTP email event to Kafka:", err));

    /* BULLMQ */
    const job = await emailQueue.add(
      type === "verify" ? "email-otp" : "email-reset-password",
      { to: email, subject, text, html, meta: { code } },
      {
        attempts: 3,
        backoff: 5000,
        removeOnComplete: true,
      },
    );

    console.log("📥 Job added to queue:", job.id, job.name);
  }

  static async verifyOtp(
    email: string,
    code: string,
    type: "verify" | "reset-password",
  ) {
    const otpDoc = await OTPTokenModel.findOne({ email, code, type });
    if (!otpDoc) {
      throw new AppError("Invalid OTP", 400); // status 400 = Bad Request
    }

    if (otpDoc.expiresAt < new Date()) {
      await otpDoc.deleteOne();
      throw new AppError("OTP expired", 410);
    }

    await otpDoc.deleteOne();
    return true;
  }
}
