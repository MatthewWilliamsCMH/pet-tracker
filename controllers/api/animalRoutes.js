const express = require('express');
const router = express.Router();
const { Animal } = require('../../models/animal')

// Adding a new animal
router.post('/add', async (req, res) => {
    const { animal_name, animal_chip, animal_species, animal_breed, animal_sex, animal_altered, animal_color, animal_behavior, kennel } = req.body;
    try {
        // Create a new animal entry in the Animal table
        const newAnimal = await Animal.create({
            animal_name,
            animal_chip,
            animal_species,
            animal_breed,
            animal_sex,
            animal_altered,
            animal_color,
            animal_behavior, //this will need to be written into the animalBehavior table
            kennel
        });
        res.json({ success: true, data: newAnimal });
    } catch (error) {
        console.error('Error adding animal:', error);
        res.status(500).json({ success: false, message: 'Error adding animal' });
    }
});
// Route to display all animals
router.get('/animals', async (req, res) => {
    try {
        const animals = await Animal.findAll(); // Fetch all animals
        res.render('animals', { animals }); // Render 'animals.handlebars' view with the animals data
    } catch (error) {
        console.error('Error fetching animals:', error);
        res.status(500).send('Error fetching animals');
    }
});
module.exports = router;