import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="page centered stack-md">
      <h1>Page not found</h1>
      <p className="muted">We could not find what you were looking for.</p>
      <Link className="btn btn-primary" to="/projects/new">
        Go to dashboard
      </Link>
    </div>
  );
}
