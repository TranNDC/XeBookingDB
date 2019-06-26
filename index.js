var express = require('express');
var app = express();
var expressHbs = require('express-handlebars');
var paginateHelper = require('express-handlebars-paginate');
const methodOverride = require('method-override');

// Set Public Folder
app.use(express.static(__dirname + '/public'));
// Use View Engine
var expressHbs = require('express-handlebars');
var hbs = expressHbs.create({
	extname			: 'hbs',
	defaultLayout	: 'layout', 
	layoutsDir		: __dirname + '/views/layouts/',
	partialsDir		: __dirname + '/views/partials/',
	helpers: {
        paginate: paginateHelper.createPagination,
    }

});

app.use(methodOverride('_method'));

hbs.handlebars.registerHelper('paginateHelper',paginateHelper.createPagination);

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

// Set Server Port & Start Server
app.set('port', (process.env.PORT || 5000));

// Create database
var models = require('./models');
app.get('/sync', function (req, res) {
	models.sequelize.sync().then(function () {
		res.send('database sync completed!');
	});
});

//use body parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
	extended: true
}));


// use session
var session = require('express-session');
app.use(session({
	cookie: {
		httpOnly: true,
		maxAge: 5 * 60 * 1000
	}, //5 min
	secret: 'Secret',
	saveUninitialized: false,
	resave: false
}));

//use express validator
var expressValidator = require('express-validator');
app.use(expressValidator());

app.use(function (req, res, next) {
	res.locals.user = req.session.user;
	res.locals.isLoggedIn = req.session.user ? true : false;
	next();
});

var indexRouter = require('./routes/index');
app.use('/', indexRouter);

var fotgotpassRouter = require('./routes/forgotpass');
app.use('/forgotpass', fotgotpassRouter);

var paymentRouter = require('./routes/payment');
app.use('/payment', paymentRouter);

var userRouter = require('./routes/users');
app.use('/users', userRouter);

var userRouter = require('./routes/charts');
app.use('/charts', userRouter);

app.get('/login', function (req, res) {
	res.redirect('users/login');
});

app.get('/admin', function (req, res) {
	res.redirect('users/admin');
});


app.get('/contact', function (req, res) {
	res.render('contact');
});

app.get('/signup', function (req, res) {
	res.redirect('users/signup');
});

app.get('/transaction', function (req, res) {
	res.redirect('users/transaction');
});

app.get('/profile', function (req, res) {
	res.redirect('users/profile');
});

app.get('/masterdata', function (req, res) {
	res.redirect('users/masterdata');
});

app.listen(app.get('port'), function () {
	console.log('Server is listening at port ' + app.get('port'));
});