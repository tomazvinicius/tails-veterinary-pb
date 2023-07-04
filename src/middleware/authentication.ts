import { Request, Response, NextFunction } from "express";
import { isTokenValid } from "../utils/jwt";
import { UnauthenticatedError } from "../errors";

export const authenticateTutor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;

  if (!token) {
    throw new UnauthenticatedError("Authentication Invalid");
  }
  try {
    isTokenValid(token.toString(), res);
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication Invalid");
  }
};
