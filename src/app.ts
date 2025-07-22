import express from "express";
import publicRoutes from "./routes/public";
import authRoutes from "./routes/auth";
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

app.use("/", publicRoutes);
app.use("/auth", authRoutes);
app.use("/api", apiRoutes);

export default app;