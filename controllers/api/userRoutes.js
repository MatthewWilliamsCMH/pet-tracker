const router = require('express').Router();
const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
const db = require('../../config/connection');
const User = require('../../models/User');

// Routes
passport.use(new LocalStrategy(function verify(username, password, cb) {
  User.findOne({where: {email: username}}).then(function (row) {
    // if (err) { return cb(err); }
    if (!row) { return cb(null, false, { message: 'Incorrect username or password.' }); }

    bcrypt.compare(password, row.password, function (err, result) {
      if (err) { return cb(err); }
      if (!result) { return cb(null, false, { message: 'Incorrect username or password.' }); }
      console.log("User successfully logged in!")
      return cb(null, row);
    });
  })
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

// POST /login/password - Authenticate the user by verifying a username and password.
router.post('/login/password', passport.authenticate('local', {
  successReturnToOrRedirect: '/new',
  failureRedirect: '/',
  failureMessage: true
}), function (req, res) {
}
);

// POST /logout - Log the user out.
router.post('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

// POST /register - Create a new user account.
router.post('/register', function (req, res, next) {
  console.log("Incoming Data: ", req.body);

  bcrypt.hash(req.body.password, 10, function (err, hashedPassword) {
    if (err) {
      console.log("Err: ", err);
      return next(err);
    }

    User.create({ name: req.body.user, email: req.body.email, password: hashedPassword })
      .then(data => {
        const user = {
          id: data.id,
          name: req.body.user
        };

        console.log('New User: ', user);

        req.login(user, function (err) {
          if (err) { return next(err); }
          // Redirect to a protected route
          res.redirect('/new');  //redirect to pack page
        });
      })
      .catch(err => {
        console.log("Err: ", err);
        return next(err);
      });
  });
});

module.exports = router;