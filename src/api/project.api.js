import { getToken } from "../utils/token";

const BASE_URL = import.meta.env.VITE_API_URL;

export async function getProjectById(projectId) {
  const res = await fetch(`${BASE_URL}/api/projects/${projectId}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch project");
  return res.json();
}

export async function createProject(projectDescription) {
  const res = await fetch(`${BASE_URL}/api/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ projectDescription }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.msg || "Failed to create project");
  }

  return res.json();
}

export async function getUserProjects() {
  const res = await fetch(`${BASE_URL}/api/user/projects`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch user projects");
  return res.json();
}

