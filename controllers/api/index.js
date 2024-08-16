const router = require('express').Router();
const usersRoutes = require('./userRoutes')
const petRoutes = require('./petRoutes')

// all of these routes are prefixed with '/api'
router.use('/', usersRoutes);

module.exports = router;