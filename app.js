const express = require('express');
const app = express();
const path = require('path');
const expressHbrs = require('express-handlebars');

app.use(express.static(path.join(__dirname, 'public'))); //for using static files

//engine
app.engine('handlebars', expressHbrs({
    defaultLayout: 'home'
}));
app.set('view engine', 'handlebars');

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