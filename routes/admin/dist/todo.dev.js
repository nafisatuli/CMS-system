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
  Todo.find({}).then(function (todos) {
    res.render('admin/todos/index', {
      todos: todos
    });
  });
});
router.post('/create', function (req, res) {
  var newTodo = Todo({
    name: req.body.name,
    date: req.body.date
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
  }).then(function (category) {
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