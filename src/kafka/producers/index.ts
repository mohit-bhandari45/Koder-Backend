import { kafka } from "../config";

export const producer = kafka.producer();

export async function initProducers() {
  await producer.connect();
  console.log("🚀 Kafka Producer connected");
}
