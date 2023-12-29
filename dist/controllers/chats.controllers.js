"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteChats = exports.allChats = exports.generateChatCompletion = void 0;
const User_models_1 = __importDefault(require("../models/User.models"));
const openai_config_1 = __importDefault(require("../config/openai.config"));
const config = (0, openai_config_1.default)();
const generateChatCompletion = async (req, res, next) => {
    // Assuming req is of type Express.Request
    // message from user
    const { message } = req.body;
    try {
        //check user
        const user = await User_models_1.default.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).json({
                message: "User not registered or Token Malfunctioned",
            });
        }
        // grab chats of the user
        const chats = user.chats.map(({ role, content }) => ({
            role,
            content,
        }));
        //send all chats with new one
        chats.push({ role: "user", content: message });
        user.chats.push({ role: "user", content: message });
        //get latest response
        const chatResponse = await config.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: chats, // think about this messages:chats,
        });
        user.chats.push(chatResponse.choices[0].message);
        await user.save();
        return res.status(200).json({
            message: "Ok",
            chats: user.chats,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal server error in chats.controllers.ts",
            cause: error.message,
        });
    }
};
exports.generateChatCompletion = generateChatCompletion;
const allChats = async (req, res, next) => {
    try {
        const user = await User_models_1.default.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).json({
                message: "User not registered or Token Malfunctioned",
            });
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).json({
                message: "Permissions did not match",
            });
        }
        //  console.log(user._id.toString(),res.locals.jwtData.id)
        return res.status(200).json({
            message: "Ok",
            // id: user._id.toString(),
            chats: user.chats,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error in user.controllers.ts",
            cause: error.message,
        });
    }
};
exports.allChats = allChats;
const deleteChats = async (req, res, next) => {
    try {
        const user = await User_models_1.default.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).json({
                message: "User not registered or Token Malfunctioned",
            });
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).json({
                message: "Permissions did not match",
            });
        }
        // @ts-ignore
        user.chats = [];
        await user.save();
        //  console.log(user._id.toString(),res.locals.jwtData.id)
        return res.status(200).json({
            message: "Ok",
            // id: user._id.toString(),
            // chats: user.chats,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error in user.controllers.ts",
            cause: error.message,
        });
    }
};
exports.deleteChats = deleteChats;
//# sourceMappingURL=chats.controllers.js.map