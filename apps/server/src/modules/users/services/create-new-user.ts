import { prisma } from "../../../config/prisma";
import { hashPassword } from "../../../utils/password";

export async function createNewUser(data: {
  name: string;
  email: string;
  password: string;
  accountId: string;
}) {
  return prisma.user.create({
    data: {
      ...data,
      password: hashPassword(data.password),
      role: 2,
    },
  });
}
