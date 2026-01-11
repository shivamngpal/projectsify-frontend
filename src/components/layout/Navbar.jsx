import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between bg-[rgba(16,21,33,0.85)] border-b border-white/10 backdrop-blur px-6 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
      <div
        className="text-lg font-semibold text-white cursor-pointer"
        onClick={() => navigate("/projects/new")}
      >
        Projectsify
      </div>
      <nav className="flex items-center gap-3">
        {isAuthenticated && (
          <>
            <Link
              to="/projects/new"
              className="text-slate-200 hover:text-white"
            >
              New Project
            </Link>
            <button
              className="border border-white/20 bg-white/10 text-white rounded-md px-3 py-2 text-sm font-semibold hover:border-white/40 transition"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        )}
      </nav>
    </header>
  );
}
