"use strict";

var express = require('express');

var router = express.Router();

var feedbackData = require('../../data/feedback.json');

router.get('/', function (req, res) {
  res.json(feedbackData);
});
module.exports = router;