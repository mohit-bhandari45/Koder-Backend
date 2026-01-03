import { Router } from "express";
import {
  addSubmissionHandler,
  getAllProblemSubmissions,
  getAllUserSubmissions,
  getSubmissionById,
} from "./submission.controller";

const router = Router();

router.post("/add", addSubmissionHandler);
router.get("/all", getAllUserSubmissions);
router.get("/problem/:problemId/all", getAllProblemSubmissions);
router.get("/:id", getSubmissionById);

export default router;
