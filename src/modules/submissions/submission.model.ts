import mongoose, { Schema, Document } from "mongoose";
import { ISubmission } from "../../types/submission.types";

const submissionSchema = new Schema<ISubmission>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        problemId: {
            type: Schema.Types.ObjectId,
            ref: "problem",
            required: true,
        },
        code: {
            type: String,
            required: true
        },
        language: {
            type: String, required: true
        },
        status: {
            type: String,
            enum: ["Pending", "Accepted", "Rejected"],
            default: "Pending",
        },
        runtime: { type: Number },
        memory: { type: Number },
    },
    { timestamps: true }
);

const SubmissionModel = mongoose.model<ISubmission>(
    "submission",
    submissionSchema
);
export default SubmissionModel;
