import { producer } from ".";
import { IEmailEvent } from "./emailevent.types";

async function sendEmailEvent(payload: IEmailEvent) {
    producer.send({
        topic: "email-events",
        messages: [{ value: JSON.stringify(payload) }]
    }).catch(err => console.error("Failed to send email event:", err));

    console.log("📧 Email event queued:", payload.type);
}

export default sendEmailEvent;