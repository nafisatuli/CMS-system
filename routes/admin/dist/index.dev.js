"use strict";

var express = require('express');

var _require = require('../home'),
    route = _require.route;

var router = express.Router();

var faker = require('faker');

var Post = require('../../models/Post');

var Comment = require('../../models/Comment');

var Category = require('../../models/Category');

var _require2 = require('../../helpers/authentication'),
    userAuthenticated = _require2.userAuthenticated; //override default layout
//by /* it  is affecting after admin,anything after admin;


router.all('/*', userAuthenticated, function (req, res, next) {
  req.app.locals.layout = 'admin';
  next();
});
router.get('/', function (req, res) {
  //need to count data for admin dashboard
  Post.countDocuments({}).then(function (postCount) {
    Comment.countDocuments({}).then(function (commentCount) {
      Category.countDocuments({}).then(function (categoryCount) {
        res.render('admin/index', {
          postCount: postCount,
          commentCount: commentCount,
          categoryCount: categoryCount
        });
      });
    });
  }); //res.render('admin/index');
}); //here we dont have to get /admin bcz in the middleware we already told this
//if here another routes client so it will be admin/client already
//for dummy data creation

router.post('/generate-fake-posts', function (req, res) {
  for (var i = 0; i < req.body.amount; i++) {
    var post = new Post();
    post.title = faker.name.title();
    post.status = 'public';
    post.allowComments = faker.random["boolean"]();
    post.body = faker.lorem.sentence();
    post.save(function (err) {
      if (err) throw err;
    });
  }

  res.redirect('/admin/posts');
});
module.exports = router;