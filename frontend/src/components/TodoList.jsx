import { Alert, Card, CardContent, List, Typography } from "@mui/material";
import { updateTodo, deleteTodo } from "../api/todos";
import TodoItem from "./TodoItem";

function TodoList({ todos, setTodos, user, userLoading }) {
  const handleToggle = async (todo) => {
    try {
      const updated = await updateTodo(todo.id, {
        completed: !todo.completed,
      });

      setTodos((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);

      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = async (updatedTodo) => {
    try {
      const updated = await updateTodo(updatedTodo.id, {
        title: updatedTodo.title,
        description: updatedTodo.description,
      });

      setTodos((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    } catch (error) {
      console.error(error);
    }
  };

  const isAuthenticated = !!localStorage.getItem("access");

  return (
    <Card elevation={3} sx={{ mt: 4, borderRadius: 3 }}>
      <CardContent>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Total items: {todos.length}
        </Typography>

        {todos.length === 0 ? (
          <Alert severity="info">No todos available</Alert>
        ) : (
          <List>
            {todos.map((todo, index) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                isLast={index === todos.length - 1}
                onToggle={handleToggle}
                onDelete={handleDelete}
                onEdit={handleEdit}
                user={user}
                userLoading={userLoading}
                isAuthenticated={isAuthenticated}
              />
            ))}
          </List>
        )}
      </CardContent>
    </Card>
  );
}

export default TodoList;
