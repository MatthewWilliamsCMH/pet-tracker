const router = require('express').Router();
const userRoutes = require('./userRoutes')
const animalRoutes = require('./animalRoutes')

// all of these routes are prefixed with '/api'
router.use('/users', userRoutes);
router.use('/animals', animalRoutes);

module.exports = router;