"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializePassport = initializePassport;
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const passport_github2_1 = require("passport-github2");
const axios_1 = __importDefault(require("axios"));
const user_model_1 = __importDefault(require("../modules/shared/user.model"));
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || "";
const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL || "";
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID || "";
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET || "";
const GITHUB_CALLBACK_URL = process.env.GITHUB_CALLBACK_URL || "";
function initializePassport() {
    passport_1.default.use(new passport_google_oauth20_1.Strategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: GOOGLE_CALLBACK_URL,
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await user_model_1.default.findOne({ email: profile.emails?.[0]?.value });
            if (user && user.googleId !== profile.id) {
                user.googleId = profile.id;
                await user.save();
            }
            if (!user) {
                user = await user_model_1.default.create({
                    fullname: profile.displayName,
                    email: profile.emails?.[0]?.value || "",
                    profilepicture: profile.photos?.[0]?.value,
                    googleId: profile.id,
                });
            }
            return done(null, user);
        }
        catch (err) {
            return done(err, undefined);
        }
    }));
    passport_1.default.use(new passport_github2_1.Strategy({
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        callbackURL: GITHUB_CALLBACK_URL
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            // 👇 Fetch verified primary email
            const { data: emails } = await axios_1.default.get("https://api.github.com/user/emails", {
                headers: {
                    Authorization: `token ${accessToken}`,
                    Accept: "application/vnd.github+json",
                },
            });
            const primaryEmailObj = emails.find((email) => email.primary && email.verified);
            const email = primaryEmailObj?.email;
            if (!email)
                return done(new Error("No verified primary email found"), undefined);
            let user = await user_model_1.default.findOne({ email });
            if (user && user.githubId !== profile.id) {
                user.githubId = profile.id;
                await user.save();
            }
            if (!user) {
                user = await user_model_1.default.create({
                    fullname: profile.displayName || profile.username,
                    email,
                    profilepicture: profile.photos?.[0]?.value || "",
                    githubId: profile.id,
                });
            }
            return done(null, user);
        }
        catch (err) {
            return done(err, undefined);
        }
    }));
}
