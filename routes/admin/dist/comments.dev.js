"use strict";

var express = require('express');

var router = express.Router();

var Comment = require('../../models/Comment');

var Post = require('../../models/Post');

router.all('/*', function (req, res, next) {
  req.app.locals.layout = 'admin';
  next();
});
router.get('/', function (req, res) {
  Comment.find({}).populate('user').then(function (comments) {
    res.render('admin/comments', {
      comments: comments
    });
  }); // res.render('admin/comments');
});
router.post('/', function (req, res) {
  //find specific post and the id
  Post.findOne({
    _id: req.body.id
  }).then(function (post) {
    var newComment = new Comment({
      user: req.user.id,
      body: req.body.body
    }); //grap the post and push new comment

    post.comments.push(newComment); //save the post

    post.save().then(function (savedPost) {
      //save the comment
      newComment.save().then(function (savedComment) {
        res.redirect("/post/".concat(post.id));
      });
    });
  });
}); //delete

router["delete"]('/:id', function (req, res) {
  Comment.deleteOne({
    _id: req.params.id
  }).then(function (deletedComment) {
    res.redirect('/admin/comments');
  });
});
module.exports = router;