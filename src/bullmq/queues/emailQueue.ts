import { Queue } from "bullmq";
import redis from "../redis.config";

// Create and export email queue
export const emailQueue = new Queue("emailQueue", { connection: redis });