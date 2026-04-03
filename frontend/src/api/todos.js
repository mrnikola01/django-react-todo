const BASE_URL = "http://127.0.0.1:8000/api";

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
  const response = await fetch(`${BASE_URL}/todos/`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw responseData;
  }

  return responseData;
};

export const updateTodo = async (id, data) => {
  const response = await fetch(`${BASE_URL}/todos/${id}/`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw responseData;
  }

  return responseData;
};

export const deleteTodo = async (id) => {
  const response = await fetch(`${BASE_URL}/todos/${id}/`, {
    method: "DELETE",
    headers: getAuthHeaders(false),
  });

  if (!response.ok) {
    throw new Error("Failed to delete todo");
  }

  return true;
};

export const getTodos = async () => {
  const response = await fetch(`${BASE_URL}/todos/`, {
    headers: getAuthHeaders(false),
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw responseData;
  }

  return responseData;
};
