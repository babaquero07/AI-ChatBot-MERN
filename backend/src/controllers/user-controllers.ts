import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { hash } from "bcrypt";

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find();

    return res.status(200).json({ users, total: users.length, message: "Ok" });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Error", cause: error.message });
  }
};

export const userSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Missing fields" });
    } else {
      const hashedPassword = await hash(password, 10);

      const user = new User({ name, email, password: hashedPassword });
      await user.save();

      return res
        .status(201)
        .json({ id: user._id.toString(), message: "User created" });
    }
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Error", cause: error.message });
  }
};
