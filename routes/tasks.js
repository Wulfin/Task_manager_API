const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// GET /tasks - Get all tasks of the logged-in user
router.get('/tasks', async (req, res) => {
    try {
      const tasks = await Task.find({ user: req.user._id });
      res.render('tasks/index', { tasks });
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  });
  
  // GET /tasks/:id - Get details of a specific task
  router.get('/tasks/:id', async (req, res) => {
    try {
      const task = await Task.findOne({ _id: req.params.id, user: req.user._id });
      if (!task) {
        return res.status(404).send('Task not found');
      }
      res.render('tasks/show', { task });
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  });
  
  // POST /tasks - Create a new task
  router.post('/tasks', async (req, res) => {
    try {
      const { title, description, deadline } = req.body;
      const newTask = new Task({
        title,
        description,
        deadline,
        user: req.user._id,
      });
      await newTask.save();
      res.redirect('/tasks');
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  });
  
  // PUT /tasks/:id - Update a specific task
  router.put('/tasks/:id', async (req, res) => {
    try {
      const { title, description, deadline, completed } = req.body;
      const task = await Task.findOneAndUpdate(
        { _id: req.params.id, user: req.user._id },
        { title, description, deadline, completed },
        { new: true }
      );
      if (!task) {
        return res.status(404).send('Task not found');
      }
      res.redirect(`/tasks/${task._id}`);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  });
  
  // DELETE /tasks/:id - Delete a specific task
  router.delete('/tasks/:id', async (req, res) => {
    try {
      const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user._id });
      if (!task) {
        return res.status(404).send('Task not found');
      }
      res.redirect('/tasks');
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  });

module.exports = router;