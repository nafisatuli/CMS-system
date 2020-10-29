"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema; //slug for url

var URLSlugs = require('mongoose-url-slugs');

var PostSchema = new Schema({
  //user for post
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'categories'
  },
  title: {
    type: String,
    required: true
  },
  slug: {
    type: String
  },
  status: {
    type: String,
    "default": 'public'
  },
  allowComments: {
    type: Boolean,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  file: {
    type: String
  },
  date: {
    type: Date,
    "default": Date.now()
  },
  comments: [{
    //keeping all the ids of the comments in array
    type: Schema.Types.ObjectId,
    ref: 'comments'
  }]
}, {
  usePushEach: true
}); //mongoose plugin
//1st parameter is where we need to pull data form
//2nd parameter is where data is going to modify

PostSchema.plugin(URLSlugs('title', {
  field: 'slug'
}));
module.exports = mongoose.model('posts', PostSchema);