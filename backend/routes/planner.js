// backend/routes/tasks.js
const express = require('express');
const router = express.Router();
const { getDB } = require('../db');

// POST - Create task
router.post('/', async (req, res) => {
  const db = getDB();
  const { title, userId } = req.body;

  if (!title || !userId) {
    return res.status(400).json({ error: "Title and userId are required" });
  }

  const newTask = {
    title,
    completed: false,
    userId,              // 👈 Store userId
    createdAt: new Date(),
  };

  try {
    const result = await db.collection('planner').insertOne(newTask);
    res.status(201).json({ message: 'Task added', taskId: result.insertedId });
  } catch (err) {
    console.error("Insert error:", err);
    res.status(500).json({ error: "Failed to add task" });
  }
});


// GET - Get tasks for specific user
router.get('/:userId', async (req, res) => {
  const db = getDB();
  const { userId } = req.params;

  try {
    const tasks = await db.collection('planner').find({ userId }).toArray();
    res.json(tasks);
  } catch (err) {
    console.error("Query error:", err);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});


module.exports = router;
