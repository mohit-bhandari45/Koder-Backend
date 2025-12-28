import dotenv from "dotenv";
dotenv.config();

import os from "os";
import app from "./app";

const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Code execution server is running 🚀",
    timestamp: new Date().toISOString(),
    system: {
      platform: os.platform(),                      // e.g., 'linux'
      arch: os.arch(),                              // e.g., 'x64'
      cpus: os.cpus().length,                       // Number of CPU cores
      totalMemory: `${(os.totalmem() / 1e9).toFixed(2)} GB`, // GB
      freeMemory: `${(os.freemem() / 1e9).toFixed(2)} GB`,   // GB
      uptime: `${(os.uptime() / 3600).toFixed(2)} hours`,    // hours
      hostname: os.hostname(),
    },
  });
});

app.listen(PORT, async () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);

  // try {
  //   await initProducers();
  //   await initConsumers();
  //   console.log("🎉 Kafka producers and consumers are ready");
  // } catch (err) {
  //   console.error("❌ Failed to start Kafka:", err);
  //   process.exit(1);
  // }
});