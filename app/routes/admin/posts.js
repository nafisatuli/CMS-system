const express = require('express');
const router = express.Router();
const fs = require('fs'); //for file system
//model
const Post = require('../../models/Post');
const Category = require('../../models/Category');
const Comment = require('../../models/Comment');
const {
    route
} = require('../home');
const {
    isEmpty,
    uploadDir
} = require('../../helpers/upload-helpers');

const {
    userAuthenticated
} = require('../../helpers/authentication');

router.all('/*', userAuthenticated, (req, res, next) => {
    req.app.locals.layout = 'admin';
    next();
});

//by default it it /admin/posts
router.get('/', (req, res) => {
    //before render we need to get data
    //passing nothing is gonna bring everything
    //use populate to get category object
    Post.find({})
        .populate('category')
        .then(posts => {
            res.render('admin/posts', {
                posts: posts
            })
        }).catch(error => {
            console.log(error);
        });
    //res.render('admin/posts');
});

//my post
router.get('/my-posts', (req, res) => {

    Post.find({
            user: req.user.id
        })
        .populate('category')
        .then(posts => {
            res.render('admin/posts/my-posts', {
                posts: posts
            })
        }).catch(error => {
            console.log(error);
        });
});

router.get('/create', (req, res) => {

    Category.find({}).then(categories => {
        res.render("admin/posts/create", {
            categories: categories
        });
    });

});

router.post('/create', (req, res) => {

    let errors = [];
    if (!req.body.title) {
        errors.push({
            message: 'please add a title'
        });
    }
    if (!req.body.body) {
        errors.push({
            message: 'please add a description'
        });
    }
    if (errors.length > 0) {
        res.render('admin/posts/create', {
            errors: errors
        })
    } else {

        let filename = '';
        if (!isEmpty(req.files)) {
            let file = req.files.file;
            //for having every file name different
            filename = Date.now() + '_' + file.name;

            file.mv('./public/uploads/' + filename, (err) => {
                if (err) throw err;
            });

        }
        let allowComments = true;
        if (req.body.allowComments) {
            allowComments = true;
        } else {
            allowComments = false;
        }
        const newPost = new Post({
            user: req.user.id,
            title: req.body.title,
            //status: req.body.status,
            allowComments: allowComments,
            body: req.body.body,
            file: filename,
            category: req.body.category
        });
        newPost.save().then(savedPost => {
            req.flash('success_message', `Post ${savedPost.title} was created successfully`);
            res.redirect('/admin/posts');
        }).catch(error => {
            console.log(error, "could not save");
        });
    }
});

//Edit
router.get('/edit/:id', (req, res) => {
    // res.send(req.params.id);
    //make a query to post out
    Post.findOne({
        _id: req.params.id
    }).then(post => {

        Category.find({}).then(categories => {
            res.render("admin/posts/edit", {
                post: post,
                categories: categories
            });
        });
    });

});

//updating post
router.put('/edit/:id', (req, res) => {

    Post.findOne({
            _id: req.params.id
        })
        .then(post => {
            if (req.body.allowComments) {
                allowComments = true;
            } else {
                allowComments = false;
            }

            post.user = req.user.id;
            post.title = req.body.title;
            // post.status = req.body.status;
            post.allowComments = allowComments;
            post.body = req.body.body;
            post.category = req.body.category;

            if (!isEmpty(req.files)) {
                let file = req.files.file;
                filename = Date.now() + '_' + file.name;
                post.file = filename;
                file.mv('./public/uploads/' + filename, (err) => {
                    if (err) throw err;
                });

            }

            post.save().then(updatedPost => {
                req.flash('success_message', 'Post was successfully updated');
                res.redirect('/admin/posts/my-posts');
            }).catch(error => {
                console.log(error);
            });

        });
    //res.send('It works');
});

// router.delete('/:id', (req, res) => {
//     Post.findOne({
//             _id: req.params.id
//         }).populate('comments')
//         .then(post => {

//             fs.unlink(uploadDir + post.file, (err) => {

//                 if (!post.comments.length < 1) {

//                     post.comments.forEach(comment => {
//                         comment.remove();
//                     });
//                 }

//                 post.remove().then(removedPost => {

//                     req.flash('success_message', 'Post was succesfully deleted');
//                     res.redirect('/admin/posts');
//                 });
//             });

//         });
// });

router.delete('/:id', (req, res) => {

    Post.findByIdAndDelete(req.params.id)
        .then((post) => {
            if (post.comments.length > 0) {
                Comment.deleteMany({
                    _id: {
                        $in: post.comments
                    }
                }).then(deletedComments => {
                    console.log(deletedComments)
                }).catch(err => {
                    console.log(err);
                });
            }

            fs.unlink(uploadDir + post.file, () => {
                req.flash('success_message', "Post was successfully deleted");
                res.redirect("/admin/posts/my-posts");
            });
        });
});
module.exports = router;