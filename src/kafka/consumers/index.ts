// kafka/consumers/index.ts
import { startEmailConsumer } from "./emailConsumer";

export async function initConsumers() {
  try {
    await startEmailConsumer();
    console.log("🚀 All consumers initialized");
  } catch (err) {
    console.error("❌ Failed to initialize consumers:", err);
    process.exit(1);
  }
}
