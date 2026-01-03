import mongoose from "mongoose";

export const connectDatabase = async (): Promise<void> => {
  try {
    const MONGODB_URI =
      process.env.MONGO_URI || "mongodb://localhost:27017/koder";
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1); // Exit if database connection fails
  }
};

export const disconnectDatabase = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    console.log("✅ Disconnected from MongoDB");
  } catch (error) {
    console.error("❌ MongoDB disconnection error:", error);
  }
};
