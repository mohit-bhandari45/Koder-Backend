"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addSubmissionHandler = exports.getSubmissionById = exports.getAllSubmissions = void 0;
const submission_model_1 = __importDefault(require("../models/submission.model"));
/**
 * Add Submission
 * @param req - Request object
 * @param res - Response object
 * @returns - JSON response with submission
 * @path /api/submission/add
 * @method POST
 */
const addSubmissionHandler = async (req, res) => {
    try {
        const user = req.user;
        const userId = user?._id;
        const { problemId, code, language, status } = req.body;
        if (!userId || !problemId || !code || !language) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const submission = new submission_model_1.default({
            userId,
            problemId,
            code,
            language,
            status: status,
        });
        await submission.save();
        res.status(201).json({ message: "Submission successful", id: submission._id });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
exports.addSubmissionHandler = addSubmissionHandler;
/**
 * Get All Submission for a problem
 * @param req - Request object
 * @param res - Response object
 * @returns - JSON response with all submissions
 * @path /api/submission/problem/:problemId/all
 * @method GET
 */
const getAllSubmissions = async (req, res) => {
    const user = req.user;
    const userId = user?._id;
    const { problemId } = req.params;
    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const submissions = await submission_model_1.default.find({
            userId,
            problemId,
        })
            .populate("userId", "fullname username email")
            .populate("problemId", "title difficulty")
            .sort({ createdAt: -1 });
        res.status(200).json(submissions);
        return;
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
exports.getAllSubmissions = getAllSubmissions;
const getSubmissionById = async (req, res) => {
    try {
        const { id } = req.params;
        const submission = await submission_model_1.default.findById(id)
            .populate("userId", "fullname username email")
            .populate("problemId", "title difficulty");
        if (!submission) {
            return res.status(404).json({ message: "Submission not found" });
        }
        res.status(200).json(submission);
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
exports.getSubmissionById = getSubmissionById;
