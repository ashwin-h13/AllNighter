import { useAuth } from "../context/AuthContext";
import React, { useState, useEffect } from "react";


export default function Planner() {
  const { user } = useAuth();
  const userId = user?.uid;
  const [tasks, setTasks] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
    <div className="planner-container">
      <h2>Your Planner</h2>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {tasks.length === 0 && !loading && <p>No tasks yet.</p>}
        {tasks.map((task) => (
          <li key={task._id}>
            {task.title} {task.completed ? "(Completed)" : ""}
          </li>
        ))}
      </ul>

      <input
        type="text"
        placeholder="New task title"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        disabled={loading}
      />
      <button onClick={addTask} disabled={loading || !newTitle.trim()}>
        Add Task
      </button>
    </div>
  );
  
}