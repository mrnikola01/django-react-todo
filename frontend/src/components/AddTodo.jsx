import { useState } from "react";
import { createTodo } from "../api/todos";
import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import useAutoClearMessage from "../hooks/useAutoClearMessage";

function AddTodo({ onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  useAutoClearMessage(error, () => setError(""));

  const handleAdd = async () => {
    try {
      setError("");

      if (!title.trim()) {
        setError("Title is required");
        return;
      }

      const data = await createTodo({
        title,
        description,
        completed: false,
      });

      onAdd(data);

      setTitle("");
      setDescription("");
    } catch (err) {
      setError(err.title?.[0] || "Something went wrong");
    }
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6">Add Todo</Typography>

      <TextField
        fullWidth
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{ mt: 2 }}
      />

      <TextField
        fullWidth
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        sx={{ mt: 2 }}
      />

      <Button variant="contained" onClick={handleAdd} sx={{ mt: 2 }}>
        Add
      </Button>

      {error && (
        <Alert severity="error" sx={{ my: 1 }}>
          {error}
        </Alert>
      )}
    </Box>
  );
}

export default AddTodo;
