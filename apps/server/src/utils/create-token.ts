import jwt from "jsonwebtoken";
import { z } from "zod";
import { JWT_SECRET } from "../config/env";


export const TokenPayloadSchema = z.object({
    sessionId: z.string(),
    id: z.string(),
    name: z.string(),
    email: z.string(),
    role: z.number(),
    accountId: z.string(),
    img: z.string().nullish(),
  });
  
  export type SessionUser = z.infer<typeof TokenPayloadSchema>
  

export function createToken(payload: SessionUser) {
  const data = TokenPayloadSchema.parse(payload);

  return {
    payload: data,
    token: jwt.sign(data, JWT_SECRET),
  };
}
