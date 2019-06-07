var express = require('express');
var router = express.Router();

var userController = require('../controllers/users');

router.get('/login', (req, res) => {
    req.session.returnURL = req.query.returnURL;
    res.render('login',{noHeader:"true",noFooter:"true"});
});

router.get('/signup', (req, res) => {
    res.render('signup',{noHeader:"true",noFooter:"true"});
});

router.get('/profile', userController.isLoggedIn, (req, res) => {
    res.render('profile');
});

router.get('/admin', userController.isAdmin, (req, res) => {
    res.render('admin');
});

router.post('/login', function(req, res) {
    var email = req.body.email;
    var password = req.body.password;

    userController.getUserByEmail(email, function(user) {
        if (!user) {
            res.render('login', { error: 'No email is found',noHeader:'true',noFooter:'true' });
        } else {
            userController.comparePassword(password, user.password, function(isMatch) {
                if (!isMatch) {
                    res.render('login', { error: 'Incorrect Password',noHeader:'true',noFooter:'true' });
                } else {
                    req.session.user = user;
                    if (req.session.returnURL) {
                        res.redirect(req.session.returnURL);
                    } else {
                        if (user.isAdmin === true) {
                            res.redirect('/users/admin');
                        } else {
                            res.redirect('/');
                        }
                    }
                }
            });
        }
    });
});

router.post('/signup', function(req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;

    req.checkBody('email', 'Please enter a valid email').isEmail();
    
    var errors = req.validationErrors();
    if (errors) {
        res.render('signup', { errors: errors,noHeader:'true',noFooter:'true' });
    } else {
        userController.getUserByEmail(email, function(user) {
            if (user) {
                res.render('signup', { error: `Email ${email} exists! Please choose another email.`,noHeader:'true',noFooter:'true' });
            } else {
                var user = {
                    name: name,
                    email: email,
                    password: password,
                    isAdmin: false
                };
                userController.createUser(user, function(err) {
                    if (err) throw err;
                    res.render('login', { success: 'You have registered, now please login',noHeader:'true',noFooter:'true' });
                });
            }
        });
    }
});

router.get('/logout', function(req, res) {
    req.session.user = null;
    res.redirect('/users/login');
});

module.exports = router;