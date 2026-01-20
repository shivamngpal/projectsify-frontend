import { Navigate, Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
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
      <div className="flex">
        <Sidebar />
        <main className="page flex-1 w-0">
          <Outlet />
        </main>
      </div>
    </>
  );
}
