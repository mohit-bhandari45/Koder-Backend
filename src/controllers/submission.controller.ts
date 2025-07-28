import { Request, Response } from "express";
import SubmissionModel from "../models/submission.model";
import { IUser } from "../types/userTypes";

/**
 * Add Submission
 * @param req - Request object
 * @param res - Response object
 * @returns - JSON response with submission
 * @path /api/submission/add
 * @method POST
 */

const addSubmissionHandler = async (req: Request, res: Response) => {
    try {
        const user = req.user as IUser | undefined;
        const userId = user?._id;
        const { problemId, code, language, status } = req.body;

        if (!userId || !problemId || !code || !language) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const submission = new SubmissionModel({
            userId,
            problemId,
            code,
            language,
            status: status,
        }); 
        await submission.save();
        res.status(201).json({ message: "Submission successful", id: submission._id });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

/**
 * Get All Submission for a problem
 * @param req - Request object
 * @param res - Response object
 * @returns - JSON response with all submissions
 * @path /api/submission/problem/:problemId/all
 * @method GET
 */
export const getAllSubmissions = async (req: Request, res: Response) => {
    const user = req.user as IUser | undefined;
    const userId = user?._id;
    const { problemId } = req.params;

    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const submissions = await SubmissionModel.find({
            userId,
            problemId,
        })
            .populate("userId", "fullname username email")
            .populate("problemId", "title difficulty")
            .sort({ createdAt: -1 });

        res.status(200).json(submissions);
        return;
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

export const getSubmissionById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const submission = await SubmissionModel.findById(id)
            .populate("userId", "fullname username email")
            .populate("problemId", "title difficulty");
        if (!submission) {
            return res.status(404).json({ message: "Submission not found" });
        }
        res.status(200).json(submission);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

export { addSubmissionHandler };