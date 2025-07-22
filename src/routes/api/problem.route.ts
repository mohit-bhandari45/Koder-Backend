import { Router } from "express";
import { addProblemHandler, getAllProblemsHandler, getProblemByIdHandler } from "../../controllers/problem.controller";

const router = Router();

router.get("/", getAllProblemsHandler);
router.post("/add", addProblemHandler);
router.get("/:id", getProblemByIdHandler);

export default router;