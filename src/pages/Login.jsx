import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, authLoading, authError, isAuthenticated } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const redirectTo = location.state?.from || "/projects/new";

  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirectTo, { replace: true });
    }
  }, [isAuthenticated, redirectTo, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      // error is handled via authError
    }
  };

  return (
    <div className="auth-page">
      <div className="card stack-md auth-card">
        <h1>Welcome back</h1>
        <p className="muted">
          Log in to continue building your project roadmap.
        </p>

        <form className="stack-md" onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            label="Password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {authError && <div className="text-error">{authError}</div>}

          <Button type="submit" disabled={authLoading}>
            {authLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <p className="muted">
          New here? <Link to="/signup">Create an account</Link>
        </p>
      </div>
    </div>
  );
}
