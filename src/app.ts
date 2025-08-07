import express from "express";
import cors from "cors";
import { initializePassport } from "./config/passpost";
import { connectDatabase } from "./config/database";
import cookieParser from "cookie-parser";
import publicRoutes from "./modules/routes/public";
import authRoutes from "./modules/auth/auth.routes";
import apiRoutes from "./modules/routes/api";
import { allowedOrigins } from "./utils/allowed.hosts";

const app = express();

// Connect to database
connectDatabase();
initializePassport(); //passport initialization

// middlewares
app.use(express.json());
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
}));

app.use(cookieParser());

app.use("/auth", authRoutes);  // auth routes
app.use("/api", apiRoutes);  // apt routes
app.use("/", publicRoutes);  // public routes

export default app;