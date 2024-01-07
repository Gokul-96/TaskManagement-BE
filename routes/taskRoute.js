const express = require('express');
const { body } = require('express-validator');
const taskController = require('../controllers/taskController');
const isAuth = require('../middleware/authMiddleware');

const router = express.Router();

router.use(isAuth);

router.get('/tasks', taskController.getTasks);
router.post(
  '/tasks',
  [body('title').isString().trim().notEmpty()],
  taskController.createTask
);
router.put('/tasks/:taskId', taskController.updateTask);
router.delete('/tasks/:taskId', taskController.deleteTask);

module.exports = router;