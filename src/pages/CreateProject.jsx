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
    <div className="min-h-screen px-4 py-8 flex justify-center">
      <div className="w-full max-w-3xl space-y-6">
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur shadow-[0_20px_60px_rgba(0,0,0,0.45)] p-8 space-y-4">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">
              Projectsify
            </p>
            <h1 className="text-2xl font-bold text-white">
              Create a project roadmap
            </h1>
            <p className="text-slate-400 text-sm">
              Describe what you want to build. We will generate structured
              tasks.
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input
              label="Project description"
              name="projectDescription"
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              placeholder="Example: Build a budget tracking web app"
              required
            />
            {error && <div className="text-error">{error}</div>}
            <Button
              type="submit"
              disabled={loading}
              className="w-full py-3 text-base"
            >
              {loading ? "Generating tasks..." : "Generate tasks"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
