const express = require('express');
const router = express.Router();
const Category = require('../../models/Category');


router.all('/*', (req, res, next) => {
    req.app.locals.layout = 'admin';
    next();
});


router.get('/', (req, res) => {

    Category.find({}).then(categories => {
        res.render('admin/categories/index', {
            categories: categories
        });
    });
});

router.post('/create', (req, res) => {

    const newCategory = Category({

        name: req.body.name
    });
    newCategory.save().then(savedCategory => {

        res.redirect('/admin/categories');
    });
});



module.exports = router;