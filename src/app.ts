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
app.use(cors());
// app.use(
//   cors({
//     origin: [
//       "*",
//       // "https://ai-chat-frontend.vercel.app/",
//       // "https://ai-chat-frontend-git-master-kunalkatara12.vercel.app/",
//       // "https://ai-chat-frontend-caukke0nc-kunalkatara12.vercel.app/",
//       // "https://calm-khapse-f64d9a.netlify.app/",
//       // "https://glittering-babka-72d1cb.netlify.app/",
//     ],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true,
//   })
// );
// remove this middleware in production
// app.use(morgan("dev"));
app.use("/api/v1", appRouter);
export default app;
