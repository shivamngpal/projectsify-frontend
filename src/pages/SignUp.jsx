import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

export default function Signup() {
  const navigate = useNavigate();
  const { signup, login, authLoading, authError } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(null);
    try {
      await signup(name, email, password);
      await login(email, password);
      navigate("/projects/new", { replace: true });
    } catch (err) {
      setLocalError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 backdrop-blur shadow-[0_20px_60px_rgba(0,0,0,0.45)] p-8 space-y-6">
        <div className="space-y-2 text-center">
          <p className="text-sm font-semibold text-slate-300 uppercase tracking-[0.2em]">
            Projectsify
          </p>
          <h1 className="text-2xl font-bold text-white">Create an account</h1>
          <p className="text-slate-400 text-sm">
            Start generating a project roadmap in minutes.
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            label="Name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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

          {(authError || localError) && (
            <div className="text-error">{authError || localError}</div>
          )}

          <Button
            type="submit"
            disabled={authLoading}
            className="w-full py-3 text-base"
          >
            {authLoading ? "Creating account..." : "Sign Up"}
          </Button>
        </form>

        <p className="text-slate-400 text-sm text-center">
          Already have an account?{" "}
          <Link className="text-slate-200 hover:text-white" to="/login">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
