"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnectDatabase = exports.connectDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectDatabase = async () => {
    try {
        const MONGODB_URI = process.env.MONGO_URI || "mongodb://localhost:27017/koder";
        console.log(MONGODB_URI);
        await mongoose_1.default.connect(MONGODB_URI);
        console.log("✅ Connected to MongoDB successfully");
    }
    catch (error) {
        console.error("❌ MongoDB connection error:", error);
        process.exit(1); // Exit if database connection fails
    }
};
exports.connectDatabase = connectDatabase;
const disconnectDatabase = async () => {
    try {
        await mongoose_1.default.disconnect();
        console.log("✅ Disconnected from MongoDB");
    }
    catch (error) {
        console.error("❌ MongoDB disconnection error:", error);
    }
};
exports.disconnectDatabase = disconnectDatabase;
