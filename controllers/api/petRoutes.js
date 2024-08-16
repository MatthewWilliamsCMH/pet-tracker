const express = require('express');
const router = express.Router();
const { Animal } = require('../../models/animal')

// Adding a new pet
router.post('/add', async (req, res) => {
    const { pet_name, pet_species, pet_breed, pet_color, pet_behavior, kennel } = req.body;
    try {
        // Create a new pet entry in the Animal table
        const newPet = await Animal.create({
            pet_name,
            pet_species,
            pet_breed,
            pet_color,
            pet_behavior,
            kennel,
        });
        res.json({ success: true, data: newPet });
    } catch (error) {
        console.error('Error adding pet:', error);
        res.status(500).json({ success: false, message: 'Error adding pet' });
    }
});
// Route to display all pets
router.get('/pets', async (req, res) => {
    try {
        const pets = await Animal.findAll(); // Fetch all pets
        res.render('pets', { pets }); // Render 'pets.handlebars' view with the pets data
    } catch (error) {
        console.error('Error fetching pets:', error);
        res.status(500).send('Error fetching pets');
    }
});
module.exports = router;