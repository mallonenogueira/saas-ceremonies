import { Request, Response } from "express";
import { z } from "zod";

import { prisma } from "../../config/prisma";
import { getSessionUser } from "../../utils/get-session-user";
import { getPagination } from "../../utils/pagination";

const FilterSchema = z.object({ id: z.string().uuid().optional() });

export async function getUsers(req: Request, res: Response) {
  const { accountId } = getSessionUser(res);
  const filters = FilterSchema.safeParse(req.query);
  const pagination = getPagination(res);

  if (filters.error) {
    return res.status(400).json({ errors: filters.error.errors });
  }

  const [total, data] = await prisma.$transaction([
    prisma.user.count({ where: { accountId, ...filters.data } }),
    prisma.user.findMany({
      skip: pagination.page * pagination.size,
      take: pagination.size,
      where: { accountId, ...filters.data },
    }),
  ]);

  res.send({ pagination: { ...pagination, total }, data });
}
