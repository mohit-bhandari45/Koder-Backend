"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllProblemsHandler = getAllProblemsHandler;
exports.addProblemHandler = addProblemHandler;
exports.getProblemByIdHandler = getProblemByIdHandler;
const problem_model_1 = __importDefault(require("./problem.model"));
/**
 * Get all problems
 * @param req - Request object
 * @param res - Response object
 * @returns - JSON response with problems, current page, and total pages
 * @path /api/problems
 * @method GET
 */
async function getAllProblemsHandler(req, res) {
    const page = parseInt(req.query.page) || 1;
    const limit = 30;
    const skip = (page - 1) * limit;
    try {
        const problems = await problem_model_1.default.find().skip(skip).limit(limit);
        const totalProblems = await problem_model_1.default.countDocuments();
        res.json({
            message: "Problems fetched successfully",
            data: problems,
            currentPage: page,
            totalPages: Math.ceil(totalProblems / limit),
        });
        return;
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
        return;
    }
}
/**
 * Add a new problem
 * @param req - Request object
 * @param res - Response object
 * @returns - JSON response with message and problem id
 * @path /api/problems
 * @method POST
 */
async function addProblemHandler(req, res) {
    const { title, description, testCases } = req.body;
    try {
        if (!title || !description || !testCases) {
            res.status(400).json({ message: "All fields are required" });
            return;
        }
        const problem = await problem_model_1.default.create({ title, description, testCases });
        res.status(201).json({ message: "Problem created successfully", id: problem._id.toString() });
        return;
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}
/**
 * Get a problem by id
 * @param req - Request object
 * @param res - Response object
 * @returns - JSON response with problem
 * @path /api/problems/:id
 * @method GET
 */
async function getProblemByIdHandler(req, res) {
    const { id } = req.params;
    try {
        const problem = await problem_model_1.default.findById(id);
        if (!problem) {
            res.status(404).json({ message: "Problem not found" });
            return;
        }
        res.status(200).json({ message: "Problem fetched successfully", data: problem });
        return;
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}
