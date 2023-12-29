"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Chats_models_1 = __importDefault(require("./Chats.models"));
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    isGoogleAccount: {
        type: Boolean,
        default: false,
    },
    password: {
        type: String,
        required: function () {
            return this.isGoogleAccount === false;
        },
    },
    chats: [Chats_models_1.default],
});
exports.default = mongoose_1.default.model("User", userSchema);
//# sourceMappingURL=User.models.js.map