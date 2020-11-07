"use strict";

var express = require('express');

var router = express.Router();

var Todo = require('../../models/Todo');

var _require = require('../../helpers/authentication'),
    userAuthenticated = _require.userAuthenticated;

router.all('/*', userAuthenticated, function (req, res, next) {
  req.app.locals.layout = 'admin';
  next();
});
router.get('/', function (req, res) {
  Todo.find({
    user: req.user.id
  }).populate('user').then(function (todos) {
    res.render('admin/todos/index', {
      todos: todos
    });
  });
});
router.post('/create', function (req, res) {
  var newTodo = Todo({
    user: req.user.id,
    name: req.body.name
  });
  newTodo.save().then(function (savedTodo) {
    res.redirect('/admin/todos');
  });
});
router.get('/edit/:id', function (req, res) {
  Todo.findOne({
    _id: req.params.id
  }).then(function (todo) {
    res.render('admin/todos/edit', {
      todo: todo
    });
  });
});
router.put('/edit/:id', function (req, res) {
  Todo.findOne({
    _id: req.params.id
  }).then(function (todo) {
    todo.name = req.body.name;
    todo.save().then(function (savedTodo) {
      res.redirect('/admin/todos');
    });
  });
});
router["delete"]('/:id', function (req, res) {
  Todo.deleteOne({
    _id: req.params.id
  }).then(function (result) {
    res.redirect('/admin/todos');
  });
});
module.exports = router;