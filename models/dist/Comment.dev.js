"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var CommentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    req: 'users',
    required: true
  },
  body: {
    type: String,
    required: true
  }
});
module.exports = mongoose.model('comments', CommentSchema);