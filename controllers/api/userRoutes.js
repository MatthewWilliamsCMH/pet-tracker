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

// GET /login - Prompt the user to log in.
router.get('/login', function (req, res, next) {
  res.render('login');
});

// POST /login/password - Authenticate the user by verifying a username and password.
router.post('/login/password', passport.authenticate('local', {
  successReturnToOrRedirect: '/',
  failureRedirect: '/login',
  failureMessage: true
}));

// POST /logout - Log the user out.
router.post('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

// GET /signup - Prompt the user to sign up.
router.get('/signup', function (req, res, next) {
  res.render('signup');
});

// POST /signup - Create a new user account.
router.post('/register', function (req, res, next) {
  console.log("Incoming Data: ", req.body);

  bcrypt.hash(req.body.password, 10, function (err, hashedPassword) {
    if (err) {
      console.log("Err: ", err);
      return next(err);
    }

    User.create({ name: req.body.username, email: req.body.email, password: hashedPassword })
      .then(data => {
        const user = {
          id: data.id,
          name: req.body.username
        };

        console.log('New User: ', user);

        req.login(user, function (err) {
          if (err) { return next(err); }
          // Redirect to a protected route
          res.redirect('/');
        });
      })
      .catch(err => {
        console.log("Err: ", err);
        return next(err);
      });
  });
});

module.exports = router;