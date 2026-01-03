import { Router } from "express";
import passport from "passport";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt.utils";
import { forgotPasswordHandler, loginHandler, logoutHandler, refreshTokenHandler, resendOtpHandler, resetPasswordHandler, signupHandler, verifyEmailHandler, verifyResetOtpHandler } from "./auth.controller";
import MailService from "./email.service";

const isProduction = process.env.NODE_ENV === "production";
const router = Router();

router.post("/signup", signupHandler);
router.post("/login", loginHandler);
router.post("/verify-email", verifyEmailHandler);
router.post("/refresh", refreshTokenHandler);
router.post("/resend-otp", resendOtpHandler);
router.post("/logout", logoutHandler);

/* Forgot-Password */
router.post("/forgot-password", forgotPasswordHandler);
router.post("/verify-reset-otp", verifyResetOtpHandler);
router.post("/reset-password", resetPasswordHandler);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
);

const FRONTEND_REDIRECTION_URL = isProduction ? "https://koder-frontend.vercel.app" : "http://localhost:3000";

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/auth/google/failure", session: false }),
  async (req, res) => {
    const user = req.user;
    if (!user) {
      return res.redirect("/auth/google/failure");
    }
    const accessToken = generateAccessToken(user as any);
    const refreshToken = generateRefreshToken(user as any);
    await MailService.sendWelcomeEmail(user.email);

    const redirectUrl = user.username
      ? `${FRONTEND_REDIRECTION_URL}/u/${user.username}?accessToken=${accessToken}&refreshToken=${refreshToken}`
      : `${FRONTEND_REDIRECTION_URL}/auth/username?accessToken=${accessToken}&refreshToken=${refreshToken}`;

    res.redirect(redirectUrl);
  },
);

router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/auth/github/failure", session: false }),
  async (req: any, res) => {
    const user = req.user;
    if (!user) {
      return res.redirect("/auth/github/failure");
    }
    const accessToken = generateAccessToken(user as any);
    const refreshToken = generateRefreshToken(user as any);

    await MailService.sendWelcomeEmail(user.email);

    const redirectUrl = user.username
      ? `${FRONTEND_REDIRECTION_URL}/u/${user.username}?accessToken=${accessToken}&refreshToken=${refreshToken}`
      : `${FRONTEND_REDIRECTION_URL}/auth/username?accessToken=${accessToken}&refreshToken=${refreshToken}`;

    res.redirect(redirectUrl);
  },
);

router.get("/google/failure", (req, res) => {
  res.status(401).json({ msg: "Google authentication failed" });
});
router.get("/github/failure", (req, res) => {
  res.status(401).json({ msg: "Github authentication failed" });
});

export default router;