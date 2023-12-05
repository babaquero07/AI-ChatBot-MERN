import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import appRouter from "./routes/index.js";

config();
const app = express();

// Middlewares
app.use(express.json());

// Logger !todo remove in production
app.use(morgan("dev"));

app.use("/ap/v1", appRouter);

export default app;
