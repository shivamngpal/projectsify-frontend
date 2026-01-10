const BASE_URL = import.meta.env.VITE_API_URL;

async function handleJsonResponse(res, fallbackMessage) {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.msg || fallbackMessage);
  }
  return data;
}

export async function loginApi(email, password) {
  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  return handleJsonResponse(res, "Login failed");
}

export async function signupApi(name, email, password) {
  const res = await fetch(`${BASE_URL}/api/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });

  return handleJsonResponse(res, "Signup failed");
}
