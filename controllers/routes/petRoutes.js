const router = require('express').Router();
const { Pet } = require('../models');
const withAuth = require('../utils/auth');

// Get all pets
router.get('/', async (req, res) => {
  try {
    const petData = await Pet.findAll();
    res.status(200).json(petData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get a single pet by ID
router.get('/:id', async (req, res) => {
  try {
    const petData = await Pet.findByPk(req.params.id);
    
    if (!petData) {
      res.status(404).json({ message: 'No pet found with this id!' });
      return;
    }

    res.status(200).json(petData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new pet
router.post('/', withAuth, async (req, res) => {
  try {
    const newPet = await Pet.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPet);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update a pet by ID
router.put('/:id', withAuth, async (req, res) => {
  try {
    const petData = await Pet.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!petData[0]) {
      res.status(404).json({ message: 'No pet found with this id!' });
      return;
    }

    res.status(200).json(petData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a pet by ID
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const petData = await Pet.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!petData) {
      res.status(404).json({ message: 'No pet found with this id!' });
      return;
    }

    res.status(200).json(petData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
