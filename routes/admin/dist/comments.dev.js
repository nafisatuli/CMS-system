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
  Comment.find({
    //req.user.id
    user: '5f87ebf4b30ad41a7c58d04a'
  }).populate('user').then(function (comments) {
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
        req.flash('success_message', 'Your comment will be reviewed soon, please wait.');
        res.redirect("/post/".concat(post.id));
      });
    });
  });
}); //delete
//delete comment with post reference

router["delete"]('/:id', function (req, res) {
  Comment.deleteOne({
    _id: req.params.id
  }).then(function (deletedComment) {
    Post.findOneAndUpdate({
      comments: req.params.id
    }, {
      $pull: {
        comments: req.params.id
      }
    }, function (err, data) {
      if (err) console.log(err);
      res.redirect('/admin/comments');
    });
  });
}); //approve comment

router.post('/approve-comment', function (req, res) {
  Comment.findByIdAndUpdate(req.body.id, {
    $set: {
      approveComment: req.body.approveComment
    }
  }, function (err, result) {
    if (err) console.log(err);
    ;
    res.send(result);
  });
});
module.exports = router;