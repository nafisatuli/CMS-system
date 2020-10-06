const express = require('express');
const router = express.Router();


router.all('/*', (req, res, next) => {
    req.app.locals.layout = 'admin';
    next();
});

//by default it it /admin/posts
router.get('/', (req, res) => {
    res.send('It works');
});



router.get('/create', (req, res) => {

    res.render("admin/posts/create");
});

router.post('/create', (req, res) => {
    console.log(req.body);
    //res.send("Worked");
});

module.exports = router;