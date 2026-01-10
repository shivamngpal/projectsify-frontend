import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProject } from "../api/project.api";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

export default function CreateProject() {
  const [projectDescription, setProjectDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const data = await createProject(projectDescription);
      if (data?.projectId) {
        navigate(`/projects/${data.projectId}`);
      }
    } catch (err) {
      setError(err.message || "Failed to create project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="stack-lg">
      <div className="card stack-md">
        <h1>Create a project roadmap</h1>
        <p className="muted">
          Describe what you want to build. We will generate structured tasks.
        </p>

        <form className="stack-md" onSubmit={handleSubmit}>
          <Input
            label="Project description"
            name="projectDescription"
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            placeholder="Example: Build a budget tracking web app"
            required
          />
          {error && <div className="text-error">{error}</div>}
          <Button type="submit" disabled={loading}>
            {loading ? "Generating tasks..." : "Generate tasks"}
          </Button>
        </form>
      </div>
    </div>
  );
}
