"use strict";

module.exports = {
  userAuthenticated: function userAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }

    res.redirect('/login');
  }
};