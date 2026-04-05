const BASE_URL = import.meta.env.VITE_API_URL;

export const registerUser = async (data) => {
  const response = await fetch(`${BASE_URL}/register/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw responseData;
  }

  return responseData;
};

export const loginUser = async (data) => {
  const response = await fetch(`${BASE_URL}/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw responseData;
  }

  localStorage.setItem("access", responseData.access);
  localStorage.setItem("refresh", responseData.refresh);

  return responseData;
};

export const logoutUser = () => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
};

export const getAccessToken = () => {
  return localStorage.getItem("access");
};

export const refreshAccessToken = async () => {
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
