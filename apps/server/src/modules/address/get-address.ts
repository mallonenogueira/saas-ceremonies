import { Request, Response } from "express";
import { z } from "zod";

import { prisma } from "../../config/prisma";
import { getSessionUser } from "../../utils/get-session-user";
import { getPagination } from "../../utils/pagination";

const FilterSchema = z.object({
  id: z.coerce.number().positive().optional(),
});

const OrderBySchema = z.object({
  orderBy: z.enum(["name", "address", "city", "state"]).optional(),
  orderDi: z.enum(["asc", "desc"]).optional(),
});

export async function getAddress(req: Request, res: Response) {
  const { accountId } = getSessionUser(res);
  const filters = FilterSchema.safeParse(req.query);
  const orderBy = OrderBySchema.safeParse(req.query);
  const pagination = getPagination(res);

  if (filters.error || orderBy.error) {
    return res
      .status(400)
      .json({ errors: filters.error?.errors || orderBy.error?.errors });
  }

  const where = { accountId, ...filters.data };

  const [total, data] = await prisma.$transaction([
    prisma.address.count({ where }),
    prisma.address.findMany({
      ...pagination.prisma,
      where,
      orderBy: {
        [orderBy.data.orderBy || "name"]: orderBy.data.orderDi || "asc",
      },
    }),
  ]);

  res.send({ pagination: { ...pagination, total }, data });
}
