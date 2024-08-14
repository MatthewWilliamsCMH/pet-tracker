const router = require('express').Router();

router.get('/login', function (req, res, next) {
  res.render('home');
});

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/login/password', (req, res) => {
    res.render('login');
});

router.get('/register', (req, res) => {
    console.log(req.session.passport)
    res.render('register');
});


module.exports = router;