import mongoose, { Schema } from "mongoose";
import { IProblem } from "../types/problem";
import { ITestCase } from "../types/problem";

const testCaseSchema = new Schema<ITestCase>({
    input: { type: String, required: true },
    output: { type: String, required: true },
    stdin: { type: String },
    explanation: { type: String },
});

const exampleSchema = new Schema(
    {
        input: { type: String, required: true },
        output: { type: String, required: true },
        explanation: { type: String },
    },
    { _id: false }
);

const problemSchema = new Schema<IProblem>(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        difficulty: {
            type: String,
            enum: ["Easy", "Medium", "Hard"],
            required: true,
        },
        tags: { type: [String], required: true },
        examples: { type: [exampleSchema], required: true },
        testCases: { type: [testCaseSchema], required: true },
        constraints: { type: [String], required: true },
        starterCode: { type: String, required: true },
        solution: { type: String },
    },
    { timestamps: true }
);

const ProblemModel = mongoose.model<IProblem>("problem", problemSchema);
export default ProblemModel;
