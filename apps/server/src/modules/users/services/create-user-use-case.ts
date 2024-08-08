import { MessageError } from "../../../errors/validation-error";
import { createNewUser } from "./create-new-user";
import { findUserByEmail } from "./find-user-by-email";


export async function createUserUseCase(data: {
  name: string;
  email: string;
  password: string;
  accountId: string;
}) {
  const checkEmail = await findUserByEmail(data.email);

  if (checkEmail) {
    throw new MessageError("Email já está em uso");
  }

  const result = await createNewUser({
    ...data,
  });

  return result;
}
