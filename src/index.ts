import dotenv from "dotenv";
dotenv.config();

import app from "./app";

const PORT = process.env.PORT || 8000;

app.get("/health", (req, res) => {
  res.status(200).json({ success: true, timestamp: new Date().toISOString() });
});

app.listen(PORT, async () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
