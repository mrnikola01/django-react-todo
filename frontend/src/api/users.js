import { getAccessToken, logoutUser } from "./auth";

const BASE_URL = import.meta.env.VITE_API_URL;

export const getCurrentUser = async () => {
  let token = getAccessToken();
  if (!token) return null;

  let response = await fetch(`${BASE_URL}/users/me/`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (response.status === 401) {
    const refresh = localStorage.getItem("refresh");
    if (!refresh) {
      logoutUser();
      return null;
    }

    const refreshRes = await fetch(`${BASE_URL}/token/refresh/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh }),
    });

    if (refreshRes.ok) {
      const data = await refreshRes.json();
      localStorage.setItem("access", data.access);

      response = await fetch(`${BASE_URL}/users/me/`, {
        headers: { Authorization: `Bearer ${data.access}` },
      });
    } else {
      logoutUser();
      return null;
    }
  }

  if (response.ok) {
    return await response.json();
  }

  return null;
};
