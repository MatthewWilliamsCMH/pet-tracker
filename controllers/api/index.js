const router = require('express').Router();
const usersRoutes = require('./userRoutes')

// all of these routes are prefixed with '/api'
router.use('/users', usersRoutes);


module.exports = router;