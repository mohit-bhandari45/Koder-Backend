import type { Request, Response } from "express";
import { AppError } from "../../utils/appError.utils";
import { makeResponse } from "../../utils/makeResponse.utils";
import { searchProblems } from "./search.service";

/**
 * @route GET /api/search
 * @query q {string} - Search query (required)
 * @query page {number} - Page number (default: 1)
 * @query limit {number} - Results per page (default: 30)
 */
export async function searchProblemHandler(req: Request, res: Response): Promise<void> {
  try {
    const query = req.query.q as string;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 30;
    const skip = (page - 1) * limit;

    if (!query || query.trim().length === 0) {
      throw new AppError("Query parameter 'q' is required", 400);
    }

    const { problems, total } = await searchProblems(query, skip, limit);

    const answer = {
      query,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalResults: total,
      results: problems,
    };
    res.status(200).json(makeResponse("Got All Problems", answer));
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json(makeResponse(error.message));
      return;
    }

    console.error("Unexpected Error:", error);
    res.status(500).json(makeResponse("Internal Server Error"));
  }
}