import { Router } from "express";
import userRoutes from "./user.route";
import problemRoutes from "./problem.route";
import submissionRoutes from "./submission.route";
import { authCheck } from "../../middlware/auth.middleware";

const router = Router();
router.use(authCheck);

router.use("/user", userRoutes);
router.use("/problem", problemRoutes);
router.use("/submission", submissionRoutes);

export default router;