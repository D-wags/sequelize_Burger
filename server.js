//dependencies
var express = require('express');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var app = express();
var PORT = 3000;

//serve as static
app.use(express.static('public'));


app.use(bodyParser.urlencoded({
	extended: false
}));

app.use(methodOverride('_method'));

//require handlebars
var exphbs = require('express-handlebars');

//use handlebars engine as template engine, use 'main' as our base file
app.engine('handlebars', exphbs({
	defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//link to burger controller
var routes = require('./controllers/burgers_controllers.js');
app.use('/', routes);

//listen on port, if undefined, use 3000
app.listen(process.env.NODE_ENV || 3000, function() {
	console.log("RUNNING")
});