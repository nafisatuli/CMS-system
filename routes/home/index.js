const express = require('express');
const router = express.Router();
//bring post
const Post = require('../../models/Post');
const Category = require('../../models/Category');
const User = require('../../models/User');

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

//for user registration

router.post('/register', (req, res) => {

    //validation in server
    let errors = [];
    const newUser = new User({

        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,

    });

    if (!req.body.firstName) {
        errors.push({
            message: 'please add a first name'
        });
    }
    if (!req.body.lastName) {
        errors.push({
            message: 'please add a last name'
        });
    }
    if (!req.body.email) {
        errors.push({
            message: 'please add an email'
        });
    }
    if (!req.body.password) {
        errors.push({
            message: 'please enter a password'
        });
    }
    if (!req.body.passwordConfirm) {
        errors.push({
            message: 'please confirm password'
        });
    }

    if (req.body.password !== req.body.passwordConfirm) {
        errors.push({
            message: 'Password did not match'
        });
    }


    if (errors.length > 0) {
        res.render('home/register', {
            errors: errors
        });
    } else {
        res.send('Data is good');
    }

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