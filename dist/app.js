"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const index_1 = __importDefault(require("./routes/index"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
(0, dotenv_1.config)();
const app = (0, express_1.default)();
//middlewares
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)(process.env.COOKIE_SECRET));
app.use((0, cors_1.default)({
    origin: [
        // "http://localhost:5173",
        "https://ai-chat-frontend.vercel.app/",
        "https://ai-chat-frontend-git-master-kunalkatara12.vercel.app/",
        "https://ai-chat-frontend-caukke0nc-kunalkatara12.vercel.app/",
        "https://glittering-babka-72d1cb.netlify.app/",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
}));
// remove this middleware in production
// app.use(morgan("dev"));
app.use("/api/v1", index_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map