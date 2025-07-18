import express from "express";
import publicRoutes from "./routes/public";
import cors from "cors";

const app = express();
const PORT = 3000;

// middlewares
app.use(express.json());
app.use(cors());

app.use("/", publicRoutes);
// app.use("/auth");
// app.use("/api");

export default app;