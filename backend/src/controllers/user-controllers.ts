import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { hash, compare } from "bcrypt";

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

    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res.status(422).json({ message: "User already exists" });

    const hashedPassword = await hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    return res
      .status(201)
      .json({ id: user._id.toString(), message: "User created" });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Error", cause: error.message });
  }
};

export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not registered" });
    } else {
      const isPasswordCorrect = await compare(password, user.password);

      if (!isPasswordCorrect)
        return res.status(401).json({ message: "Invalid password" });

      return res.status(200).json({ message: "Ok", id: user._id.toString() });
    }
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Error", cause: error.message });
  }
};
