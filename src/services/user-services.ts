import dotenv from "dotenv";
dotenv.config();

import User from "../models/user";
import { IUser } from "../models/user";
import createError, { CustomErrorType } from "../utils/custom-error";
import jwt from "jsonwebtoken";

export const getAllUsers = async (): Promise<IUser[]> => {
  const users = await User.find({});

  return users;
};

export const createAUser = async (user: IUser): Promise<IUser> => {
  const { username, email } = user;

  const newUser = new User({ username, email });
  await newUser.save();

  return newUser;
};

export const getAUser = async (
  userId: string
): Promise<IUser | CustomErrorType> => {
  const user = await User.findById(userId);

  if (!user) {
    throw createError("No user with this id was found", 400);
  }

  return user;
};

export const editAUser = async (
  userId: string,
  user: IUser
): Promise<IUser | null | CustomErrorType> => {
  const { username, email } = user;

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { username, email },
    { new: true }
  );

  if (!updatedUser) {
    throw createError("No user with this id was found", 400);
  }

  return updatedUser;
};

export const deleteAUser = async (
  userId: string
): Promise<IUser | CustomErrorType> => {
  const user = await User.findByIdAndDelete(userId);

  if (!user) {
    throw createError("No user was found with this id", 400);
  }

  return user;
};

export const loginUser = async (user: IUser) => {
  const { username, email } = user;

  const loggedInUser = await User.findOne({ username, email });

  if (!loggedInUser) {
    throw createError("Username or email was wrong", 401);
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
};
