"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var CommentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  body: {
    type: String,
    required: true
  },
  approveComment: {
    type: Boolean
  },
  date: {
    type: Date,
    "default": Date.now()
  }
});
module.exports = mongoose.model('comments', CommentSchema);