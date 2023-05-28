const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Inscription d'un utilisateur
router.post('/signup', authController.signup);

// Connexion d'un utilisateur
router.post('/login', authController.login);

// Déconnexion d'un utilisateur
router.post('/logout', authController.logout);

module.exports = router;
