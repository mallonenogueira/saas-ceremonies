import { Prisma } from "@prisma/client";
import { Request, Response } from "express";

import { prisma } from "../../config/prisma";
import { UserSchema } from "./schemas";
import { hashPassword } from "../../utils/password";
import { getSessionUser } from "../../utils/get-session-user";

export async function createUser(req: Request, res: Response) {
  const { accountId } = getSessionUser(res);
  const { data, error } = UserSchema.safeParse(req.body);

  if (error) {
    return res.status(400).json({ errors: error.errors });
  }

  try {
    const checkEmail = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (checkEmail) {
      return res.status(400).json({
        errors: [
          {
            message: "Email já está em uso",
          },
        ],
      });
    }

    const result = await prisma.user.create({
      data: {
        ...data,
        accountId,
        password: hashPassword(data.password),
        role: 2,
      },
    });

    res.json({ data: result });
  } catch (error) {
    console.log(error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        console.log("There is a unique constraint violation");
      }
    }

    res.status(400).json({
      errors: [
        {
          message: "Erro ao cadastrar novo usuário",
        },
      ],
    });
  }
}
