import { Request, Response } from "express";
import { z } from "zod";

import { prisma } from "../../config/prisma";
import { EditAddressSchema } from "./schemas";
import { getSessionUser } from "../../utils/get-session-user";

const IdSchema = z.object({ id: z.coerce.number().positive() });

export async function editAddress(req: Request, res: Response) {
  const { accountId } = getSessionUser(res);
  const idParam = IdSchema.safeParse(req.params);
  const { data, error } = EditAddressSchema.safeParse(req.body);

  if (error || idParam.error) {
    return res
      .status(400)
      .json({ errors: error?.errors || idParam.error?.errors });
  }

  try {
    const checkAccountId = await prisma.address.findUnique({
      where: {
        id: idParam.data.id,
        accountId,
      },
    });

    if (!checkAccountId) {
      return res
        .status(404)
        .json({ errors: [{ message: "Endereço não encontrado" }] });
    }


    const result = await prisma.address.update({
      where: { id: idParam.data.id, accountId },
      data: {
        ...data,
        accountId,
      },
    });

    res.json({ data: result });
  } catch (error) {
    console.log(error);

    res.status(400).json({ errors: [{ message: "Erro ao editar endereço" }] });
  }
}
