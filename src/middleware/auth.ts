import dotenv from "dotenv";
dotenv.config();

import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import jwt, { JwtPayload } from "jsonwebtoken";
import createError from "../utils/custom-error";

interface UserPayloadType {
  userId: Types.ObjectId | string;
  username: string;
  email: string;
}

interface DecodedAuthType extends JwtPayload {
  data: UserPayloadType;
}

export interface RequestAuthType extends Request {
  user?: UserPayloadType;
}

const auth = async (
  req: RequestAuthType,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return next(createError("Token must be provided", 401));
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return next(createError("Token must be provided", 401));
  }

  try {
    const decoded: DecodedAuthType = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as DecodedAuthType;

    req.user = decoded.data;
    next();
  } catch (error) {
    next(createError("Session is expired or invalid", 401));
  }
};

export default auth;
