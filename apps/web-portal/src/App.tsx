import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Login/Login copy";
import Home from "./pages/Home/Home";
import { AuthProvider } from "./contexts/auth";
import { Auth } from "./components/AuthRoute";
import { Layout } from "./components/Layout";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<Auth />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
