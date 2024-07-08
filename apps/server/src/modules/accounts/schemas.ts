import { z } from "zod";
import { UserSchema } from "../users/schemas";

export const AccountSchema = z.object({
  id: z.number(),
  name: z.string({ required_error: "Nome obrigatório" }),
  email: z
    .string({ required_error: "Email obrigatório" })
    .email("Não é um email válido"),
  logo: z.string().url("Url inválida").optional(),
});

const { id, ...rest } = AccountSchema.shape;

export const CreateAccountSchema = z.object({
  ...rest,
  user: UserSchema,
});
