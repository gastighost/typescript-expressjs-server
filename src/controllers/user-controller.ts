/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from "express";
import { RequestAuthType } from "../middleware/auth";

import asyncWrapper from "../utils/async-wrapper";
import createError from "../utils/custom-error";

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
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return next(
        createError("Please fill in your username, email and password", 400)
      );
    }

    const newUser = await createAUser({ username, email, password });

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
    const { username, email, password } = req.body;

    const user = await editAUser(userId, { username, email, password });

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
    const { username, password } = req.body;

    const token = await loginUser({ username, password });

    res.status(200).json({ message: "User successfully logged in!", token });
  }
);

export const checkAuth = asyncWrapper(
  async (req: RequestAuthType, res: Response, next: NextFunction) => {
    const { user } = req;

    res.status(200).json({ message: "You are currently logged in!", user });
  }
);
