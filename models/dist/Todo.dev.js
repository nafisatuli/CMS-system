"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var TodoSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    "default": Date.now()
  }
});
module.exports = mongoose.model('todos', TodoSchema);