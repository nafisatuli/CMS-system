const express = require('express');
const router = express.Router();
//model
const Post = require('../../models/Post');
const {
    route
} = require('../home');

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

    //res.send('worked');
    //console.log(req.body);
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
        body: req.body.body
    });
    newPost.save().then(savedPost => {
        res.redirect('/admin/posts');
    }).catch(error => {
        console.log("could not save");
    });
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

    res.send('It works');
});

module.exports = router;