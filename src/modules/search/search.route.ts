import { Router } from "express";
import { searchProblemHandler } from "./search.controller";

const router = Router();

router.get("/", searchProblemHandler);

export default router;
