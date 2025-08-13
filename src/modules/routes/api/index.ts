import { Router } from "express";
import { authCheck } from "../../middleware/auth.middleware";
import problemRoutes from "../../problems/problem.route";
import userRoutes from "../../user/user.route";
import submissionRoutes from "../../submissions/submission.route";
import { createProxyMiddleware } from "http-proxy-middleware";

const router = Router();

// ----------------------------
// Protected local routes
// ----------------------------
router.use(authCheck);
router.use("/problem", problemRoutes);
router.use("/user", userRoutes);
router.use("/submission", submissionRoutes);

// ----------------------------
// Proxy dashboard requests through main server
// ----------------------------
router.use(
  "/dashboard",
  createProxyMiddleware({
    target: "https://koder-dashboard.onrender.com",
    changeOrigin: true,
    secure: true,
    cookieDomainRewrite: "", // ensures dashboard cookies appear from main server domain
    // no pathRewrite needed if main server and dashboard paths match
    on: {
      proxyReq: (proxyReq, req) => {
        // Forward the access token from cookies to dashboard backend
        if ((req as any).cookies?.accessToken) {
          proxyReq.setHeader("Authorization", `Bearer ${(req as any).cookies.accessToken}`);
        }
      }
    }
  })
);

export default router;
