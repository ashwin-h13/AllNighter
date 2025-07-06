// backend/routes/tasks.js
const express = require('express');
const router = express.Router();
const { getDB } = require('../db');
const { ObjectId } = require('mongodb');

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

// DELETE - Delete a task by ID
router.delete('/:taskId', async (req, res) => {
  const db = getDB();
  const { taskId } = req.params;

  try {
    const result = await db.collection('planner').deleteOne({ _id: new ObjectId(taskId) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json({ message: "Task deleted" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ error: "Failed to delete task" });
  }
});

// UPDATE - Change task to finished or not complete
router.put('/:taskId/toggleCompletion', async (req, res) => {
  const db = getDB();
  const { taskId } = req.params;

  try {
    const task = await db.collection('planner').findOne({ _id: new ObjectId(taskId) });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const updated = await db.collection('planner').updateOne(
      { _id: new ObjectId(taskId) },
      { $set: { completed: !task.completed } }
    );

    res.json({ message: 'Task toggled', completed: !task.completed });
  } catch (err) {
    console.error("Toggle error:", err);
    res.status(500).json({ error: "Failed to toggle task" });
  }
});


module.exports = router;
