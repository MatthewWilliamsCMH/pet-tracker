const express = require('express');
const router = express.Router();
const Pet = require('../models/Pet');

// adding a new pet
router.post('/add', async (req, res) => {
    const { pet_name, pet_species, pet_breed, pet_color, pet_behavior, kennel } = req.body;

    try {
        const newPet = await Pet.create({
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

module.exports = router;