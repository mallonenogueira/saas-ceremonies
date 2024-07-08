import { NextFunction, Request, Response } from "express";

export function roleMiddleware(roles: number[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { role: userRole } = res.locals.user;

    if (!roles.includes(userRole)) {
      res.status(403).json({ message: "Unauthorized" });

      return;
    }

    next();
  };
}

roleMiddleware.ADMIN = 1;
roleMiddleware.USER = 2;
