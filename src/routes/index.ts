// Import necessary modules
import express, { Request, Response } from "express";
import userRouter from "./user.routes";
import chatRouter from "./chat.routes";

// Create an instance of the Express router
const appRouter = express.Router();

// Define routes
appRouter.use("/user", userRouter);
appRouter.use("/chats", chatRouter);
// Export the router to be used in other files (e.g., your main app file)
export default appRouter;
