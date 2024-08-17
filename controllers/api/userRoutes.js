const router = require('express').Router();
const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
const db = require('../../config/connection');
const {Animal, User} = require('../../models');

// Routes
// Validate user.
passport.use(new LocalStrategy(function verify(username, password, cb) {
  User.findOne({where: { name : username}}).then(function (row) {
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
    cb(null, { id: user.id, name: user.name }); //if this is referencing the database table, it's user.name, not user.username
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

// POST /login/password - Authenticate the user by verifying a username and password.
router.post('/login/password', async (req,res) => {
  try {
    passport.authenticate('local', {
      failureRedirect: '/',  
      
    })
    res.redirect('/packroute')
  } catch (err) {
    console.error(err)
    res.status(500).json(err)
  }
  
})
  



// POST /register - Create a new user account.
router.post('/register', function (req, res, next) {

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
          res.redirect('/packroute');
        });
      })
      .catch(err => {
        console.log("Err: ", err);
        return next(err);
      });
  });
});


// POST /logout - Log the user out.
router.post('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});


module.exports = router;