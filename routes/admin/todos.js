const express = require('express');
const router = express.Router();
const Todo = require('../../models/Todo');

const {
    userAuthenticated
} = require('../../helpers/authentication');

router.all('/*', userAuthenticated, (req, res, next) => {
    req.app.locals.layout = 'admin';
    next();
});

router.get('/', (req, res) => {
    Todo.find({
            user: req.user.id
        }).populate('user')
        .then(todos => {
            res.render('admin/todos/index', {
                todos: todos
            });
        });
});

router.post('/create', (req, res) => {
    const newTodo = Todo({
        user: req.user.id,
        name: req.body.name
    });
    newTodo.save().then(savedTodo => {
        res.redirect('/admin/todos');
    });
});


router.get('/edit/:id', (req, res) => {
    Todo.findOne({
        _id: req.params.id
    }).then(todo => {
        res.render('admin/todos/edit', {
            todo: todo
        });
    });
});

router.put('/edit/:id', (req, res) => {
    Todo.findOne({
        _id: req.params.id
    }).then(todo => {

        todo.name = req.body.name;
        todo.save().then(savedTodo => {
            res.redirect('/admin/todos');
        });
    });
});

router.delete('/:id', (req, res) => {
    Todo.deleteOne({
        _id: req.params.id
    }).then(result => {
        res.redirect('/admin/todos');
    });
});

module.exports = router;