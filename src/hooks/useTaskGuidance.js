import { useState } from "react";
import { getTaskGuidance } from "../api/task.api";

export default function useTaskGuidance(projectId, taskId) {
  const [guidance, setGuidance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchGuidance = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getTaskGuidance(projectId, taskId);
      setGuidance(data.guidance);
    } catch (err) {
      setError("Failed to load guidance");
    } finally {
      setLoading(false);
    }
  };

  return { guidance, loading, error, fetchGuidance };
}
