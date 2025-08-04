"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app_1 = __importDefault(require("./app"));
const os_1 = __importDefault(require("os"));
const PORT = process.env.PORT || 8000;
app_1.default.get("/", (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Code execution server is running 🚀",
        timestamp: new Date().toISOString(),
        system: {
            platform: os_1.default.platform(), // e.g., 'linux'
            arch: os_1.default.arch(), // e.g., 'x64'
            cpus: os_1.default.cpus().length, // Number of CPU cores
            totalMemory: `${(os_1.default.totalmem() / 1e9).toFixed(2)} GB`, // GB
            freeMemory: `${(os_1.default.freemem() / 1e9).toFixed(2)} GB`, // GB
            uptime: `${(os_1.default.uptime() / 3600).toFixed(2)} hours`, // hours
            hostname: os_1.default.hostname(),
        },
    });
});
app_1.default.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
});
