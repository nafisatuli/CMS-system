"use strict";

var express = require('express');

var router = express.Router(); //bring post

var Post = require('../../models/Post');

var Category = require('../../models/Category');

var User = require('../../models/User');

var bcrypt = require('bcryptjs');

var passport = require('passport');

var LocalStrategy = require('passport-local').Strategy;

router.all('/*', function (req, res, next) {
  req.app.locals.layout = 'home';
  next();
});
router.get('/', function (req, res) {
  //find all post
  Post.find({}).then(function (posts) {
    Category.find({}).then(function (categories) {
      res.render('home/index', {
        posts: posts,
        categories: categories
      });
    });
  });
});
router.get('/about', function (req, res) {
  res.render('home/about');
}); //create route for login and register

router.get('/login', function (req, res) {
  res.render('home/login');
});
passport.use(new LocalStrategy({
  usernameField: 'email'
}, function (email, password, done) {
  //console.log(password);
  User.findOne({
    email: email
  }).then(function (user) {
    if (!user) return done(null, false, {
      message: "No user found"
    });
    bcrypt.compare(password, user.password, function (err, matched) {
      if (err) throw err;

      if (matched) {
        return done(null, user);
      } else {
        return done(null, false, {
          message: 'Incorrect password.'
        });
      }
    }); // user.testMethod();
  });
}));
passport.serializeUser(function (user, done) {
  done(null, user.id);
});
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});
router.post('/login', function (req, res, next) {
  //2nd parameter will be an object with some properties and values
  passport.authenticate('local', {
    successRedirect: '/admin',
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, next);
}); //logout

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/login');
});
router.get('/register', function (req, res) {
  res.render('home/register');
}); //for user registration

router.post('/register', function (req, res) {
  //validation in server
  var errors = [];

  if (!req.body.firstName) {
    errors.push({
      message: 'please add a first name'
    });
  }

  if (!req.body.lastName) {
    errors.push({
      message: 'please add a last name'
    });
  }

  if (!req.body.email) {
    errors.push({
      message: 'please add an email'
    });
  }

  if (!req.body.password) {
    errors.push({
      message: 'please enter a password'
    });
  }

  if (!req.body.passwordConfirm) {
    errors.push({
      message: 'please confirm password'
    });
  }

  if (req.body.password !== req.body.passwordConfirm) {
    errors.push({
      message: 'Password did not match'
    });
  }

  if (req.body.password.length < 6) {
    errors.push({
      message: 'Password must contain at least 6 numbers or characters'
    });
  }

  if (errors.length > 0) {
    res.render('home/register', {
      errors: errors,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email
    });
  } else {
    //find user already exist
    User.findOne({
      email: req.body.email
    }).then(function (user) {
      if (!user) {
        var newUser = new User({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: req.body.password
        }); //salt is a random string of characters

        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(newUser.password, salt, function (err, hash) {
            newUser.password = hash; //console.log(hash);

            newUser.save().then(function (savedUser) {
              req.flash('success_message', 'You are now registered, please login');
              res.redirect('/login');
            });
          });
        });
      } else {
        req.flash('error_message', 'The email already exists, please login');
        res.redirect('/login');
      }
    });
  }
});
router.get('/post/:slug', function (req, res) {
  Post.findOne({
    slug: req.params.slug
  }).populate({
    path: 'comments',
    match: {
      approveComment: true
    },
    populate: {
      path: 'user',
      model: 'users'
    }
  }).populate('user').then(function (post) {
    Category.find({}).then(function (categories) {
      res.render('home/post', {
        post: post,
        categories: categories
      });
    });
  });
});
module.exports = router;