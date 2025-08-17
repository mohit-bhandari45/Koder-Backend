import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import { connectDatabase } from "./config/database";
import { initializePassport } from "./config/passpost";
import authRoutes from "./modules/auth/auth.routes";
import apiRoutes from "./modules/routes/api";
import publicRoutes from "./modules/routes/public";

const app = express();

// Connect to database
connectDatabase();
initializePassport(); //passport initialization

// middlewares
app.use(express.json());
app.use(
    cors({
        origin: process.env.NODE_ENV === "production"
            ? "https://koder-frontend.vercel.app"
            : "http://localhost:3000",
        credentials: true,
    })
);

app.use(morgan('dev'));
app.use(cookieParser());

app.use("/auth", authRoutes);  // auth routes
app.use("/api", apiRoutes);  // apt routes
app.use("/", publicRoutes);  // public routes

export default app;