import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { SessionUser } from "../utils/create-token";

const secret = process.env.JWT_SECRET_KEY || "dev_secret";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const token = req.headers.authorization;

  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }

    res.locals.user = decoded as SessionUser;
    
    res.locals.logger.fields.userId = res.locals.user.id;
    res.locals.logger.fields.accountId = res.locals.user.accountId;

    next();
  });
}
