import { Response } from "express";
import { z } from "zod";

export const Pagination = z.object({
  page: z
    .number({ coerce: true })
    .nonnegative("Página inválida")
    .optional()
    .default(0),
  size: z
    .number({ coerce: true })
    .nonnegative("Tamanho inválido")
    .max(100, "Tamanho máximo da página")
    .optional()
    .default(10),
});

export function getPagination(res: Response) {
  const pagination = res.locals.pagination as z.infer<typeof Pagination>;
  
  return {
    ...pagination,
    prisma: {
      skip: pagination.page * pagination.size,
      take: pagination.size,
    },
  };
}
