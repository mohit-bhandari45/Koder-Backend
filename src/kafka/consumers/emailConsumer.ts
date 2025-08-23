import MailService from "../../modules/auth/email.service";
import { kafka } from "../config";
import { IEmailEvent } from "../producers/emailevent.types";

export const emailConsumer = kafka.consumer({ groupId: "email-group" });

export async function startEmailConsumer() {
    await emailConsumer.connect();
    console.log("📩 Email consumer connected");

    await emailConsumer.subscribe({ topic: "email-events", fromBeginning: true });

    await emailConsumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            if (!message.value) return;

            const event: IEmailEvent = JSON.parse(message.value.toString());
            console.log("📥 Email event received:", event.type);

            try {
                switch (event.type) {
                    case "email-otp":
                    case "email-reset-password":
                    case "email-welcome":
                        await MailService.sendEmail(event.to, event.subject, event.html, event.text);
                        console.log("✅ Email sent to", event.to);
                        break;
                    default:
                        console.warn("⚠️ Unknown email type:", event.type);
                }
            } catch (error) {
                console.error("❌ Failed to send email:", error);
            }
        }
    })
}