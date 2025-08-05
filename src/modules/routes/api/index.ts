import { Router } from "express";
import { authCheck } from "../../middleware/auth.middleware";
import problemRoutes from "../../problems/problem.route";
import userRoutes from "../../user/user.route";
import submissionRoutes from "../../submissions/submission.route";

const router = Router();

// middleware
router.use(authCheck);

router.use("/problem", problemRoutes);
router.use("/user", userRoutes);
router.use("/submission", submissionRoutes);

export default router;