import express from "express";
import cors from "cors";
import helmet from "helmet";
import { userRouter } from "./routes/userRoutes.ts";
import { TaskRouter } from "./routes/taskRoutes.ts";
import { limiter } from "./middleware/rateLimiter.ts";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(limiter);

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});
app.use("/auth", userRouter);
app.use("/tasks/:user_id", TaskRouter);

export default app;
