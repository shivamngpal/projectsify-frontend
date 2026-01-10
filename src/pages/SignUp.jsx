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
    <div className="auth-page">
      <div className="card stack-md auth-card">
        <h1>Create your account</h1>
        <p className="muted">Start generating a project roadmap in minutes.</p>

        <form className="stack-md" onSubmit={handleSubmit}>
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

          <Button type="submit" disabled={authLoading}>
            {authLoading ? "Creating account..." : "Sign Up"}
          </Button>
        </form>

        <p className="muted">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
}
