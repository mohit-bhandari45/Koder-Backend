import { Router } from "express";
import { addSubmissionHandler, getAllSubmissions, getSubmissionById } from "../../controllers/submission.controller";

const router = Router();

router.post("/add", addSubmissionHandler);
router.get("/submissions", getAllSubmissions);
router.get("/submissions/:id", getSubmissionById);

export default router;
