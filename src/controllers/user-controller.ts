/* eslint-disable @typescript-eslint/no-unused-vars */
import dotenv from "dotenv";
dotenv.config();

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import asyncWrapper from "../utils/async-wrapper";
import createError from "../utils/custom-error";

import User from "../models/user";
import {
  createAUser,
  deleteAUser,
  editAUser,
  getAllUsers,
  getAUser,
  loginUser,
} from "../services/user-services";

export const getUsers = asyncWrapper(
  async (_req: Request, res: Response, _next: NextFunction) => {
    const users = await getAllUsers();

    res.status(200).json({ message: "Users successfully retrieved!", users });
  }
);

export const createUser = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, email } = req.body;

    if (!username || !email) {
      return next(
        createError("Please fill in both username and password", 400)
      );
    }

    const newUser = await createAUser({ username, email });

    res
      .status(201)
      .json({ message: "User successfully created!", user: newUser });
  }
);

export const getUser = asyncWrapper(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { userId } = req.params;

    const user = await getAUser(userId);

    res.status(200).json({ message: "User successfully retrieved!", user });
  }
);

export const editUser = asyncWrapper(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { userId } = req.params;
    const { username, email } = req.body;

    const user = await editAUser(userId, { username, email });

    res.status(200).json({ message: "User successfully updated!", user });
  }
);

export const deleteUser = asyncWrapper(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { userId } = req.params;

    const user = await deleteAUser(userId);

    res.status(200).json({ message: "User successfully deleted!", user });
  }
);

export const login = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, email } = req.body;

    const token = await loginUser({ username, email });

    res.status(200).json({ message: "User successfully logged in!", token });
  }
);
