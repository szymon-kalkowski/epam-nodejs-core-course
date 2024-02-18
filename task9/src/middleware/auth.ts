import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { responseObject } from "../utils/index.js";

export interface CurrentUser {
  userId: string;
  email: string;
  role: string;
}

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).send(responseObject(null, "User is not authorized"));
  }

  const [tokenType, token] = authHeader.split(" ");

  if (tokenType !== "Bearer") {
    return res
      .status(403)
      .send(responseObject(null, "You must be authorized user"));
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET!) as CurrentUser;
    req.user = user;
  } catch (err) {
    return res.status(401).send(responseObject(null, "Invalid token"));
  }
  return next();
};

export function isAdmin(req: Request, res: Response, next: NextFunction) {
  const currentUser = req.user;

  if (currentUser.role !== "admin") {
    return res.status(403).send(responseObject(null, "Forbidden"));
  }
  next();
}
