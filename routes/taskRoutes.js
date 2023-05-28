const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Créer une tâche
router.post('/create', taskController.createTask);

// Obtenir toutes les tâches
router.get('/getall', taskController.getTasks);

// Obtenir une tâche par ID
router.get('/get/:title', taskController.getTask);

// Mettre à jour une tâche
router.put('/update/:title', taskController.updateTask);

// Supprimer une tâche
router.delete('/delete/:title', taskController.deleteTask);

router.get('/complete/:title', taskController.markTaskAsCompletedOrUncompleted);

module.exports = router;
