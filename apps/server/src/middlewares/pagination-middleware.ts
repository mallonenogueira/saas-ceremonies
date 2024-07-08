import { NextFunction, Request, Response } from "express";
import { Pagination } from "../utils/pagination";

export function paginationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const pagination = Pagination.safeParse(req.query);

  if (!pagination.success) {
    return res.status(400).json({ errors: pagination.error.errors });
  }

  res.locals.pagination = pagination.data;

  next();
}
