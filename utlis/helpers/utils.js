module.exports = {
    logged_in: function (req, res, next) {
        if (req.isAuthenticated()) {
            return true;
        }
        next()
    }
  };