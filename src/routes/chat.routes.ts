import { Router } from "express";
import { verifyToken } from "../utils/token-manager.utils";
import { messageValidator, validate } from "../utils/validators.utils";
import {
  generateChatCompletion,
  allChats,
  deleteChats,
} from "../controllers/chats.controllers";

const chatRouter = Router();

chatRouter.post(
  "/new",
  validate(messageValidator),
  verifyToken,
  generateChatCompletion
);

chatRouter.get(
  "/all-chats",
  verifyToken,
  allChats
);
chatRouter.delete(
  "/delete",
  verifyToken,
  deleteChats
);
export default chatRouter;
