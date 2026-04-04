const BASE_URL = import.meta.env.VITE_API_URL;

export const getCurrentUser = async () => {
  const token = localStorage.getItem("access");
  if (!token) return null;

  const response = await fetch(`${BASE_URL}/users/me/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.ok) {
    return await response.json();
  }
  return null;
};
