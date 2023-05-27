const express = require('express');
const router = express.Router();
const userController = require('./controllers/userController');
const taskController = require('./controllers/taskController');
const authController = require('./controllers/authController');

// Routes des utilisateurs
router.post('/users', userController.createUser);
router.get('/users', userController.getUsers);
router.get('/users/:id', userController.getUserById);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

// Routes des tâches
router.post('/tasks', taskController.createTask);
router.get('/tasks', taskController.getTasks);
router.get('/tasks/:id', taskController.getTaskById);
router.put('/tasks/:id', taskController.updateTask);
router.delete('/tasks/:id', taskController.deleteTask);

// Routes d'authentification
router.post('/login', authController.login);
router.post('/logout', authController.logout);

module.exports = router;