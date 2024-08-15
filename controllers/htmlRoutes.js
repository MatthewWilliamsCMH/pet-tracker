const router = require('express').Router();
const passport = require('passport');
function auth (req, res, next) {
    if (!req.isAuthenticated()) {
        res.redirect('/')
    }
    next()
}

// router.get('/login', function (req, res, next) {
//   res.render('home');
// });

router.get('/', (req, res) => {
    res.render('home');
});

// router.get('/login/password', (req, res) => {
//     res.render('login');
// });

router.get('/register', auth, (req, res) => {
    console.log(req.isAuthenticated())
    console.log(req.session.passport)
    res.render('register');
});

router.get('/new', auth, (req, res) => { 
    res.render('new');
  })

module.exports = router;