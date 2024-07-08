import { z } from "zod";

export const UserSchema = z.object({
  name: z.string({ required_error: "Nome do usuário obrigatório" }),
  password: z.string({ required_error: "Senha obrigatória" }),
  email: z
    .string({ required_error: "Email do usuário obrigatório" })
    .email("Email do usuário inválido"),
});

export const EditUserSchema = z.object({
  email: UserSchema.shape.email,
  name: UserSchema.shape.name,
  password: z.string().optional(),
});
