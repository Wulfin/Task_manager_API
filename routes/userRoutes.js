const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Créer un utilisateur
router.post('/create', userController.createUser);

// Obtenir tous les utilisateurs
router.get('/getall', userController.getUsers);

// Obtenir un utilisateur
router.get('/get/:username', userController.getUserByUsername);

// Mettre à jour un utilisateur
router.put('/update/:username', userController.updateUser);

// Route pour la suppression de l'utilisateur
router.delete('/delete/:username', userController.deleteUser);



module.exports = router;
