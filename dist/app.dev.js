"use strict";

var express = require('express');

var app = express();

var path = require('path');

var expressHbrs = require('express-handlebars');

var mongoose = require('mongoose');

var bodyParser = require('body-parser');

var methodOverride = require('method-override');

var upload = require('express-fileupload');

var _require = require('./config/database'),
    mongoDbUrl = _require.mongoDbUrl;

var passport = require('passport');

var _require2 = require('@handlebars/allow-prototype-access'),
    allowInsecurePrototypeAccess = _require2.allowInsecurePrototypeAccess;

var Handlebars = require('handlebars'); //for flash msg


var session = require('express-session');

var flash = require('connect-flash');

mongoose.Promise = global.Promise; //mongoose connect

mongoose.connect(mongoDbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(function (db) {
  return console.log("Mongo Connected");
})["catch"](function (error) {
  return console.log("Could not connect" + error);
});
app.use(express["static"](path.join(__dirname, 'public'))); //for using static files
//register handlebars-helpers function

var _require3 = require('./helpers/handlebars-helpers'),
    select = _require3.select,
    generateDate = _require3.generateDate,
    paginate = _require3.paginate; //engine


app.engine('handlebars', expressHbrs({
  defaultLayout: 'home',
  helpers: {
    select: select,
    generateDate: generateDate,
    paginate: paginate
  },
  handlebars: allowInsecurePrototypeAccess(Handlebars)
}));
app.set('view engine', 'handlebars'); //Upload Middleware

app.use(upload()); //Body Parser

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json()); //Method Override

app.use(methodOverride('_method')); //Session

app.use(session({
  secret: 'nafisahasan',
  resave: true,
  saveUninitialized: true
}));
app.use(flash()); //passport

app.use(passport.initialize());
app.use(passport.session()); //set up local variables using middleware for handlebars

app.use(function (req, res, next) {
  res.locals.user = req.user || null;
  res.locals.success_message = req.flash('success_message');
  res.locals.error_message = req.flash('error_message');
  res.locals.error = req.flash('error');
  next();
}); //load Routes
//main routes
//we exports out main routes here

var home = require('./routes/home/index'); //require admin


var admin = require('./routes/admin/index');

var posts = require('./routes/admin/posts');

var categories = require('./routes/admin/categories');

var comments = require('./routes/admin/comments');

var todos = require('./routes/admin/todos'); //Use Routes
//let application know about main.js router by Middleware


app.use('/', home); //all functionality going to be here

app.use('/admin', admin);
app.use('/admin/posts', posts);
app.use('/admin/categories', categories);
app.use('/admin/comments', comments);
app.use('/admin/todos', todos); //listen to the port

app.listen(4500, function () {
  console.log("listening on port 4500");
});