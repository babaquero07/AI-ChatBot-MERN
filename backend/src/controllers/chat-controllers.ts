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
      model: "gpt-4",
    });
    console.log(
      "🚀 ~ file: chat-controllers.ts:33 ~ chatResponse:",
      chatResponse
    );
    //   user.chats.push()
    // await user.save();

    return res.status(200).json({ chats: user.chats });
  } catch (error) {
    console.log("🚀 ~ file: chat-controllers.ts:42 ~ error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
