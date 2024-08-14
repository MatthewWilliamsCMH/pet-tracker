const router = require('express').Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
const db = require('../../config/connection');
const User = require('../../models/User');



// Routes

//I don't think we need this because the home page is the login page
//GET /login - Prompt the user to log in.
// router.get('/login', function (req, res, next) {
//   res.render('login');
// });

// POST /login/password - Authenticate the user by verifying a username and password.
router.post('/login/password', passport.authenticate('local', {
  successReturnToOrRedirect: '/', //this should go to the pack page, not home
  failureRedirect: '/register', //this should return to the login (home) page
  failureMessage: true
}), function (req, res) {
  console.log("Hello")
  res.redirect("/register")
}
);

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
          res.redirect('/register');  //redirect to pack page
        });
      })
      .catch(err => {
        console.log("Err: ", err);
        return next(err);
      });
  });
});

module.exports = router;