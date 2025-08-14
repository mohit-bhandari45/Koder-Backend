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
    // target: "http://localhost:8000/dashboard", // dashboard backend
    target: "https://koder-dashboard.onrender.com/dashboard", // dashboard backend
    changeOrigin: true,
    secure: false,
    cookieDomainRewrite: "",
    on: {
      proxyReq: (proxyReq, req) => {
        const expressReq = req as import("express").Request;
        if (expressReq.cookies?.accessToken) {
          proxyReq.setHeader("Authorization", `Bearer ${expressReq.cookies.accessToken}`);
        }
      },
    },
  })
);

export default router;
