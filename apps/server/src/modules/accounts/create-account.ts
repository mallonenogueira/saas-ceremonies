import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { CreateAccountSchema } from "./schemas";
import { prisma } from "../../config/prisma";
import { hashPassword } from "../../utils/password";

export async function createAccount(req: Request, res: Response) {
  const { data, error } = CreateAccountSchema.safeParse(req.body);

  if (error) {
    return res.status(400).json({ errors: error.errors });
  }

  try {
    const { user, ...accountData } = data;

    const result = await prisma.account.create({
      data: {
        ...accountData,
        users: {
          create: [
            {
              ...user,
              password: hashPassword(user.password),
            },
          ],
        },
      },
      include: {
        users: true,
      },
    });

    res.json({ data: result });
  } catch (error) {
    console.log(error);

    res.status(400).json({
      errors: [
        {
          message: "Erro ao cadastrar nova conta",
        },
      ],
    });
  }
}
