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
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 backdrop-blur shadow-[0_20px_60px_rgba(0,0,0,0.45)] p-8 space-y-6">
        <div className="space-y-2 text-center">
          <p className="text-sm font-semibold text-slate-300 uppercase tracking-[0.2em]">
            Projectsify
          </p>
          <h1 className="text-2xl font-bold text-white">Welcome back</h1>
          <p className="text-slate-400 text-sm">
            Log in to continue building your project roadmap.
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
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

          <Button
            type="submit"
            disabled={authLoading}
            className="w-full py-3 text-base"
          >
            {authLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <p className="text-slate-400 text-sm text-center">
          New here?{" "}
          <Link className="text-slate-200 hover:text-white" to="/signup">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
