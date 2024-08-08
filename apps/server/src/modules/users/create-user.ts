import { Request, Response } from "express";
import { UserSchema } from "./schemas";
import { getSessionUser } from "../../utils/get-session-user";
import { MessageError } from "../../errors/validation-error";
import { createUserUseCase } from "./services/create-user-use-case";

export async function createUser(req: Request, res: Response) {
  const { accountId } = getSessionUser(res);
  const { data, error } = UserSchema.safeParse(req.body);

  if (error) {
    return res.status(400).json({ errors: error.errors });
  }

  try {
    const result = await createUserUseCase({
      ...data,
      accountId,
    });

    res.json({ data: result });
  } catch (error) {
    console.log(error);

    if (error instanceof MessageError) {
      return res.status(400).json(error);
    }

    res.status(400).json(new MessageError("Erro ao cadastrar novo usuário"));
  }
}
