const express = require('express');
const router = express.Router();
const Comment = require('../../models/Comment');
const Post = require('../../models/Post');

router.all('/*', (req, res, next) => {

    req.app.locals.layout = 'admin';
    next();

});

router.get('/', (req, res) => {

    Comment.find({
            //req.user.id
            user: req.user.id
        }).populate('user')
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

                req.flash('success_message', 'Your comment will be reviewed.');
                res.redirect(`/post/${post.slug}`);
            })
        });

    });

});

//delete
//delete comment with post reference
router.delete('/:id', (req, res) => {

    Comment.deleteOne({
        _id: req.params.id
    }).then(deletedComment => {


        Post.findOneAndUpdate({
            comments: req.params.id
        }, {
            $pull: {
                comments: req.params.id
            }
        }, (err, data) => {

            if (err) console.log(err);
            res.redirect('/admin/comments');

        });
    });

});


//approve comment
router.post('/approve-comment', (req, res) => {

    Comment.findByIdAndUpdate(req.body.id, {
        $set: {
            approveComment: req.body.approveComment
        }
    }, (err, result) => {
        if (err) console.log(err);;
        res.send(result);
    });
});

module.exports = router;