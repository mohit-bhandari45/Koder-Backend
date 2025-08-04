import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GithubStrategy } from "passport-github2";
import axios from "axios";
import User from "../modules/auth/user.model";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || "";
const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL || "";
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID || "";
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET || "";
const GITHUB_CALLBACK_URL = process.env.GITHUB_CALLBACK_URL || "";

export function initializePassport() {
  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: GOOGLE_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await User.findOne({ email: profile.emails?.[0]?.value });
          if (user && user.googleId !== profile.id) {
            user.googleId = profile.id;
            await user.save();
          }

          if (!user) {
            user = await User.create({
              fullname: profile.displayName,
              email: profile.emails?.[0]?.value || "",
              profilepicture: profile.photos?.[0]?.value,
              googleId: profile.id,
            });
          }
          return done(null, user);
        } catch (err) {
          return done(err, undefined);
        }
      }
    )
  );

  passport.use(
    new GithubStrategy(
      {
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        callbackURL: GITHUB_CALLBACK_URL
      },
      async (accessToken: any, refreshToken: any, profile: { emails: { value: any; }[]; displayName: any; id: string, username: any; photos: { value: any; }[]; }, done: (arg0: unknown, arg1: any) => any) => {
        try {
          // 👇 Fetch verified primary email
          const { data: emails } = await axios.get("https://api.github.com/user/emails", {
            headers: {
              Authorization: `token ${accessToken}`,
              Accept: "application/vnd.github+json",
            },
          });

          const primaryEmailObj = emails.find((email: any) => email.primary && email.verified);
          const email = primaryEmailObj?.email;

          if (!email) return done(new Error("No verified primary email found"), undefined);

          let user = await User.findOne({ email });

          if (user && user.githubId !== profile.id) {
            user.githubId = profile.id;
            await user.save();
          }

          if (!user) {
            user = await User.create({
              fullname: profile.displayName || profile.username,
              email,
              profilepicture: profile.photos?.[0]?.value || "",
              githubId: profile.id,
            });
          }

          return done(null, user);
        } catch (err) {
          return done(err, undefined);
        }
      }
    )
  );
} 