var express = require('express');
var router = express.Router();

var userController = require('../controllers/users');
var controllerDiaDiem = require('../controllers/diadiem');
var controllerKhuyenMai = require('../controllers/khuyenmai');
var controllerChuyen = require('../controllers/chuyen');
var controllerTransaction = require('../controllers/transaction');


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

var userRouter = require('./profile');
router.use('/profile', userRouter);



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
    controllerTransaction.getTransactions((Transactions)=>{
       
        var order = req.query.order;
        if (!order){
            order= "time_desc";
        }
        let tmp = order.split('_');
        filterFunc(req, res, Transactions);
        sort(tmp[0],tmp[1]=='asc',Transactions);
        var page = parseInt(req.query.page);
        var limit = 13;
        page = isNaN(page) ? 1 : page;
        let numPage = Math.ceil(Transactions.length / limit);
        page = (page<=numPage&&page>=1)?page:numPage;
        var pagination = {
            limit: limit,
            page: page,
            totalRows: Transactions.length
        }
        var offset = (page - 1) * limit;
    
        res.locals.Transactions = Transactions.slice(offset, offset + limit);;
        res.locals.pagination = pagination;
        res.locals.hasPagination = (pagination.totalRows / limit > 1);
        controllerDiaDiem.getAll(function (stations) {
            res.locals.stations = stations;
            res.render('transaction');
        })
    })

});


router.get('/history', userController.isLoggedIn, (req, res) => {
    res.locals.isInfo= false
    controllerTransaction.searchUser(res.locals.user.id, (Transactions)=>{

        var page = parseInt(req.query.page);
        var limit = 9;
        page = isNaN(page) ? 1 : page;
        let numPage = Math.ceil(Transactions.length / limit);
        page = (page<=numPage&&page>=1)?page:numPage;
        var pagination = {
            limit: limit,
            page: page,
            totalRows: Transactions.length
        }
        var offset = (page - 1) * limit;
    
        var order = req.query.order;
        if (!order){
            order= "departure_asc";
        }
        let tmp = order.split('_');
        sort(tmp[0],tmp[1]=='asc',Transactions);
        res.locals.Transactions = Transactions.slice(offset, offset + limit);;
        // res.locals.Transactions = Transactions;
        res.locals.pagination = pagination;
    res.locals.hasPagination = (pagination.totalRows / limit > 1);
        res.render('profile');
    })
});



let allchuyen = require('../controllers/chuyen');
router.get('/masterdata', userController.isAdmin, (req, res) => {
    let page = req.query.page || 1;
    let limit = 7;
    allchuyen.getAllForMasterdata(page,limit,results => {
        res.locals.results = results.rows;
        //res.send(results[0]);
        res.locals.pagination={
            page:parseInt(page),
            limit:7,
            totalRows:results.count
        }
        res.render('masterdata');
        
    });
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

var hbs = require('handlebars');


hbs.registerHelper("getDay", function (value, options) {
    let date = new Date(value);
    var options = {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    };
    return date.toLocaleString('en-US', options);
});

hbs.registerHelper("getTime", function (value, options) {
    let date = new Date(value);
    var options = {
        hour12: false,
        hour: 'numeric',
        minute: 'numeric'
    };
    return date.toLocaleString('en-US', options);
});

hbs.registerHelper("checkStatus", function (value, options) {
    return value!=null;
});

hbs.registerHelper("getTotal", function (price, tds, voucher, options) {
    let pc = 0;
    if (voucher) pc = voucher.phanTram;
    
    return (Math.ceil((1-pc/100)*price))*tds.length;
});

hbs.registerHelper("getArrival", function (departure, time, options) {
    let date = new Date(departure.getTime() + time * 60000);
    var options = {
        hour12: false,
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    };
    return date.toLocaleString('en-US', options);
});

hbs.registerHelper("getSeats", function (details, options) {
    let res =[];
    details.forEach(element => {
        res.push(element.viTriGheDat);
    });
    return res.join(', ')
});

hbs.registerHelper("inc", function (x, options) {

    return ++x;
});



function getData(type, transaction){
    switch (type) {
        case 'licensePlate': {
            return (transaction.Chuyen.Xe.bienso)
        }
        case 'transactionid': {
            return (transaction.id)
        }
        case 'busid': {
            return (transaction.Chuyen.Xe.id)
        }
        case 'userphone': {
            return (transaction.sdt)
        }
        case 'userid': {
            return (transaction.User.id)
        }
        case 'time': {
            return (transaction.createdAt)
        }
        case 'departure': {
            let date = new Date(transaction.Chuyen.ngayGioKhoiHanh);
            return (date.getHours()*60 + date.getMinutes())
        }
        case 'price': {
            let km =1;
            if (transaction.KhuyenMai) km =1- transaction.KhuyenMai.phanTram /100;
            return (transaction.Chuyen.gia*km * transaction.TransactionDetails.length);
        }
        case 'status': {
            return (transaction.PaymentDetail?transaction.PaymentDetail.createdAt:0)
        }

        default:
            break;
    }
}


function sort(type, isAsc, Transactions){
    let n = Transactions.length;

    for (let i = 0; i<n ; i++){
        for (let j=0; j<i; j++){
            let xi = getData(type,Transactions[i]);
            let xj = getData(type,Transactions[j]);
            if (!isAsc?xi>xj:xi<xj){
                let tmp = Transactions[i];
                Transactions[i] = Transactions[j];
                Transactions[j] = tmp;
            }
        }
    }
}


function filterFunc(req, res, Chuyens) {
    let departureRange = [req.query.departure_min, req.query.departure_max];
    let transactionRange = [req.query.transaction_min, req.query.transaction_max];
    let phone = req.query.phone;
    let palaceLiscene = req.query.palaceLiscene;
    let xuatphat = req.query.from;
    let ketthuc = req.query.to;


    let foundEr = true;
    while (foundEr) {
        foundEr = false;
        Chuyens.forEach((item, index, object) => {
            departureRange = [req.query.departure_min, req.query.departure_max];
            if (!filerTransaction(transactionRange,departureRange,phone,palaceLiscene,xuatphat,ketthuc,item)) {
                object.splice(index, 1);
                foundEr = true;
            }
        });
    }
}

function filterTransactionRange(transactionRange, transaction){
    if (transactionRange[0]){
        transactionRange[0] = new Date(transactionRange[0]);
        transactionRange[0].setHours(0);
        transactionRange[0].setMinutes(0);
        transactionRange[0].setSeconds(0);
        
        if (transaction.createdAt < transactionRange[0]) return false;
    }
    if (transactionRange[1]){
        
        transactionRange[1] = new Date(transactionRange[1]);
        transactionRange[1].setHours(23);
        transactionRange[1].setMinutes(59);
        transactionRange[1].setSeconds(59);
        if (transaction.createdAt > transactionRange[1]) return false;
    }
    return true;
}

function filterDeparture(departureRange,transaction){
    let date = transaction.Chuyen.ngayGioKhoiHanh;
    if (departureRange[0]){
        departureRange[0] = new Date(departureRange[0]);
        if (date < departureRange[0]) return false;
    }
    if (departureRange[1]){
        departureRange[1] = new Date(departureRange[1]);
        if (date > departureRange[1]) return false;
    }
    return true;
}
function filterPhone(phone,transaction) {
    if (!phone) return true;
    phone = phone.trim();
    let tphone = transaction.sdt.trim();
    return tphone.search(phone) >=0;
}

function filterPalaceLiscene(palaceLiscene,transaction) {
    if (!palaceLiscene) return true;
    palaceLiscene = palaceLiscene.trim();
    let tphone = transaction.Chuyen.Xe.bienso.trim();
    return tphone.search(palaceLiscene) >=0;
}
function filterXuatphat(ten,transaction) {
    if (!ten) return true;
    ten = ten.trim();
    let tphone = transaction.Chuyen.Tuyen.xuatphat.ten.trim();
    return tphone.search(ten) >= 0;
}
function filterKetthuc(ten,transaction) {
    if (!ten) return true;
    ten = ten.trim();
    let tphone = transaction.Chuyen.Tuyen.ketthuc.ten.trim();
    return tphone.search(ten) >=0;
}



function filerTransaction(transactionRange,departureRange,phone,palaceLiscene,xuatphat,ketthuc,transaction) {
    return filterDeparture(departureRange,transaction)&&
    filterTransactionRange(transactionRange,transaction)&&
    filterKetthuc(ketthuc,transaction)&&
    filterXuatphat(xuatphat,transaction)&&
    filterPhone(phone,transaction)&&
    filterPalaceLiscene(palaceLiscene,transaction);
}



module.exports = router;