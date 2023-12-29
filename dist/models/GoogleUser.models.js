"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Chats_models_1 = __importDefault(require("./Chats.models"));
const userSchemaGoogle = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    jti: {
        type: String,
        required: true,
    },
    chats: [Chats_models_1.default],
});
exports.default = mongoose_1.default.model("UserGoogle", userSchemaGoogle);
//# sourceMappingURL=GoogleUser.models.js.map