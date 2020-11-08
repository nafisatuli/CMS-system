const express = require('express');
const app = express();
const path = require('path');
const expressHbrs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const upload = require('express-fileupload');

const {
    mongoDbUrl
} = require('./config/database');

const passport = require('passport');

const {
    allowInsecurePrototypeAccess
} = require('@handlebars/allow-prototype-access');
const Handlebars = require('handlebars');

//for flash msg
const session = require('express-session');
const flash = require('connect-flash');


mongoose.Promise = global.Promise;

//mongoose connect
mongoose.connect(mongoDbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(db => console.log("Mongo Connected")).catch(error => console.log("Could not connect" + error));


app.use(express.static(path.join(__dirname, 'public'))); //for using static files

//register handlebars-helpers function
const {
    select,
    generateDate,
    paginate
} = require('./helpers/handlebars-helpers');
//engine
app.engine('handlebars', expressHbrs({
    defaultLayout: 'home',
    helpers: {
        select: select,
        generateDate: generateDate,
        paginate: paginate
    },
    handlebars: allowInsecurePrototypeAccess(Handlebars),
}));
app.set('view engine', 'handlebars');

//Upload Middleware
app.use(upload());

//Body Parser
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//Method Override
app.use(methodOverride('_method'));

//Session
app.use(session({
    secret: 'nafisahasan',
    resave: true,
    saveUninitialized: true
}));
app.use(flash());

//passport
app.use(passport.initialize());
app.use(passport.session());

//set up local variables using middleware for handlebars
app.use((req, res, next) => {

    res.locals.user = req.user || null;

    res.locals.success_message = req.flash('success_message');
    res.locals.error_message = req.flash('error_message');

    res.locals.error = req.flash('error');
    next();
});

//load Routes
//main routes
//we exports out main routes here
const home = require('./routes/home/index');
//require admin
const admin = require('./routes/admin/index');
const posts = require('./routes/admin/posts');
const categories = require('./routes/admin/categories');
const comments = require('./routes/admin/comments');
const todos = require('./routes/admin/todos');

//Use Routes
//let application know about main.js router by Middleware
app.use('/', home); //all functionality going to be here
app.use('/admin', admin);
app.use('/admin/posts', posts);
app.use('/admin/categories', categories);
app.use('/admin/comments', comments);
app.use('/admin/todos', todos);

//listen to the port
app.listen(4500, () => {
    console.log(`listening on port 4500`);
});