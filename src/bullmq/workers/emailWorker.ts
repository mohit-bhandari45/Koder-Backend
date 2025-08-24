import dotenv from "dotenv";
dotenv.config()
import { Worker, Job } from "bullmq";
import { emailQueue } from "../queues/emailQueue";
import MailService from "../../modules/auth/email.service";

const worker = new Worker(
  "emailQueue",
  async (job: Job<{ to: string; subject: string; html: string; text: string }>) => {
    const { to, subject, html, text } = job.data;

    try {
      await MailService.sendEmail(to, subject, html, text);
      console.log(`✅ Email sent to ${to} [${job.name}]`);
    } catch (err: any) {
      console.error(`❌ Failed to send email to ${to} [${job.name}]:`, err);
      throw err; // allow BullMQ to handle retries
    }
  },
  { connection: emailQueue.opts.connection }
);

// Event listeners
worker.on("completed", (job: Job) => console.log(`Job ${job.id} completed`));
worker.on("failed", (job: Job | undefined, err: Error) =>
  console.error(`Job ${job?.id} failed:`, err)
);

worker.on("ready", () => {
  console.log("🚀 Email worker is ready and listening for jobs!");
});
