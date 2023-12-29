"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const token_manager_utils_1 = require("../utils/token-manager.utils");
const validators_utils_1 = require("../utils/validators.utils");
const chats_controllers_1 = require("../controllers/chats.controllers");
const chatRouter = (0, express_1.Router)();
chatRouter.post("/new", (0, validators_utils_1.validate)(validators_utils_1.messageValidator), token_manager_utils_1.verifyToken, chats_controllers_1.generateChatCompletion);
chatRouter.get("/all-chats", token_manager_utils_1.verifyToken, chats_controllers_1.allChats);
chatRouter.delete("/delete", token_manager_utils_1.verifyToken, chats_controllers_1.deleteChats);
exports.default = chatRouter;
//# sourceMappingURL=chat.routes.js.map