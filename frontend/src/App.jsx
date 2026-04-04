import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "./api/auth";
import useCurrentUser from "./hooks/useCurrentUser";
import {
  Container,
  Typography,
  Box,
  Alert,
  CircularProgress,
  Button,
} from "@mui/material";
import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";
import useFetch from "./hooks/useFetch";

function App() {
  const { todos, setTodos, loading, error, addTodo } = useFetch();
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("access"),
  );

  const { user, loading: userLoading } = useCurrentUser();

  const handleLogout = () => {
    logoutUser();
    setIsAuthenticated(false);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 6 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Typography variant="h3" fontWeight={700}>
            {isAuthenticated && !userLoading
              ? `Todo List (${user?.username || ""})`
              : "Todo List"}
          </Typography>

          <Button
            variant="contained"
            color={isAuthenticated ? "error" : "primary"}
            onClick={isAuthenticated ? handleLogout : () => navigate("/login")}
          >
            {isAuthenticated ? "Logout" : "Login"}
          </Button>
        </Box>

        {isAuthenticated && <AddTodo onAdd={addTodo} />}

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ mt: 4 }}>
            {error}
          </Alert>
        ) : (
          <TodoList todos={todos} setTodos={setTodos} />
        )}
      </Box>
    </Container>
  );
}

export default App;
