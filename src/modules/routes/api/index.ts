import { Router } from "express";
import { authCheck } from "../../middlewares/auth.middleware";
import problemRoutes from "../../problems/problem.route";
import userRoutes from "../../user/user.route";
import submissionRoutes from "../../submissions/submission.route";
import searchRoutes from "../../search/search.route";
import { createProxyMiddleware } from "http-proxy-middleware";

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
