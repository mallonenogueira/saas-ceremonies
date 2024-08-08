import { prisma } from "../../../config/prisma";

export async function getUsersService(
  accountId: string,
  filters: { id?: string | undefined },
  pagination: { skip: number; take: number }
) {
  const [total, data] = await prisma.$transaction([
    prisma.user.count({ where: { accountId, ...filters } }),
    prisma.user.findMany({
      ...pagination,
      where: { accountId, ...filters },
    }),
  ]);

  return {
    total,
    data,
  };
}
