import express from "express";
import { router } from "./route";
import helmet from "helmet";
import cors from "cors";
import { loggerMiddleware } from "./middlewares/logger-middleware";
import { MessageError } from "./errors/validation-error";

const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(helmet());
app.use(express.json());
app.use(loggerMiddleware);
app.use(router);

app.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(404).send(new MessageError("Não encontrado"));
  }
);

app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.log(err);

    if (
      err instanceof SyntaxError &&
      "status" in err &&
      "type" in err &&
      err.type === "entity.parse.failed"
    ) {
      return res.status(err.status as number).send({
        errors: [
          {
            message: "Payload inválido",
            type: err.type,
          },
        ],
      });
    }

    res.status(500).send({ errors: [err] });
  }
);

export { app };
