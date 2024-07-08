import { Request, Response } from "express";
import { AuthSchema } from "./schemas";
import { prisma } from "../../config/prisma";
import { comparePassword } from "../../utils/password";
import { createToken } from "../../utils/create-token";

import bunyan from "bunyan";

export async function login(req: Request, res: Response) {
  const { data, error } = AuthSchema.safeParse(req.body);

  if (error) {
    console.log(error);

    return res.status(400).json({ errors: error.errors });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
    select: {
      id: true,
      email: true,
      password: true,
      name: true,
      accountId: true,
      role: true,
      img: true,
    },
  });

  if (!user || !comparePassword(data.password, user.password)) {
    return res.status(401).send({
      errors: [
        {
          message: "Email ou senha inválido",
        },
      ],
    });
  }

  try {
    const session = await prisma.session.create({
      data: {
        accountId: user.accountId,
        userId: user.id,
      },
    });

    (res.locals.logger as bunyan).info('logado com sucesso');

    res.json(
      createToken({
        ...user,
        sessionId: session.id,
      })
    );
  } catch (err) {
    console.log(err);

    res.status(500).send({
      errors: [
        {
          message: "Erro ao realizar login",
        },
      ],
    });
  }
}
