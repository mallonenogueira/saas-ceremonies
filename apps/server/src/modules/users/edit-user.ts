import { Request, Response } from "express";
import { z } from "zod";

import { prisma } from "../../config/prisma";
import { EditUserSchema } from "./schemas";
import { hashPassword } from "../../utils/password";
import { getSessionUser } from "../../utils/get-session-user";

const IdSchema = z.object({ id: z.string().uuid() });

export async function editUser(req: Request, res: Response) {
  const { accountId } = getSessionUser(res);
  const idParam = IdSchema.safeParse(req.params);
  const { data, error } = EditUserSchema.safeParse(req.body);

  if (error || idParam.error) {
    return res
      .status(400)
      .json({ errors: error?.errors || idParam.error?.errors });
  }

  try {
    const checkAccountId = await prisma.user.findUnique({
      where: {
        id: idParam.data.id,
        accountId,
      },
    });

    if (!checkAccountId) {
      return res
        .status(404)
        .json({ errors: [{ message: "Usuário não encontrado" }] });
    }

    const checkEmailExists = await prisma.user.findUnique({
      where: {
        email: data.email,
        NOT: { id: idParam.data.id },
      },
    });

    if (checkEmailExists) {
      return res
        .status(400)
        .json({ errors: [{ message: "Email já está em uso" }] });
    }

    const result = await prisma.user.update({
      where: { id: idParam.data.id, accountId },
      data: {
        ...data,
        accountId,
        password: data.password && hashPassword(data.password),
      },
    });

    res.json({ data: result });
  } catch (error) {
    console.log(error);

    res.status(400).json({ errors: [{ message: "Erro ao editar usuário" }] });
  }
}
