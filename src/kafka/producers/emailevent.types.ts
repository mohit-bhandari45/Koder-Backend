export interface IEmailEvent {
    type: "email-otp" | "email-welcome" | "email-reset-password",
    to: string,
    subject: string,
    html: string,
    text?: string,
    timestamp?: string
    meta?: Record<string, any>
}