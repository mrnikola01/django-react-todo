import { refreshAccessToken } from "./auth";

const BASE_URL = import.meta.env.VITE_API_URL;

const getAuthHeaders = (includeContentType = true) => {
  const token = localStorage.getItem("access");
  const headers = {};
  if (includeContentType) {
    headers["Content-Type"] = "application/json";
  }
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
};

export const createTodo = async (data) => {
  let response = await fetch(`${BASE_URL}/todos/`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  if (response.status === 401) {
    const newToken = await refreshAccessToken();
    if (!newToken) return null;
    response = await fetch(`${BASE_URL}/todos/`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
  }

  const responseData = await response.json();
  if (!response.ok) throw responseData;
  return responseData;
};

export const updateTodo = async (id, data) => {
  let response = await fetch(`${BASE_URL}/todos/${id}/`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  if (response.status === 401) {
    const newToken = await refreshAccessToken();
    if (!newToken) return null;
    response = await fetch(`${BASE_URL}/todos/${id}/`, {
      method: "PATCH",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
  }

  const responseData = await response.json();
  if (!response.ok) throw responseData;
  return responseData;
};

export const deleteTodo = async (id) => {
  let response = await fetch(`${BASE_URL}/todos/${id}/`, {
    method: "DELETE",
    headers: getAuthHeaders(false),
  });

  if (response.status === 401) {
    const newToken = await refreshAccessToken();
    if (!newToken) return null;
    response = await fetch(`${BASE_URL}/todos/${id}/`, {
      method: "DELETE",
      headers: getAuthHeaders(false),
    });
  }

  if (!response.ok) throw new Error("Failed to delete todo");
  return true;
};

export const getTodos = async () => {
  const response = await fetch(`${BASE_URL}/todos/`, {
    headers: getAuthHeaders(false),
  });
  const responseData = await response.json();
  if (!response.ok) throw responseData;
  return responseData;
};
