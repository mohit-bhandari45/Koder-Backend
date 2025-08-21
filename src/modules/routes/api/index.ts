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
    target:
      process.env.NODE_ENV === "production"
        ? "https://koder-dashboard-main.onrender.com/dashboard"
        : "http://localhost:8000/dashboard",
    changeOrigin: true,
    secure: false,
    cookieDomainRewrite: "",
    on: {
      proxyReq: (proxyReq, req) => {
        const expressReq = req as import("express").Request;
        if (expressReq.cookies?.accessToken) {
          proxyReq.setHeader(
            "Authorization",
            `Bearer ${expressReq.cookies.accessToken}`
          );
        }
      },
      proxyRes: (proxyRes, req, res) => {
        // Ensure CORS headers are visible to browser
        proxyRes.headers["Access-Control-Allow-Origin"] =
          process.env.NODE_ENV === "production"
            ? "https://koder-frontend.vercel.app"
            : "http://localhost:3000";
        proxyRes.headers["Access-Control-Allow-Credentials"] = "true";
      },
    },
  })
);


export default router;
