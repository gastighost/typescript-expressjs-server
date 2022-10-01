import { Request, Response } from "express";

const notFound = (req: Request, res: Response) => {
  res.status(404).json({ error: "Route not found" });
};

export default notFound;
