import { z } from "zod";

export const CreateCeremonySchema = z.object({
  start: z.string().datetime("Data inicial inválida").optional(),
  end: z.string().datetime("Data final inválida").optional(),
  published: z.boolean().optional(),
  description: z.string().optional(),
  peopleName: z.string({ required_error: "Nome obrigatório" }),
  // peopleImage: z.string().optional(),
  peopleHistory: z.string().optional(),
  peopleBirthDate: z.string().datetime().optional(),
  peopleDeathDate: z.string().datetime().optional(),
});

export const EditCeremonySchema = CreateCeremonySchema;
