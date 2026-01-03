import type mongoose from "mongoose";

export interface ISubmission extends Document {
    userId: mongoose.Types.ObjectId;
    problemId: mongoose.Types.ObjectId;
    code: string;
    language: string;
    status: "Pending" | "Accepted" | "Rejected";
    runtime: number;
    memory: number;
    createdAt: Date;
    updatedAt: Date;
}