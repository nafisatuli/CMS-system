"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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
  //create array to contain promises
  var promises = [Post.countDocuments().exec(), Category.countDocuments().exec(), Comment.countDocuments().exec()];
  Promise.all(promises).then(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 3),
        postCount = _ref2[0],
        categoryCount = _ref2[1],
        commentCount = _ref2[2];

    res.render('admin/index', {
      postCount: postCount,
      categoryCount: categoryCount,
      commentCount: commentCount
    });
  }); //need to count data for admin dashboard
  // Post.countDocuments({}).then(postCount => {
  //     Comment.countDocuments({}).then(commentCount => {
  //         Category.countDocuments({}).then(categoryCount => {
  //             res.render('admin/index', {
  //                 postCount: postCount,
  //                 commentCount: commentCount,
  //                 categoryCount: categoryCount
  //             });
  //         });
  //     });
  // });
  //res.render('admin/index');
}); //here we dont have to get /admin bcz in the middleware we already told this
//if here another routes client so it will be admin/client already
//for dummy data creation

router.post('/generate-fake-posts', function (req, res) {
  for (var i = 0; i < req.body.amount; i++) {
    var post = new Post();
    post.title = faker.name.title(); //post.status = 'public';

    post.allowComments = faker.random["boolean"]();
    post.body = faker.lorem.sentence();
    post.slug = faker.name.title();
    post.save(function (err) {
      if (err) throw err;
    });
  }

  res.redirect('/admin/posts');
});
module.exports = router;