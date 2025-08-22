import mongoose, { Schema } from "mongoose";
import { IProblem, ITestCase } from "../../types/problem.types";
import SubmissionModel from "../submissions/submission.model";

const testCaseSchema = new Schema({
  input: {
    type: String,
    required: true,
  },
  output: {
    type: String,
    required: true,
  },
  explanation: {
    type: String,
    required: true
  },
  stdin: {
    type: String,
    default: ""
  },
  stdout: {
    type: Schema.Types.Mixed,
    required: true
  }
});

const exampleSchema = new Schema(
  {
    input: {
      type: String,
      required: true,
    },
    output: {
      type: String,
      required: true,
    },
    explanation: { type: String },
  },
  { _id: false }
);

const languageCodeSchema = new Schema(
  {
    javascript: { type: String },
    python: { type: String },
    java: { type: String },
    cpp: { type: String },
    c: { type: String },
    go: { type: String },
    ruby: { type: String },
    rust: { type: String },
    kotlin: { type: String },
    swift: { type: String },
    perl: { type: String },
    scala: { type: String },
    haskell: { type: String },
    csharp: { type: String },
    r: { type: String },
    dart: { type: String },
    elixir: { type: String },
  },
  { _id: false }
);

export const problemSchema = new Schema<IProblem>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    examples: {
      type: [exampleSchema],
      required: true,
    },
    testCases: {
      type: [testCaseSchema],
      required: true,
    },
    constraints: {
      type: [String],
      required: true,
    },
    functionName: {
      type: String,
      required: true,
    },
    starterCode: {
      type: languageCodeSchema,
      required: true,
    },
    solution: {
      type: languageCodeSchema,
    },
  },
  { timestamps: true }
);

// text index
problemSchema.index({
  title: "text",
  description: "text",
  tags: "text"
});

/**
 * The Below contains all the middlewares
 * needed to put!
 */

/* Model delete middlwares */
// Cascade delete when using Model.deleteOne()
problemSchema.pre("deleteOne", { document: false, query: true }, async function (next) {
  const filter = this.getFilter();
  const problems = await this.model.find(filter, "_id");
  const ids = problems.map(p => p._id);

  if (ids.length > 0) {
    await SubmissionModel.deleteMany({ problemId: { $in: ids } });
  }

  next();
})

// Cascade delete when using Model.deleteMany()
problemSchema.pre("deleteMany", { document: false, query: true }, async function (next) {
  const filter = await this.getFilter();
  const problem = await this.model.find(filter, "_id");
  const ids = problem.map(p => p._id);

  if (ids.length) {
    await SubmissionModel.deleteMany({ problemId: { $in: ids } });
  }

  next();
})

// Cascade delete when using Model.findOneAndDelete() or Model.findByIdAndDelete()
problemSchema.pre("findOneAndDelete", { document: false, query: true }, async function (next) {
  const filter = this.getFilter();
  const problem = await this.model.findOne(filter, "_id");

  if (problem) {
    await SubmissionModel.deleteMany({ problemId: problem._id });
  }

  next();
});

/* Doc delete middlwares */
problemSchema.pre("deleteOne", { document: true, query: false }, async function (next) {
  const problemId = this._id;
  if (problemId) {
    await SubmissionModel.deleteMany({ problemId });
  }
  next();
});

const ProblemModel: mongoose.Model<IProblem> = mongoose.model<IProblem>("problem", problemSchema);
export default ProblemModel;