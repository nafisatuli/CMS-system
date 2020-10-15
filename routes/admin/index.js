const express = require('express');
const {
    route
} = require('../home');
const router = express.Router();
const faker = require('faker');
const Post = require('../../models/Post');

const {
    userAuthenticated
} = require('../../helpers/authentication');

//override default layout
//by /* it  is affecting after admin,anything after admin;
router.all('/*', userAuthenticated, (req, res, next) => {
    req.app.locals.layout = 'admin';
    next();
});


router.get('/', (req, res) => {
    res.render('admin/index');
});

//here we dont have to get /admin bcz in the middleware we already told this
//if here another routes client so it will be admin/client already

//for dummy data creation
router.post('/generate-fake-posts', (req, res) => {

    for (let i = 0; i < req.body.amount; i++) {
        let post = new Post();
        post.title = faker.name.title();
        post.status = 'public';
        post.allowComments = faker.random.boolean();
        post.body = faker.lorem.sentence();
        post.save(function (err) {
            if (err) throw err;
        });

    }

    res.redirect('/admin/posts');
});


module.exports = router;