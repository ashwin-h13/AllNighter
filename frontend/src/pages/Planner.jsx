import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import { Card, CardContent, Container, Typography } from '@mui/material';
import { IconButton } from "@mui/material";
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import ClearIcon from '@mui/icons-material/Clear';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';



export default function Planner() {
  const { user } = useAuth();
  const userId = user?.uid;
  const [tasks, setTasks] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [completedTaskCount, setCompletedTaskCount] = useState(0);

  // Fetch tasks from backend API filtered by userId
  async function fetchTasks() {
    if (!userId) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`http://localhost:5000/api/planner/${userId}`);
      if (!res.ok) throw new Error("Failed to fetch tasks");
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      setError(err.message || "Error fetching tasks");
    } finally {
      setLoading(false);
    }
  }

  // Add a new task to backend
  async function addTask() {
    if (!newTitle.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:5000/api/planner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, title: newTitle }),
      });
      if (!res.ok) throw new Error("Failed to add task");
      setNewTitle("");
      await fetchTasks(); // refresh task list
    } catch (err) {
      setError(err.message || "Error adding task");
    } finally {
      setLoading(false);
    }
  }

  async function deleteTask(taskId) {
  try {
    const res = await fetch(`http://localhost:5000/api/planner/${taskId}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete task");
    await fetchTasks(); // Refresh list
  } catch (err) {
    setError(err.message || "Error deleting task");
  }
}

async function toggleCompletion(taskId) {
  try {
    const res = await fetch(`http://localhost:5000/api/planner/${taskId}/toggleCompletion`, {
      method: "PUT",
    });
    if (!res.ok) throw new Error("Failed to mark as complete");
    await fetchTasks(); // refresh
  } catch (err) {
    setError(err.message || "Error completing task");
  }
}

  useEffect(() => {
    fetchTasks();
  }, [userId]);
  
    if (!user) return (
      <div className="planner-container">
        <h2>Welcome to Planner!</h2>
        <p>Please sign in before using this feature.</p>
      </div>
    );

  return (
    <Container
      maxWidth="sm"
      sx={{
        //maxWidth: '1200px',
        //margin: '0 auto',
        padding: "120px",
        //boxSizing: 'border-box',
        //width: '100%',
        //minHeight: '100vh',
        display: "flex",
        flexDirection: "column",
        gap: "30px",
        //color: '#000',
      }}
    >
      {/* <Typography align="center" color="white" variant="h2">
        Your Planner
      </Typography> */}

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <Card sx={{ backgroundColor: "#808080", borderRadius: 4 }}>
        <h2 align="center" style={{ color: "white" }}>
          {tasks.filter(task => task.completed).length}/{tasks.length} Tasks Completed
        </h2>
        {tasks.map((task) => (
          <Card
            key={task._id}
            variant="outlined"
            sx={{
              margin: 4,
              backgroundColor: task.completed ? "#00AB66" : "#6699CC",
              borderRadius: 4,
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                //flexDirection: "column",
                alignItems: "center",
                color: "white",
                //justifyContent: "center",
                //textAlign: "center",
              }}
            >
              <IconButton
                sx={{ marginRight: "auto" }}
                onClick={() => deleteTask(task._id)}
              >
                <ClearIcon />
              </IconButton>

              <Typography variant="h6">{task.title}</Typography>

              <IconButton
                sx={{ marginLeft: "auto" }}
                onClick={() => toggleCompletion(task._id)}
              >
                {task.completed ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
              </IconButton>
            </CardContent>
          </Card>
        ))}
      </Card>

      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "35px" }}
      >
        <input
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "16px",
            width: "50%",
            alignContent: "center",
            marginRight: 15,
          }}
          type="text"
          placeholder="Enter new task"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          disabled={loading}
        />

        <button onClick={addTask} disabled={loading || !newTitle.trim()}>
          Add Task
        </button>
      </div>
    </Container>
  );
  
}