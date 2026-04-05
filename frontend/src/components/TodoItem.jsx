import { useState } from "react";
import {
  Box,
  Chip,
  Divider,
  ListItem,
  ListItemText,
  Typography,
  IconButton,
  Checkbox,
  Collapse,
  TextField,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function TodoItem({
  todo,
  isLast,
  onToggle,
  onDelete,
  onEdit,
  user,
  userLoading,
}) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description || "");

  const canEditOrDelete =
    !userLoading && user && (user.id === todo.owner_id || user.is_staff);

  const handleSave = () => {
    onEdit({ ...todo, title, description });
    setOpen(false);
  };

  return (
    <Box>
      <ListItem
        secondaryAction={
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Chip
              label={todo.completed ? "Completed" : "Not Completed"}
              color={todo.completed ? "success" : "warning"}
            />

            {canEditOrDelete && (
              <>
                <IconButton onClick={() => setOpen((prev) => !prev)}>
                  <EditIcon />
                </IconButton>

                <IconButton onClick={() => onDelete(todo.id)}>
                  <DeleteIcon />
                </IconButton>
              </>
            )}
          </Box>
        }
      >
        {canEditOrDelete && (
          <Checkbox checked={todo.completed} onChange={() => onToggle(todo)} />
        )}

        <ListItemText
          primary={
            <Typography
              sx={{
                fontWeight: 600,
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              {todo.title}
            </Typography>
          }
          secondary={todo.description || "No description"}
        />
      </ListItem>

      {canEditOrDelete && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
            />

            <TextField
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
            />

            <Button
              variant="contained"
              onClick={handleSave}
              sx={{ alignSelf: "flex-start" }}
            >
              Save
            </Button>
          </Box>
        </Collapse>
      )}

      {!isLast && <Divider />}
    </Box>
  );
}

export default TodoItem;
