import { createContext, useContext, useState } from "react";
import { User } from "../models/user";
import { useLocation, useNavigate } from "react-router-dom";
import { getAuthToken } from "../services/auth";

interface AuthContextType {
  user?: User;
  token?: string;
  signin: (email: string, password: string) => Promise<void>;
  signout: () => Promise<void>;
}
const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState<{
    user: User;
    token: string;
  } | null>(() => {
    const storedData = localStorage.getItem("authData");
    return storedData ? JSON.parse(storedData) : null;
  });

  const from = location.state?.from?.pathname || "/";

  const signin = async (email: string, password: string) => {
    const response = await getAuthToken(email, password);

    const authData = {
      user: response.payload,
      token: response.token,
    };

    setData(authData);
    localStorage.setItem("authData", JSON.stringify(authData));

    navigate(from, { replace: true });
  };

  const signout = async () => {
    setData(null);
    localStorage.removeItem("authData");
  };

  return (
    <AuthContext.Provider value={{ ...data, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
