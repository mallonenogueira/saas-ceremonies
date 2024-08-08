import { Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/auth";
import { Auth } from "./components/AuthRoute";
import { Layout } from "./components/Layout";

import LoginPage from "./pages/Login/Login copy";
import Home from "./pages/Home/Home";
import AddressPage from "./pages/Address";
import UsersPage from "./pages/Users";
import CeremoniesPage from "./pages/Ceremonies";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<Auth />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/address" element={<AddressPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/ceremonies" element={<CeremoniesPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
