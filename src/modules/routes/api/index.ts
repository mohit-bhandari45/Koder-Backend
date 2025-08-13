import { Router } from "express";
import { authCheck } from "../../middleware/auth.middleware";
import problemRoutes from "../../problems/problem.route";
import userRoutes from "../../user/user.route";
import submissionRoutes from "../../submissions/submission.route";
import { createProxyMiddleware } from "http-proxy-middleware";

const router = Router();

// Protected local routes
router.use(authCheck);
router.use("/problem", problemRoutes);
router.use("/user", userRoutes);
router.use("/submission", submissionRoutes);

// ✅ Proxy dashboard requests through main server
// Include auth token in headers so dashboard backend can validate it
router.use(
  "/dashboard",
  createProxyMiddleware({
    target: "https://koder-dashboard.onrender.com",
    changeOrigin: true,
    secure: true,
    cookieDomainRewrite: "", // rewrite dashboard cookies to match main server
    pathRewrite: { "^/dashboard": "/dashboard" },
    // @ts-expect-error: onProxyReq is a valid option at runtime
    onProxyReq: (proxyReq, req) => {
      // send the access token to dashboard backend
      if (req.cookies?.accessToken) {
        proxyReq.setHeader("Authorization", `Bearer ${req.cookies.accessToken}`);
      }
    },
  } as any)
);

export default router;
