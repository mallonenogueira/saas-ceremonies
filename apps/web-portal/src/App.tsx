import { createContext, useContext, useState } from "react";
import {
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import LoginPage from "./pages/Login";
import Home from "./pages/Home";
import { api } from "./service/api";

interface User {
  sessionId: string;
  id: string;
  name: string;
  email: string;
  role: string;
  accountId: string;
}

interface LoginData {
  payload: User;
  token: string;
}

interface AuthContextType {
  user?: User;
  token?: string;
  signin: (email: string, password: string) => Promise<void>;
  signout: () => Promise<void>;
}
const AuthContext = createContext<AuthContextType>(null!);

function AuthProvider({ children }: { children: React.ReactNode }) {
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
    const response = await api.post<LoginData>("/login", {
      email,
      password,
    });

    const authData = {
      user: response.data.payload,
      token: response.data.token,
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

function Auth() {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<Auth />}>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
