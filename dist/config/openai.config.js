"use strict";
// config open ai api key
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const openai_1 = __importDefault(require("openai"));
const configureOpenAI = () => {
    const config = new openai_1.default({
        apiKey: String(process.env.OPENAI_API_KEY),
        organization: process.env.OPEN_AI_ORGANIZATION_ID,
    });
    return config;
};
exports.default = configureOpenAI;
//# sourceMappingURL=openai.config.js.map