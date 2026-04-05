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
import useTodos from "./hooks/useTodos";

function App() {
  const { user, loading: userLoading } = useCurrentUser();
  const { todos, setTodos, loading, error, addTodo } = useTodos(userLoading);
  const navigate = useNavigate();
  const isAuthenticated = !!user;

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
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
            {`Todo List${user?.username ? ` (${user.username})` : ""}`}
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
          <TodoList
            todos={todos}
            setTodos={setTodos}
            user={user}
            userLoading={userLoading}
          />
        )}
      </Box>
    </Container>
  );
}

export default App;
