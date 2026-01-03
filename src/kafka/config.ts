import { Kafka } from "kafkajs";

export const kafka = new Kafka({
  clientId: "Koder-App",
  brokers: ["localhost:29092"],
});
