"use strict";

var express = require('express');

var router = express.Router();

var Category = require('../../models/Category');

var _require = require('../../helpers/authentication'),
    userAuthenticated = _require.userAuthenticated;

router.all('/*', userAuthenticated, function (req, res, next) {
  req.app.locals.layout = 'admin';
  next();
});
router.get('/', function (req, res) {
  Category.find({}).then(function (categories) {
    res.render('admin/categories/index', {
      categories: categories
    });
  });
});
router.post('/create', function (req, res) {
  var newCategory = Category({
    name: req.body.name
  });
  newCategory.save().then(function (savedCategory) {
    res.redirect('/admin/categories');
  });
});
router.get('/edit/:id', function (req, res) {
  Category.findOne({
    _id: req.params.id
  }).then(function (category) {
    res.render('admin/categories/edit', {
      category: category
    });
  });
});
router.put('/edit/:id', function (req, res) {
  Category.findOne({
    _id: req.params.id
  }).then(function (category) {
    category.name = req.body.name;
    category.save().then(function (savedCategory) {
      res.redirect('/admin/categories');
    });
  });
});
router["delete"]('/:id', function (req, res) {
  Category.deleteOne({
    _id: req.params.id
  }).then(function (result) {
    res.redirect('/admin/categories');
  });
});
module.exports = router;