import { z } from "zod";

export const CreateCeremonySchema = z.object({
  start: z.string().datetime().optional(),
  end: z.string().datetime().optional(),
  published: z.boolean().optional(),
  peopleName: z.string({ required_error: "Nome obrigatório" }),
  peopleImage: z.string().optional(),
  peopleHistory: z.string().optional(),
  peopleBirthDate: z.string().datetime().optional(),
  peopleDeathDate: z.string().datetime().optional(),
});
