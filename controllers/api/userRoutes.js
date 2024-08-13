const router = require('express').Router();
const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
const db = require('../../config/connection');
const User = require('../../models/User');

// Configure password authentication strategy using bcrypt.
passport.use(new LocalStrategy(function verify(username, password, cb) {
  db.get('SELECT * FROM users WHERE username = ?', [username], function (err, row) {
    if (err) { return cb(err); }
    if (!row) { return cb(null, false, { message: 'Incorrect username or password.' }); }

    bcrypt.compare(password, row.hashed_password, function (err, result) {
      if (err) { return cb(err); }
      if (!result) { return cb(null, false, { message: 'Incorrect username or password.' }); }
      return cb(null, row);
    });
  });
}));

// Configure session management.
passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, { id: user.id, username: user.username });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

// Routes

//I don't think we need this because the home page is the login page
//GET /login - Prompt the user to log in.
// router.get('/login', function (req, res, next) {
//   res.render('login');
// });

// POST /login/password - Authenticate the user by verifying a username and password.
router.post('/login/password', passport.authenticate('local', {
  successReturnToOrRedirect: '/pack', //this should go to the pack page, not home
  failureRedirect: '/login', //this should return to the login (home) page
  failureMessage: true
}));

// POST /logout - Log the user out.
router.post('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

//I think this can be handled more easily; if the user tries to login and fails, they get an alert and then returned to the login page
// GET /signup - Prompt the user to sign up.
// router.get('/signup', function (req, res, next) {
//   res.render('signup');
// });

// POST /signup - Create a new user account.
router.post('/register', function (req, res, next) {
  console.log("Incoming Data: ", req.body);

  bcrypt.hash(req.body.passVal, 10, function (err, hashedPassword) {
    if (err) {
      console.log("Err: ", err);
      return next(err);
    }

    User.create({ name: req.body.userVal, emailVal: req.body.emailVal, password: hashedPassword })
      .then(data => {
        const user = {
          id: data.id,
          name: req.body.userVal
        };

        console.log('New User: ', user);

        req.login(user, function (err) {
          if (err) { return next(err); }
          // Redirect to a protected route
          res.redirect('/');  //redirect to pack page
        });
      })
      .catch(err => {
        console.log("Err: ", err);
        return next(err);
      });
  });
});

module.exports = router;