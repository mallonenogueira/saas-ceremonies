import { z } from "zod";

export const AuthSchema = z.object({
  email: z
    .string({
      required_error: "Email obrigatório",
    })
    .email("Não é um email válido"),
  password: z.string({
    required_error: "Senha obrigatória",
  }),
});


