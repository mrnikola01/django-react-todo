import { useEffect, useState } from "react";
import { getTodos } from "../api/todos";

export default function useTodos(userLoading) {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (userLoading) return;

    const fetchTodos = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getTodos();
        setTodos(data);
      } catch (err) {
        setError(err.message || "Failed to fetch todos.");
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, [userLoading]);

  const addTodo = (newTodo) => {
    setTodos((prev) => [newTodo, ...prev]);
  };

  return { todos, setTodos, loading, error, addTodo };
}
