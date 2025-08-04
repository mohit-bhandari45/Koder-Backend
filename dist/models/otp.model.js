"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// models/otpToken.model.ts
const mongoose_1 = __importDefault(require("mongoose"));
const otpTokenSchema = new mongoose_1.default.Schema({
    email: { type: String, required: true },
    code: { type: String, required: true },
    type: { type: String, enum: ['verify'], required: true },
    expiresAt: { type: Date, required: true }
}, { timestamps: true });
const OTPTokenModel = mongoose_1.default.model("otptoken", otpTokenSchema);
exports.default = OTPTokenModel;
