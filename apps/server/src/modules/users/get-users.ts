import { Request, Response } from "express";
import { z } from "zod";

import { getSessionUser } from "../../utils/get-session-user";
import { getPagination } from "../../utils/pagination";
import { getUsersService } from "./services/get-users";

const FilterSchema = z.object({ id: z.string().uuid().optional() });

export async function getUsers(req: Request, res: Response) {
  const { accountId } = getSessionUser(res);
  const filters = FilterSchema.safeParse(req.query);
  const pagination = getPagination(res);

  if (filters.error) {
    return res.status(400).json({ errors: filters.error.errors });
  }

  const { total, data } = await getUsersService(
    accountId,
    filters.data,
    pagination.prisma
  );

  res.send({ pagination: { ...pagination, total }, data });
}
