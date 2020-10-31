const express = require('express');
const {
    route
} = require('../home');
const router = express.Router();
const faker = require('faker');
const Post = require('../../models/Post');
const Comment = require('../../models/Comment');
const Category = require('../../models/Category');

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

    //need to count data for admin dashboard
    Post.countDocuments({}).then(postCount => {
        Comment.countDocuments({}).then(commentCount => {

            Category.countDocuments({}).then(categoryCount => {

                res.render('admin/index', {
                    postCount: postCount,
                    commentCount: commentCount,
                    categoryCount: categoryCount
                });
            });
        });
    });
    //res.render('admin/index');
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
        post.slug = faker.name.title();
        post.save(function (err) {
            if (err) throw err;
        });

    }

    res.redirect('/admin/posts');
});


module.exports = router;