var express = require('express');
var app = express();

// Setting for app here

// Set Public Folder
app.use(express.static(__dirname + '/public'));

// Use View Engine
var expressHbs = require('express-handlebars');
var hbs = expressHbs.create({
	extname			: 'hbs',
	defaultLayout	: 'layout', 
	layoutsDir		: __dirname + '/views/layouts/',
	partialsDir		: __dirname + '/views/partials/',
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

// Set Server Port & Start Server
app.set('port', (process.env.PORT || 5000));

// Create database
var models = require('./models');
app.get('/sync', function(req, res){
	models.sequelize.sync().then(function(){
		res.send('database sync completed!');
	});
});



// Define your route here
// Test view render

var indexRouter = require('./routes/index');
app.use('/',indexRouter);

app.get('/login', function(req, res){
	res.render('login');
});

app.get('/admin', function(req, res){
	res.render('admin');
});

app.get('/detail', function(req, res){
	res.render('detail');
});

app.get('/contact', function(req, res){
	res.render('contact');
});

app.get('/signup', function(req, res){
	res.render('signup');
});

app.get('/masterdata', function(req, res){
	res.render('masterdata');
});

app.get('/transaction', function(req, res){
	res.render('transaction');
});

app.get('/profile', function(req, res){
	user={
		name:"Lê Thành Công",
		avatarlink:"/img/user/user.jpg"
	}
	res.render('profile',user);
});

app.listen(app.get('port'), function(){
	console.log('Server is listening at port ' + app.get('port'));
});