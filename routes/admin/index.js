const express = require('express');
const router = express.Router();


//override default layout
//by /* it  is affecting after admin,anything after admin;
router.all('/*', (req, res, next) => {
    req.app.locals.layout = 'admin';
    next();
});


router.get('/', (req, res) => {
    res.render('admin/index');
});

//here we dont have to get /admin bcz in the middleware we already told this
//if here another routes client so it will be admin/client already


router.get('/dashboard', (req, res) => {
    res.render('admin/dashboard');
});


module.exports = router;