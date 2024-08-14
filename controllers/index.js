const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/login/password', (req, res) => {
    res.render('/login');
});

router.get('/register', (req, res) => {
    res.render('users/register');
});

module.exports = router;