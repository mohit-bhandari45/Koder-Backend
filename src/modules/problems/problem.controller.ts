import type { Request, Response } from "express";
import ProblemModel from "./problem.model";
import { AppError } from "../../utils/appError.utils";
import { makeResponse } from "../../utils/makeResponse.utils";

/**
 * Get all problems
 * @param req - Request object
 * @param res - Response object
 * @returns - JSON response with problems, current page, and total pages
 * @path /api/problems
 * @method GET
 */
async function getAllProblemsHandler(req: Request, res: Response) {
  const page = parseInt(req.query.page as string) || 1;
  const limit = 30;
  const skip = (page - 1) * limit;

  try {
    const problems = await ProblemModel.find().skip(skip).limit(limit);
    const totalProblems = await ProblemModel.countDocuments();

    const result = {
      data: problems,
      currentPage: page,
      totalPages: Math.ceil(totalProblems / limit),
    };
    res.status(200).json(makeResponse("Problems fetched successfully", result));
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
 * Add a new problem
 * @param req - Request object
 * @param res - Response object
 * @returns - JSON response with message and problem id
 * @path /api/problems
 * @method POST
 */
async function addProblemHandler(req: Request, res: Response): Promise<void> {
  const { title, description, testCases } = req.body;

  try {
    if (!title || !description || !testCases) {
      throw new AppError("All fields are required", 400);
    }

    const problem = await ProblemModel.create({
      title,
      description,
      testCases,
    });
    res
      .status(200)
      .json(
        makeResponse("Problems created successfully", problem._id.toString()),
      );
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
 * Get a problem by id
 * @param req - Request object
 * @param res - Response object
 * @returns - JSON response with problem
 * @path /api/problems/:id
 * @method GET
 */
async function getProblemByIdHandler(
  req: Request,
  res: Response,
): Promise<void> {
  const { id } = req.params;

  try {
    const problem = await ProblemModel.findById(id);
    if (!problem) {
      throw new AppError("Problem not found", 404);
    }

    res
      .status(200)
      .json(makeResponse("Problems fetched successfully", problem));
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json(makeResponse(error.message));
      return;
    }

    console.error("Unexpected Error:", error);
    res.status(500).json(makeResponse("Internal Server Error"));
  }
}

export { getAllProblemsHandler, addProblemHandler, getProblemByIdHandler };
