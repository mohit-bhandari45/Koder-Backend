import express from "express";
import publicRoutes from "./routes/public";
import authRoutes from "./modules/auth/auth.routes";
import cors from "cors";
import { initializePassport } from "./config/passpost";
import { connectDatabase } from "./config/database";
import apiRoutes from "./routes/api";
import cookieParser from "cookie-parser";

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
app.use("/", publicRoutes);
app.use("/api", apiRoutes);

export default app;