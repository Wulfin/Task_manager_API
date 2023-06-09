const User = require('../models/User');

// Créer un nouvel utilisateur
exports.createUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).send('Username already exists');
        }
        const user = new User({ username, password });
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

// Récupérer tous les utilisateurs
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

// Récupérer un utilisateur par ID
exports.getUserByUsername = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};


// Mettre à jour un utilisateur
exports.updateUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const updatedUser = await User.findOneAndUpdate(
            { username: req.params.username },
            { username, password },
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).send('User not found');
        }
        res.json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findOneAndRemove({
            username: req.params.username,
        });
        if (!deletedUser) {
            return res.status(404).send('User not found');
        }
        res.json(deletedUser);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};
