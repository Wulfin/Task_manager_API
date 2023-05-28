const Task = require('../models/Task');

// Créer une nouvelle tâche
exports.createTask = async (req, res) => {
    try {
        const { title, description, deadline, user,} = req.body;

        // Vérifier si le titre existe déjà dans la base de données
        const existingTask = await Task.findOne({ title });

        if (existingTask) {
            return res.status(400).json({ error: 'Ce titre de tâche est déjà utilisé' });
        }

        // Créer une nouvelle tâche avec les détails fournis
        const task = new Task({ title, description, deadline, user });

        // Enregistrer la tâche dans la base de données
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

// Récupérer une tâche par titre
exports.getTask = async (req, res) => {
    try {
        const task = await Task.findOne({ title: req.params.title });
        if (!task) {
            return res.status(404).send('Task not found');
        }
        res.json(task);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

// Mettre à jour une tâche par titre
exports.updateTask = async (req, res) => {
    try {
        const { title, description, deadline } = req.body;
        const updatedTask = await Task.findOneAndUpdate(
            { title: req.params.title },
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

// Supprimer une tâche par titre
exports.deleteTask = async (req, res) => {
    try {
        const deletedTask = await Task.findOneAndRemove({ title: req.params.title });
        if (!deletedTask) {
            return res.status(404).send('Task not found');
        }
        res.json(deletedTask);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

// Marquer une tâche par titre comme terminée
exports.markTaskAsCompletedOrUncompleted = async (req, res) => {
    try {
        const { title } = req.params;
        const task = await Task.findOne({ title });

        if (!task) {
            return res.status(404).json({ message: 'Tâche non trouvée.' });
        }

        // Toggle the value of `completed`
        task.completed = !task.completed;

        const updatedTask = await task.save();

        res.status(200).json(updatedTask);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur s\'est produite lors du marquage de la tâche.' });
    }
};


