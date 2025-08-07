import { Router } from "express";
import passport from "passport";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt.utils";
import { forgotPasswordHandler, loginHandler, logoutHandler, refreshTokenHandler, resendOtpHandler, resetPasswordHandler, signupHandler, verifyEmailHandler, verifyResetOtpHandler } from "./auth.controller";
import MailService from "./email.service";

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
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

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

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 15 * 60 * 1000 // 15 minutes
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
    if (user.username) {
      res.redirect(`https://specified-peacock-mohit123-1b61bd1c.koyeb.app/u/${user.username}`);
    } else {
      res.redirect(`https://specified-peacock-mohit123-1b61bd1c.koyeb.app/auth/username`);
    }
  }
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

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 15 * 60 * 1000 // 15 minutes
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
    if (user.username) {
      res.redirect(`https://specified-peacock-mohit123-1b61bd1c.koyeb.app/u/${user.username}`);
    } else {
      res.redirect(`https://specified-peacock-mohit123-1b61bd1c.koyeb.app/auth/username`);
    }
  }
);

router.get("/google/failure", (req, res) => {
  res.status(401).json({ msg: "Google authentication failed" });
});
router.get("/github/failure", (req, res) => {
  res.status(401).json({ msg: "Github authentication failed" });
});

export default router;