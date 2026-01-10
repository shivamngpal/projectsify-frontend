import { getToken } from "../utils/token";

const BASE_URL = import.meta.env.VITE_API_URL;

export async function updateTaskCompletion(projectId, taskId, completed) {
  const res = await fetch(
    `${BASE_URL}/api/projects/${projectId}/tasks/${taskId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ completed }),
    }
  );

  if (!res.ok) throw new Error("Failed to update task");
}

export async function getTaskGuidance(projectId, taskId) {
  const res = await fetch(
    `${BASE_URL}/api/projects/${projectId}/tasks/${taskId}/guidance`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  if (!res.ok) throw new Error("Failed to get guidance");
  return res.json();
}
