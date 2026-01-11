import { useEffect, useState } from "react";
import { getProjectById } from "../api/project.api";
import { updateTaskCompletion } from "../api/task.api";

// react hook manages project data and task completion state.
export default function useProject(projectId) {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProject() {
      try {
        setLoading(true);
        const data = await getProjectById(projectId);
        setProject(data.project);
      } catch (err) {
        setError(err.message || "Failed to load project");
      } finally {
        setLoading(false);
      }
    }

    fetchProject();
  }, [projectId]);

  const toggleTaskCompletion = async (taskId, completed) => {
    // optimistic update
    setProject((prev) => ({
      ...prev,
      tasks: prev.tasks.map((t) =>
        t._id === taskId ? { ...t, completed } : t
      ),
    }));

    try {
      await updateTaskCompletion(projectId, taskId, completed);
    } catch (err) {
      // rollback- if api call fails, revert the task status
      setProject((prev) => ({
        ...prev,
        tasks: prev.tasks.map((t) =>
          t._id === taskId ? { ...t, completed: !completed } : t
        ),
      }));
    }
  };

  return { project, loading, error, toggleTaskCompletion };
}
