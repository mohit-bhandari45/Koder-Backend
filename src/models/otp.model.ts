// models/otpToken.model.ts
import mongoose from "mongoose";

const otpTokenSchema = new mongoose.Schema({
    email: { type: String, required: true },
    code: { type: String, required: true },
    type: { type: String, enum: ['verify'], required: true },
    expiresAt: { type: Date, required: true }
}, { timestamps: true });

const OTPTokenModel =  mongoose.model("otptoken", otpTokenSchema);
export default OTPTokenModel;
