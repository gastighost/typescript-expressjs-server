import dotenv from "dotenv";
dotenv.config();

import User from "../models/user";
import { IUser } from "../models/user";
import createError, { CustomErrorType } from "../utils/custom-error";

import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";

class UserServices {
  async getAllUsers(): Promise<IUser[]> {
    const users = await User.find({}).select("-password");

    return users;
  }

  async createAUser(user: IUser): Promise<IUser> {
    const { username, email, password } = user;

    const hashedPassword = await hash(password as string, 12);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    return newUser;
  }

  async getAUser(userId: string): Promise<IUser | CustomErrorType> {
    const user = await User.findById(userId).select("-password");

    if (!user) {
      throw createError("No user with this id was found", 400);
    }

    return user;
  }

  async editAUser(
    userId: string,
    user: IUser
  ): Promise<IUser | null | CustomErrorType> {
    const { username, email, password } = user;

    let hashedPassword = undefined;

    if (password) {
      hashedPassword = await hash(password as string, 12);
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username, email, password: hashedPassword },
      { new: true }
    );

    if (!updatedUser) {
      throw createError("No user with this id was found", 400);
    }

    return updatedUser;
  }

  async deleteAUser(userId: string): Promise<IUser | CustomErrorType> {
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      throw createError("No user was found with this id", 400);
    }

    return user;
  }

  async loginUser(user: IUser) {
    const { username, password } = user;

    const loggedInUser = await User.findOne({ username });

    if (!loggedInUser) {
      throw createError("Username or password was wrong", 401);
    }

    const match = await compare(
      password as string,
      loggedInUser.password as string
    );

    if (!match) {
      throw createError("Username or password was wrong", 401);
    }

    const token = jwt.sign(
      {
        data: {
          userId: loggedInUser._id,
          username: loggedInUser.username,
          email: loggedInUser.email,
        },
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    return token;
  }
}

export default new UserServices();
