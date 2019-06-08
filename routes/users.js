var express = require('express');
var router = express.Router();

var userController = require('../controllers/users');

router.get('/login', (req, res) => {
    req.session.returnURL = req.query.returnURL;
    res.render('login', {
        noHeader: "true",
        noFooter: "true",
        email: req.session.email,
        password: req.session.password
    });
});

router.get('/signup', (req, res) => {
    res.render('signup', {
        noHeader: "true",
        noFooter: "true"
    });
});

router.get('/profile', userController.isLoggedIn, (req, res) => {
    res.render('profile');
});


let allusers = require('../controllers/users');
let allvisit = require('../controllers/logvisit');
let allbooking = require('../controllers/transaction');

//query chartjs with datefrom and date
router.get('/admin/refresh', userController.isAdmin, function (req, res) {
    parts = req.query.datefrom.split('/');

    datefrom = new Date(parts[2], parts[0] - 1, parts[1]);

    parts = req.query.dateto.split('/');

    dateto = new Date(parts[2], parts[0] - 1, parts[1]);

    res.locals.datefrom = datefrom.toDateString();
    res.locals.dateto = dateto.toDateString();

    req.session.datefrom = datefrom;
    req.session.dateto = dateto;
    req.session.loadBetweenDate = true;

    if (datefrom > dateto) {
        res.redirect("/admin");
    } else {
        allusers.getAllWithDate(datefrom, dateto, results => {
            res.locals.numSignUp = Object.keys(results).length;
            allvisit.getAllWithDate(datefrom, dateto, results => {
                res.locals.numVisit = Object.keys(results).length;
                allbooking.getAllBetweenDate(datefrom, dateto, results => {
                    res.locals.numBooking = Object.keys(results).length;
                    allbooking.getAllMoneyBetweenDate(datefrom, dateto, results => {
                        var num = Object.keys(results).length;
                        var sum = 0;
                        for (i = 0; i < num; i++) {
                            sum = sum + results[i].dataValues.Chuyen.dataValues.gia;
                            //console.log(results[i].dataValues.Chuyen.dataValues.gia);
                        }
                        res.locals.revenue = sum;
                        res.render('admin');
                    })

                })

            })

        })
    }

});




router.get('/admin', userController.isAdmin, (req, res) => {
    allusers.getAll(results => {
        res.locals.numSignUp = Object.keys(results).length;
        allvisit.getAll(results => {
            res.locals.numVisit = Object.keys(results).length;
            allbooking.getAll(results => {
                res.locals.numBooking = Object.keys(results).length;
                allbooking.getAllMoney(results => {
                    var num = Object.keys(results).length;
                    var sum = 0;
                    for (i = 0; i < num; i++) {
                        sum = sum + results[i].dataValues.Chuyen.dataValues.gia;
                        //console.log(results[i].dataValues.Chuyen.dataValues.gia);
                    }
                    res.locals.revenue = sum;
                    req.session.loadBetweenDate = false;
                    res.render('admin');
                })

            })

        })

    })
});

router.get('/transaction', userController.isAdmin, (req, res) => {
    res.render('transaction');
});

router.get('/masterdata', userController.isAdmin, (req, res) => {
    res.render('masterdata');
});

router.post('/login', function (req, res) {
    var email = req.body.email;
    var password = req.body.password;
    var remember = req.body.remember;

    if (remember) {
        req.session.email = email;
        req.session.password = password;
    } else {
        req.session.email = null;
        req.session.password = null;
    }

    userController.getUserByEmail(email, function (user) {
        if (!user) {
            res.render('login', {
                error: 'No email is found',
                noHeader: 'true',
                noFooter: 'true'
            });
        } else {
            userController.comparePassword(password, user.password, function (isMatch) {
                if (!isMatch) {
                    res.render('login', {
                        error: 'Incorrect Password',
                        noHeader: 'true',
                        noFooter: 'true'
                    });
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

router.post('/signup', function (req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;

    req.checkBody('email', 'Please enter a valid email').isEmail();

    var errors = req.validationErrors();
    if (errors) {
        res.render('signup', {
            errors: errors,
            noHeader: 'true',
            noFooter: 'true'
        });
    } else {
        userController.getUserByEmail(email, function (user) {
            if (user) {
                res.render('signup', {
                    error: `Email ${email} exists! Please choose another email.`,
                    noHeader: 'true',
                    noFooter: 'true'
                });
            } else {
                var user = {
                    name: name,
                    email: email,
                    password: password,
                    isAdmin: false
                };
                userController.createUser(user, function (err) {
                    if (err) throw err;
                    res.render('login', {
                        success: 'You have registered, now please login',
                        noHeader: 'true',
                        noFooter: 'true'
                    });
                });
            }
        });
    }
});


router.get('/logout', function (req, res) {
    req.session.user = null;

    res.redirect('/users/login');
});

module.exports = router;