import { Router } from "express";
import { codeRunnerHandler } from "../../../controllers/codeRunnerController";

const router = Router();

router.post("/run", codeRunnerHandler);

export default router;
