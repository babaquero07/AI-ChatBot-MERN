import { Router } from "express";
import { verifyToken } from "../utils/token-manager.js";
import { chatCompletationValidator, validate } from "../utils/validators.js";
import { generateChatCompletition } from "../controllers/chat-controllers.js";

// Protected API
const chatRoutes = Router();

chatRoutes.post(
  "/new",
  validate(chatCompletationValidator),
  verifyToken,
  generateChatCompletition
);

export default chatRoutes;
