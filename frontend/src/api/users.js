import { getAccessToken, refreshAccessToken } from "./auth";

const BASE_URL = import.meta.env.VITE_API_URL;

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
