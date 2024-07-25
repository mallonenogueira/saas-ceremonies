import { User } from "../models/user";
import { api } from "./api";

interface LoginData {
  payload: User;
  token: string;
}

export async function getAuthToken(email: string, password: string) {
  const { data } = await api.post<LoginData>("/login", {
    email,
    password,
  });

  return data;
}
