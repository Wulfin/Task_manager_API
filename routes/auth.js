const express = require('express');
//const bcrypt = require('bcrypt');
const User = require('../models/User');

const router = express.Router();

// GET /signup - Afficher le formulaire d'inscription
router.get('/signup', (req, res) => {
  res.render('signup'); // Remplacez 'signup' par le nom de votre modèle de vue pour le formulaire d'inscription
});

// POST /signup - Gérer l'inscription de l'utilisateur
router.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send('Username already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    req.session.userId = user._id;
    res.redirect('/tasks'); // Redirigez vers la page des tâches une fois l'inscription réussie
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// GET /login - Afficher le formulaire de connexion
router.get('/login', (req, res) => {
  res.render('login'); // Remplacez 'login' par le nom de votre modèle de vue pour le formulaire de connexion
});

// POST /login - Gérer la connexion de l'utilisateur
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).send('Invalid username or password');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send('Invalid username or password');
    }
    req.session.userId = user._id;
    res.redirect('/tasks'); // Redirigez vers la page des tâches une fois la connexion réussie
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// GET /logout - Gérer la déconnexion de l'utilisateur
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login'); // Redirigez vers la page de connexion une fois la déconnexion réussie
});

module.exports = router;
