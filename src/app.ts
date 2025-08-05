import express from "express";
import cors from "cors";
import { initializePassport } from "./config/passpost";
import { connectDatabase } from "./config/database";
import cookieParser from "cookie-parser";
import publicRoutes from "./modules/routes/public";
import authRoutes from "./modules/auth/auth.routes";
import apiRoutes from "./modules/routes/api";

const app = express();

// Connect to database
connectDatabase();
initializePassport(); //passport initialization


// middlewares
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use(cookieParser());

app.use("/auth", authRoutes);  // auth routes
app.use("/api", apiRoutes);  // apt routes
app.use("/", publicRoutes);  // public routes

export default app;