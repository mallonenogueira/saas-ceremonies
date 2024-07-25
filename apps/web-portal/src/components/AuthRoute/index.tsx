import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/auth";

export function Auth() {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
