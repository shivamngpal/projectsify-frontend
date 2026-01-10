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
    <header className="navbar">
      <div className="navbar__brand" onClick={() => navigate("/projects/new")}>
        Projectsify
      </div>
      <nav className="navbar__links">
        {isAuthenticated && (
          <>
            <Link to="/projects/new" className="nav-link">
              New Project
            </Link>
            <button className="btn btn-secondary" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </nav>
    </header>
  );
}
