const router = require('express').Router();

// ALL of these routes are PREFIXED with '/api/users'

router.post('/', (req, res) => {
    console.log('Incoming Data: ', req.body);
    // we create our NEW USER

    // USE PASSPORT to AUTHENTICATE USER
})




module.exports = router;