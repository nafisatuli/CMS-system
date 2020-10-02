const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.render('admin/index');
});

//here we dont have to get /admin bcz in the middleware we already told this
//if here another routes client so it will be admin/client already


module.exports = router;