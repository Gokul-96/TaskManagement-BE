const { validationResult } = require('express-validator');
const Task = require('../models/taskModel');

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
      const task = new Task({ title, user: req.userId });
      await task.save();

      res.status(201).json(task);
    } catch (error) {
      next(error);
    }
  },

  updateTask: async (req, res, next) => {
    const { taskId } = req.params;

    try {
      const task = await Task.findById(taskId);
      if (!task || task.user.toString() !== req.userId) {
        return res.status(404).json({ message: 'Task not found' });
      }

      task.completed = !task.completed;
      await task.save();

      res.json(task);
    } catch (error) {
      next(error);
    }
  },

  deleteTask: async (req, res, next) => {
    const { taskId } = req.params;

    try {
      const task = await Task.findById(taskId);
      if (!task || task.user.toString() !== req.userId) {
        return res.status(404).json({ message: 'Task not found' });
      }

      await task.remove();

      res.json({ message: 'Task deleted' });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = taskController;