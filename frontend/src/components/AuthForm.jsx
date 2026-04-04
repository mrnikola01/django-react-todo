import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../api/auth";
import { Box, Typography, TextField, Button, Alert, Link } from "@mui/material";
import useAutoClearMessage from "../hooks/useAutoClearMessage";

function AuthForm({ type = "login" }) {
  const isLogin = type === "login";
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useAutoClearMessage(error, () => setError(""));

  const handleSubmit = async () => {
    try {
      setError("");

      if (!username.trim() || !password.trim()) {
        setError("All fields are required");
        return;
      }

      if (isLogin) {
        await loginUser({ username, password });
        navigate("/");
      } else {
        await registerUser({ username, password });
        navigate("/login");
      }
    } catch (err) {
      setError(
        err?.detail ||
          err?.username?.[0] ||
          err?.password?.[0] ||
          "Something went wrong",
      );
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 5 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        {isLogin ? "Login" : "Register"}
      </Typography>

      <TextField
        fullWidth
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        sx={{ mt: 2 }}
      />

      <TextField
        fullWidth
        type="password"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{ mt: 2 }}
      />

      <Button
        fullWidth
        variant="contained"
        onClick={handleSubmit}
        sx={{ mt: 2 }}
      >
        {isLogin ? "Login" : "Register"}
      </Button>

      <Typography variant="body2" sx={{ mt: 2 }}>
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <Link
          component="button"
          onClick={() => navigate(isLogin ? "/register" : "/login")}
        >
          {isLogin ? "Register" : "Login"}
        </Link>
      </Typography>

      {error && (
        <Alert severity="error" sx={{ my: 1 }}>
          {error}
        </Alert>
      )}
    </Box>
  );
}

export default AuthForm;
