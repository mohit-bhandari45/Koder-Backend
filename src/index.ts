import { Request, Response } from "express";
import app from "./app";
import os from "os";

const PORT = process.env.PORT || 8000;

// Health check with OS-level server diagnostics
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    status: "success",
    message: "Code execution server is running 🚀",
    timestamp: new Date().toISOString(),
    system: {
      platform: os.platform(),             // e.g., 'linux'
      arch: os.arch(),                     // e.g., 'x64'
      cpus: os.cpus().length,              // number of CPU cores
      totalMemory: `${(os.totalmem() / 1e6).toFixed(2)} MB`,  // total system memory
      freeMemory: `${(os.freemem() / 1e6).toFixed(2)} MB`,    // available memory
      uptime: `${(os.uptime() / 60).toFixed(2)} minutes`,     // system uptime
      hostname: os.hostname(),             // host name
    },
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});