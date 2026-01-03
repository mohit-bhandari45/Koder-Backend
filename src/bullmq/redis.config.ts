import Redis from "ioredis";

const redis = new Redis({
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: Number(process.env.REDIS_PORT) || 6379,
  password: process.env.REDIS_PASSWORD || undefined,

  // Required for BullMQ
  maxRetriesPerRequest: null, // <--- ADD THIS

  retryStrategy: (attempt) => {
    if (attempt > (Number(process.env.MAX_TRIES) || 5)) {
      return null;
    }

    const delay = Math.min(attempt * 1000, 5000); // backoff: 1s, 2s, 3s...
    console.warn(
      `⚠️ Redis reconnect attempt ${attempt}, retrying in ${delay}ms`,
    );
    return delay;
  },
  reconnectOnError: (err) => {
    console.error("❌ Redis reconnectOnError triggered:", err.message);
    return true;
  },
});

/* Events */
redis.on("connect", () => console.log("✅ Connected to Redis"));
redis.on("ready", () => console.log("🚀 Redis is ready to use"));
redis.on("error", (err) => console.error("❌ Redis Error:", err));
redis.on("close", () => console.warn("⚠️ Redis connection closed"));
redis.on("reconnecting", () => console.log("🔄 Redis reconnecting..."));

export default redis;
