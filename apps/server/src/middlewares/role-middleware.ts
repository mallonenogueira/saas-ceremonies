import { NextFunction, Request, Response } from "express";
import { MessageError } from "../errors/validation-error";

export function roleMiddleware(roles: number[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { role: userRole } = res.locals.user;

    if (!roles.includes(userRole)) {
      res.status(403).json(new MessageError("Não autorizado"));

      return;
    }

    next();
  };
}

roleMiddleware.ADMIN = 1;
roleMiddleware.USER = 2;
