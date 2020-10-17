const express = require('express');
const router = express.Router();
const Comment = require('../../models/Comment');
const Post = require('../../models/Post');


router.all('/*', (req, res, next) => {

    req.app.locals.layout = 'admin';
    next();

});


router.get('/', (req, res) => {

    Comment.find({}).populate('user')
        .then(comments => {

            res.render('admin/comments', {
                comments: comments
            });
        });

    // res.render('admin/comments');
});




router.post('/', (req, res) => {

    //find specific post and the id
    Post.findOne({
        _id: req.body.id
    }).then(post => {

        const newComment = new Comment({

            user: req.user.id,
            body: req.body.body
        });

        //grap the post and push new comment
        post.comments.push(newComment);
        //save the post
        post.save().then(savedPost => {

            //save the comment
            newComment.save().then(savedComment => {
                res.redirect(`/post/${post.id}`);
            })
        });

    });

});

//delete

router.delete('/:id', (req, res) => {

    Comment.deleteOne({
        _id: req.params.id
    }).then(deletedComment => {


        res.redirect('/admin/comments');
    })

});

module.exports = router;