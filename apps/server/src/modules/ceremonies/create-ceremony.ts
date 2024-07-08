import { Request, Response } from "express";

import { prisma } from "../../config/prisma";
import { CreateCeremonySchema } from "./schemas";
import { getSessionUser } from "../../utils/get-session-user";

export async function createCeremony(req: Request, res: Response) {
  const { accountId } = getSessionUser(res);
  const { data, error } = CreateCeremonySchema.safeParse(req.body);

  if (error) {
    return res.status(400).json({ errors: error.errors });
  }

  try {
    const result = await prisma.ceremony.create({
      data: {
        ...data,
        accountId,
      },
    });

    res.json({ data: result });
  } catch (error) {
    console.log(error);

    res.status(400).json({
      errors: [
        {
          message: "Erro ao cadastrar nova cerimônia",
        },
      ],
    });
  }
}
