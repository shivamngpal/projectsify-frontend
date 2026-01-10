import { Navigate, Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import useAuth from "../../hooks/useAuth";

export default function ProtectedRoute() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return (
    <>
      <Navbar />
      <main className="page">
        <Outlet />
      </main>
    </>
  );
}
