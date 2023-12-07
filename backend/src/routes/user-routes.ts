import { Router } from "express";

import { verifyToken } from "../utils/token-manager.js";

import {
  getAllUsers,
  userSignup,
  userLogin,
  verifyUser,
} from "../controllers/user-controllers.js";
import {
  loginValidator,
  signupValidator,
  validate,
} from "../utils/validators.js";

const userRoutes = Router();

userRoutes.get("/", getAllUsers);
userRoutes.post("/signup", validate(signupValidator), userSignup);
userRoutes.post("/login", validate(loginValidator), userLogin);
userRoutes.post("/auth-status", verifyToken, verifyUser);

export default userRoutes;
