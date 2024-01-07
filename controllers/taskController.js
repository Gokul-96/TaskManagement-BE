const { validationResult } = require('express-validator');
const Task = require('../models/taskModel');
const User = require('../models/authModel');

const taskController = {
  getTasks: async (req, res, next) => {
    try {
      const tasks = await Task.find({ user: req.userId });
      res.json(tasks);
    } catch (error) {
      next(error);
    }
  },

  createTask: async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title } = req.body;

    try {
      // Assuming you have the user ID available in req.userId
      const userId = req.userId;

      // Check if the user exists
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Create a new task associated with the user
      const task = new Task({ title, user: userId });
      await task.save();

      res.status(201).json(task);
    } catch (error) {
      next(error);
    }
  },

  updateTask: async (req, res, next) => {
    const { taskId } = req.params;
    const { title, completed } = req.body;

    try {
      const task = await Task.findById(taskId);

      if (!task || task.user.toString() !== req.userId) {
        return res.status(404).json({ message: 'Task not found' });
      }

      // Update task properties
      task.title = title || task.title;
      task.completed = completed !== undefined ? completed : task.completed;

      await task.save();

      res.json(task);
    } catch (error) {
      next(error);
    }
  },

  deleteTask: async (req, res, next) => {
    const { taskId } = req.params;
  
    try {
      console.log('Deleting task:', taskId);
      const task = await Task.findById(taskId);
  
      if (!task || task.user.toString() !== req.userId) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      await Task.deleteOne({ _id: taskId }); // Use deleteOne instead of remove
  
      res.json({ message: 'Task deleted' });
    } catch (error) {
      console.error('Error deleting task:', error);
      next(error);
    }
  },
  getTaskById : async (req, res, next) => {
    try {
      const { taskId } = req.params;
      const task = await Task.findById(taskId);
  
      if (!task || task.user.toString() !== req.userId) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      res.json(task);
    } catch (error) {
      next(error);
    }
}};

module.exports = taskController;