const router = require('express').Router();
const usersRoutes = require('./userRoutes')
const animalRoutes = require('./animalRoutes')

// all of these routes are prefixed with '/api'
router.use('/', usersRoutes);

module.exports = router;