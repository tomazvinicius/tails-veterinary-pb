import jwt from "jsonwebtoken";
import { RequestHandler } from "express";

export const createJWT = async (payload: any) => {
  const token = jwt.sign(payload, "water", {
    expiresIn: "2d",
  });
  return token;
};

export const isTokenValid = async (token: any, res: any) => {
  try {
    jwt.verify(token, "water");
  } catch (error) {
    return res.status(401).json("Not authenticated");
  }
};

export const auth: RequestHandler = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new Error("Authentication invalid");
    }
    const token = authHeader.split(" ")[1];
    isTokenValid(token, res);
  } catch (error) {
    throw new Error("Authentication invalid");
  }
};
