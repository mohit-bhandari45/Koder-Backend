import { Request, Response } from "express";
import SubmissionModel from "./submission.model";
import { IUser } from "../../types/user.types";
import { AppError } from "../../utils/appError.utils";
import { makeResponse } from "../../utils/makeResponse.utils";

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
        const { problemId, code, language, status, runtime, memory } = req.body;

        if (!userId || !problemId || !code || !language) {
            throw new AppError("Missing required fields", 400);
        }

        const submission = new SubmissionModel({
            userId,
            problemId,
            code,
            language,
            status: status,
            runtime,
            memory
        });
        await submission.save();

        res.status(201).json(makeResponse("Submission successful", submission._id));
    } catch (error) {
        if (error instanceof AppError) {
            res.status(error.statusCode).json(makeResponse(error.message));
            return;
        }

        console.error("Unexpected Error:", error);
        res.status(500).json(makeResponse("Internal Server Error"));
    }
};

/**
 * Get all User Submissions
 * @param req - Request object
 * @param res - Response object
 * @returns - JSON response with submission
 * @path /api/submission/all
 * @method POST
 */
export const getAllUserSubmissions = async (req: Request, res: Response): Promise<void> => {
    const userId = req.user?._id;

    if (!userId) {
        throw new AppError("Unauthorized", 401);
    }

    const page = parseInt(req.query.page as string) || 1;
    const limit = 20;
    const skip = (page - 1) * limit;

    try {
        const totalSubmissions = await SubmissionModel.countDocuments({ userId });
        const allSubmissions = await SubmissionModel.find({ userId })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        res.status(200).json(makeResponse("Got all user submissions", {
            submissions: allSubmissions,
            page,
            totalPages: Math.ceil(totalSubmissions / limit),
            totalSubmissions
        }));
    } catch (error) {
        if (error instanceof AppError) {
            res.status(error.statusCode).json(makeResponse(error.message));
            return;
        }

        console.error("Unexpected Error:", error);
        res.status(500).json(makeResponse("Internal Server Error"));
    }
}

/**
 * Get All Submission for a problem
 * @param req - Request object
 * @param res - Response object
 * @returns - JSON response with all submissions
 * @path /api/submission/problem/:problemId/all
 * @method GET
 */
export const getAllProblemSubmissions = async (req: Request, res: Response) => {
    const user = req.user as IUser | undefined;
    const userId = user?._id;
    const { problemId } = req.params;

    if (!userId) {
        throw new AppError("Unauthorized", 401);
    }

    try {
        const submissions = await SubmissionModel.find({
            userId,
            problemId,
        })
            .populate("userId", "fullname username email")
            .populate("problemId", "title difficulty")
            .sort({ createdAt: -1 });

        res.status(200).json(makeResponse("Got all problem submission", submissions));
    } catch (error) {
        if (error instanceof AppError) {
            res.status(error.statusCode).json(makeResponse(error.message));
            return;
        }

        console.error("Unexpected Error:", error);
        res.status(500).json(makeResponse("Internal Server Error"));
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
        res.status(200).json(makeResponse("Got The submission", submission));
    } catch (error) {
        if (error instanceof AppError) {
            res.status(error.statusCode).json(makeResponse(error.message));
            return;
        }

        console.error("Unexpected Error:", error);
        res.status(500).json(makeResponse("Internal Server Error"));
    }
};

export { addSubmissionHandler };