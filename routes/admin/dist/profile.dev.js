"use strict";

var express = require('express');

var router = express.Router();

var User = require('../../models/User');

router.all('/*', function (req, res, next) {
  req.app.locals.layout = 'admin';
  next();
});
router.get('/', function (req, res) {
  res.render('admin/profile');
});
module.exports = router;