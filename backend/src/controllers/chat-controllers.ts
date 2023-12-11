import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { configureOpenAI } from "../config/openai-config.js";
import OpenAI from "openai";

export const generateChatCompletition = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { message } = req.body;

  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res
        .status(401)
        .json({ message: "User not found OR Token malfunctioned" });
    }

    // Grab chat of user
    const chats = user.chats.map(({ role, content }) => ({ role, content }));
    chats.push({ role: "user", content: message });
    user.chats.push({ role: "user", content: message });

    // Send all chat with new one to openAI API
    const config = configureOpenAI();
    const openai = new OpenAI(config);

    const chatResponse = await openai.chat.completions.create({
      messages: chats,
      model: "gpt-3.5-turbo",
    });

    user.chats.push(chatResponse.choices[0].message);
    await user.save();

    return res.status(200).json({ chats: user.chats });
  } catch (error) {
    console.log("🚀 ~ file: chat-controllers.ts:42 ~ error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const sendChatsToUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //user token check
    const user = await User.findById(res.locals.jwtData.id);

    if (!user) {
      return res.status(401).send("User not registered OR Token malfunctioned");
    } else if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }

    return res.status(200).json({ message: "OK", chats: user.chats });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};
