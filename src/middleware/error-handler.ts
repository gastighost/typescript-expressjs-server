/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res
    .status(err.statusCode || 500)
    .json({ error: err.message || "There was a server error" });
};

export default errorHandler;
