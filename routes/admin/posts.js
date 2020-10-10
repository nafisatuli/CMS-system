const express = require('express');
const router = express.Router();
//model
const Post = require('../../models/Post');
const {
    route
} = require('../home');
const {
    isEmpty,
    uploadDir
} = require('../../helpers/upload-helpers');
const fs = require('fs'); //for file system


router.all('/*', (req, res, next) => {
    req.app.locals.layout = 'admin';
    next();
});

//by default it it /admin/posts
router.get('/', (req, res) => {
    //before render we need to get data
    //passing nothing is gonna bring everything
    Post.find({}).then(posts => {
        res.render('admin/posts', {
            posts: posts
        })
    }).catch(error => {
        console.log(error);
    });
    //res.render('admin/posts');
});



router.get('/create', (req, res) => {

    res.render("admin/posts/create");
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
            title: req.body.title,
            status: req.body.status,
            allowComments: allowComments,
            body: req.body.body,
            file: filename
        });
        newPost.save().then(savedPost => {
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
        res.render('admin/posts/edit', {
            post: post
        })
    });

    //res.render('admin/posts/edit');
});

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

            post.title = req.body.title;
            post.status = req.body.status;
            post.allowComments = allowComments;
            post.body = req.body.body;

            post.save().then(updatedPost => {
                res.redirect('/admin/posts');
            }).catch(error => {
                console.log(error);
            });

        });
    //res.send('It works');
});

router.delete('/:id', (req, res) => {
    Post.findOne({
        _id: req.params.id
    }).then(post => {

        fs.unlink(uploadDir + post.file, (err) => {
            post.remove();
            res.redirect('/admin/posts');
        });
    }).catch(error => {
        console.log(error);
    });
});

module.exports = router;