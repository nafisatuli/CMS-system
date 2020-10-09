const express = require('express');
const app = express();
const path = require('path');
const expressHbrs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const {
    allowInsecurePrototypeAccess
} = require('@handlebars/allow-prototype-access');
const Handlebars = require('handlebars');


mongoose.Promise = global.Promise;


//mongoose connect
mongoose.connect('mongodb://localhost:27017/cms', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(db => console.log("Mongo Connected")).catch(error => console.log("Could not connect" + error));


app.use(express.static(path.join(__dirname, 'public'))); //for using static files

//register handlebars-helpers function
const {
    select
} = require('./helpers/handlebars-helpers');


//engine
app.engine('handlebars', expressHbrs({
    defaultLayout: 'home',
    helpers: {
        select: select
    },
    handlebars: allowInsecurePrototypeAccess(Handlebars),
}));
app.set('view engine', 'handlebars');

//Body Parser
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//Method Override
app.use(methodOverride('_method'));


//load Routes
//main routes
//we exports out main routes here
const home = require('./routes/home/index');

//require admin
const admin = require('./routes/admin/index');
const posts = require('./routes/admin/posts');


//Use Routes
//let application know about main.js router by Middleware
app.use('/', home); //all functionality going to be here
app.use('/admin', admin);
app.use('/admin/posts', posts);

//listen to the port
app.listen(4500, () => {
    console.log(`listening on port 4500`);
});