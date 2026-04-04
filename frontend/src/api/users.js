import { getAccessToken, logoutUser } from "./auth";

const BASE_URL = import.meta.env.VITE_API_URL;

const refreshAccessToken = async () => {
  const refresh = localStorage.getItem("refresh");
  if (!refresh) return null;

  const res = await fetch(`${BASE_URL}/token/refresh/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh }),
  });

  if (res.ok) {
    const data = await res.json();
    localStorage.setItem("access", data.access);
    return data.access;
  }

  logoutUser();
  return null;
};

export const getCurrentUser = async () => {
  let token = getAccessToken();
  if (!token) return null;

  let response = await fetch(`${BASE_URL}/users/me/`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (response.status === 401) {
    token = await refreshAccessToken();
    if (!token) return null;

    response = await fetch(`${BASE_URL}/users/me/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  return response.ok ? await response.json() : null;
};
