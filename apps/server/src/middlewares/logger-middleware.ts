import { Request, Response, NextFunction } from "express";
import logAudit from "express-requests-logger";
import bunyan from "bunyan";
import { randomUUID } from "node:crypto";

export const logger = bunyan.createLogger({
  name: "Middleware logger",
});

export function loggerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const loggerChild = logger.child({
    requestId: randomUUID(),
  });

  res.locals.logger = loggerChild;

  if (true) return next();

  (
    logAudit({
      logger: loggerChild,
      request: {
        maskBody: ["password"],
        excludeHeaders: ["*"],
      },
      response: {
        excludeHeaders: ["*"],
        maskBody: ["token"],
      },
    }) as any
  )(req, res, next);
}
