import { Response } from "express";
import { SessionUser } from "./create-token";

export function getSessionUser(res: Response) {
  return res.locals.user as SessionUser;
}
