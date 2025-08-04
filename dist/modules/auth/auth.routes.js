"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = require("../../utils/jwt");
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const auth_controller_1 = require("./auth.controller");
const email_service_1 = __importDefault(require("./email.service"));
const router = (0, express_1.Router)();
router.post("/signup", auth_controller_1.signupHandler);
router.post("/login", auth_controller_1.loginHandler);
router.post("/verify", auth_controller_1.verifyEmailHandler);
router.post("/refresh", auth_controller_1.refreshTokenHandler);
router.get("/google", passport_1.default.authenticate("google", { scope: ["profile", "email"] }));
router.get("/github", passport_1.default.authenticate("github", { scope: ["user:email"] }));
router.get("/google/callback", passport_1.default.authenticate("google", { failureRedirect: "/auth/google/failure", session: false }), async (req, res) => {
    const user = req.user;
    if (!user) {
        return res.redirect("/auth/google/failure");
    }
    const accessToken = (0, jwt_1.generateAccessToken)(user);
    const refreshToken = (0, jwt_1.generateRefreshToken)(user);
    await email_service_1.default.sendWelcomeEmail(user.email);
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
        res.redirect(`http://localhost:3000/u/${user.username}`);
    }
    else {
        res.redirect(`http://localhost:3000/auth/username`);
    }
});
router.get("/github/callback", passport_1.default.authenticate("github", { failureRedirect: "/auth/github/failure", session: false }), async (req, res) => {
    const user = req.user;
    if (!user) {
        return res.redirect("/auth/github/failure");
    }
    const accessToken = (0, jwt_1.generateAccessToken)(user);
    const refreshToken = (0, jwt_1.generateRefreshToken)(user);
    await email_service_1.default.sendWelcomeEmail(user.email);
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
        res.redirect(`http://localhost:3000/u/${user.username}`);
    }
    else {
        res.redirect(`http://localhost:3000/auth/username`);
    }
});
router.get("/google/failure", (req, res) => {
    res.status(401).json({ msg: "Google authentication failed" });
});
router.get("/github/failure", (req, res) => {
    res.status(401).json({ msg: "Github authentication failed" });
});
exports.default = router;
