import { Router } from "express";
import { authCheck } from "../../middlewares/auth.middleware";
import problemRoutes from "../../problems/problem.route";
import searchRoutes from "../../search/search.route";
import submissionRoutes from "../../submissions/submission.route";
import userRoutes from "../../user/user.route";

const router = Router();

// ----------------------------
// Protected local routes
// ----------------------------
router.use(authCheck);
router.use("/problem", problemRoutes);
router.use("/user", userRoutes);
router.use("/submission", submissionRoutes);
router.use("/search", searchRoutes);

export default router;
