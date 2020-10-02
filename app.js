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

//main routes
//we exports out main routes here
const main = require('./routes/home/main');

//let application know about main.js router by Middleware
app.use('/', main); //all functionality going to be here



//listen to the port
app.listen(4500, () => {
    console.log(`listening on port 4500`);
});