import { Request, Response, NextFunction } from "express";
import User from "../models/User.models";
import configureOpenAI from "../config/openai.config";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/chat/completions";
interface RequestBody {
  message: string;
}

const config = configureOpenAI();
export const generateChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Assuming req is of type Express.Request
  // message from user
  const { message } = req.body;
  try {
    //check user
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).json({
        message: "User not registered or Token Malfunctioned",
      });
    }
    // grab chats of the user
    const chats = user.chats.map(({ role, content }) => ({
      role,
      content,
    })) as ChatCompletionMessageParam[];

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
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error in chats.controllers.ts",
      cause: error.message,
    });
  }
};
export const allChats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);
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
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error in user.controllers.ts",
      cause: error.message,
    });
  }
};

export const deleteChats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);
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
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error in user.controllers.ts",
      cause: error.message,
    });
  }
};
