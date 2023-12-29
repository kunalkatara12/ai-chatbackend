import express, { Express } from "express";
import { config } from "dotenv";
import morgan from "morgan";
import appRouter from "./routes/index";
import cookieParser from "cookie-parser";
import cors from "cors";
config();
const app: Express = express();
//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET as string));
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
// remove this middleware in production
app.use(morgan("dev"));
app.use('/api/v1',appRouter)
export default app;