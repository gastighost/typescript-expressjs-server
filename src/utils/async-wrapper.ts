import { Response, NextFunction } from "express";
import { RequestAuthType } from "../middleware/auth";

type AsyncRequestHandler = (
  req: RequestAuthType,
  res: Response,
  next: NextFunction
) => Promise<unknown>;

const asyncWrapper = (fn: AsyncRequestHandler) => {
  return async (req: RequestAuthType, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error: unknown) {
      next(error);
    }
  };
};

export default asyncWrapper;
