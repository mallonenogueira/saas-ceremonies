import { Request, Response } from "express";
import { z } from "zod";

import { prisma } from "../../config/prisma";
import { getSessionUser } from "../../utils/get-session-user";
import { getPagination } from "../../utils/pagination";

const FilterSchema = z.object({ id: z.number().positive().optional() });

export async function getAddress(req: Request, res: Response) {
  const { accountId } = getSessionUser(res);
  const filters = FilterSchema.safeParse(req.query);
  const pagination = getPagination(res);

  if (filters.error) {
    return res.status(400).json({ errors: filters.error.errors });
  }

  const where = { accountId, ...filters.data };

  const [total, data] = await prisma.$transaction([
    prisma.address.count({ where }),
    prisma.address.findMany({
      ...pagination.prisma,
      where,
    }),
  ]);

  res.send({ pagination: { ...pagination, total }, data });
}
