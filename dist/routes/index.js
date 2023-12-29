"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import necessary modules
const express_1 = __importDefault(require("express"));
const user_routes_1 = __importDefault(require("./user.routes"));
const chat_routes_1 = __importDefault(require("./chat.routes"));
// Create an instance of the Express router
const appRouter = express_1.default.Router();
// Define routes
appRouter.use("/user", user_routes_1.default);
appRouter.use("/chats", chat_routes_1.default);
// Export the router to be used in other files (e.g., your main app file)
exports.default = appRouter;
//# sourceMappingURL=index.js.map