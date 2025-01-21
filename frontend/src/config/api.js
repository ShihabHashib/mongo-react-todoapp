export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const API_ENDPOINTS = {
  TODOS: `${API_BASE_URL}/todos`,
  TODO: (id) => `${API_BASE_URL}/todos/${id}`,
};
