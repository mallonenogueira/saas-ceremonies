import bcrypt from "bcrypt";

const salt = bcrypt.genSaltSync(10);

export function hashPassword(password: string) {
  return bcrypt.hashSync(password, salt);
}

export function comparePassword(password: string, hashPassword: string) {
  return bcrypt.compareSync(password, hashPassword);
}
