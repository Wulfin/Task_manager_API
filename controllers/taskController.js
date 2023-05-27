const Task = require('../models/Task');

// Créer une nouvelle tâche
exports.createTask = async (req, res) => {
    try {
        const { title, description, deadline } = req.body;
        const task = new Task({ title, description, deadline });
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

// Récupérer toutes les tâches
exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

// Récupérer une tâche par ID
exports.getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).send('Task not found');
        }
        res.json(task);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

// Mettre à jour une tâche
exports.updateTask = async (req, res) => {
    try {
        const { title, description, deadline } = req.body;
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            { title, description, deadline },
            { new: true }
        );
        if (!updatedTask) {
            return res.status(404).send('Task not found');
        }
        res.json(updatedTask);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

// Supprimer une tâche
exports.deleteTask = async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndRemove(req.params.id);
        if (!deletedTask) {
            return res.status(404).send('Task not found');
        }
        res.json(deletedTask);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};
