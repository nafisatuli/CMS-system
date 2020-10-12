const express = require('express');
const router = express.Router();
//bring post
const Post = require('../../models/Post');
const Category = require('../../models/Category');

router.all('/*', (req, res, next) => {
    req.app.locals.layout = 'home';
    next();
});


router.get('/', (req, res) => {

    //find all post
    Post.find({}).then(posts => {


        Category.find({}).then(categories => {
            res.render('home/index', {
                posts: posts,
                categories: categories
            });
        });
    });

});
router.get('/about', (req, res) => {
    res.render('home/about');
});

//create route for login and register
router.get('/login', (req, res) => {
    res.render('home/login');
});

router.get('/register', (req, res) => {
    res.render('home/register');
});

router.get('/post/:id', (req, res) => {

    Post.findOne({
            _id: req.params.id
        })
        .then(post => {

            Category.find({}).then(categories => {

                res.render('home/post', {
                    post: post,
                    categories: categories
                });
            });

        })
});


module.exports = router;