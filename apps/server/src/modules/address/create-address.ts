import { Prisma } from "@prisma/client";
import { Request, Response } from "express";

import { prisma } from "../../config/prisma";
import { AddressSchema } from "./schemas";
import { getSessionUser } from "../../utils/get-session-user";

export async function createAddress(req: Request, res: Response) {
  const { accountId } = getSessionUser(res);
  const { data, error } = AddressSchema.safeParse(req.body);

  if (error) {
    return res.status(400).json({ errors: error.errors });
  }

  try {
    const result = await prisma.address.create({
      data: {
        ...data,
        accountId,
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
          message: "Erro ao cadastrar novo endereço",
        },
      ],
    });
  }
}
