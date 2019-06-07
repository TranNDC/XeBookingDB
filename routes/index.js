var express = require('express');
var router = express.Router();

var controllerDiaDiem = require('../controllers/diadiem');
var controllerKhuyenMai = require('../controllers/khuyenmai');
var controllerChuyen = require('../controllers/chuyen');
var controllerTransaction = require('../controllers/transaction');


var _stations = null;

router.get('/', function (req, res) {

    let visitController = require('../controllers/logvisit');
    visitController
        .add({
            visit: Date.now()
        });

    controllerDiaDiem.getAll(function (stations) {
        res.locals.stations = stations;
        if (!_stations) _stations = stations;
        controllerKhuyenMai.getSumary(function (vouchers) {

            var caroselInfors = {
                numberOfCarousel: Math.ceil(vouchers.length / 3.0),
                carouselVouchers: [],
            }
            let numberOfCarousel = Math.ceil(vouchers.length / 3.0);
            for (let i = 0; i < numberOfCarousel; i++) {
                let vouchersPerCarousel = {
                    idVouchers: []
                };
                vouchersPerCarousel.idVouchers.push(i * 3);
                vouchersPerCarousel.idVouchers.push((i * 3 + 1) % vouchers.length);
                vouchersPerCarousel.idVouchers.push((i * 3 + 2) % vouchers.length);
                caroselInfors.carouselVouchers.push(vouchersPerCarousel);
            }

            res.locals.carouselInfors = caroselInfors;
            res.locals.vouchers = vouchers;

            res.render('index');
        });
    });

});

router.get('/search', function (req, res) {
    var xuatphatId = req.query.xuatphatId;
    var ketthucId = req.query.ketthucId;
    var ngayKhoiHanh = req.query.ngayKhoiHanh;
    controllerChuyen.search(xuatphatId, ketthucId, ngayKhoiHanh, (Chuyens) => {

        res.locals.Chuyens = Chuyens;
        controllerDiaDiem.getAll(function (stations) {
            res.locals.stations = stations;
            let count = 0;
            res.locals.Transactions = [];
            Chuyens.forEach(element => {
                controllerTransaction.searchChuyen(element.id, (Transactions) => {
                    res.locals.Transactions.push(Transactions);
                    count++;
                    if (count == Chuyens.length) {
                        res.render('detail');
                    }
                });
            });
            // while (count <2);
        });

    });

});


// });
//contact us
router.post('/message', (req, res) => {
    let contactController = require('../controllers/contact');
    contactController
        .add({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            submited: Date.now(),
            message: req.body.message,
            checkStatus: false
        })
        .then(newContact => {
            res.render('contact', {
                message: 'Thank you for your concern! We will contact you soon.'
            });
        });
});


var hbs = require('handlebars');
hbs.registerHelper('ifEquals', function (arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});

hbs.registerHelper('getVoucherKey', function (arg1, arg2, options) {
    return arg1[parseInt(arg2)].maKhuyenMai;
});

hbs.registerHelper('getVoucherImagePath', function (arg1, arg2, options) {
    return arg1[parseInt(arg2)].imagePath;
});

hbs.registerHelper('getVoucherSaleOff', function (arg1, arg2, options) {
    return arg1[parseInt(arg2)].phanTram;
});

hbs.registerHelper('getVoucherName', function (arg1, arg2, options) {
    return arg1[parseInt(arg2)].Tuyen.xuatphat.ten + " - " + arg1[parseInt(arg2)].Tuyen.ketthuc.ten;
});

hbs.registerHelper("checkSeater", function (value, options) {
    return value != "Sleeper";
});

hbs.registerHelper("getDate", function (value, options) {
    let date = new Date(value);
    var options = {
        hour12: false,
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    };
    return date.toLocaleString('en-US', options);
});


hbs.registerHelper("getArrival", function (departure, time, options) {
    let date = new Date(departure.getTime() + time * 60000);
    var options = {
        hour12: false,
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    };
    return date.toLocaleString('en-US', options);
});

hbs.registerHelper("getTimeDeparture", function (departure, options) {
    let date = new Date(departure);
    var options = {
        hour12: false,
        hour: 'numeric',
        minute: 'numeric'
    };
    return date.toLocaleString('en-US', options);
});

hbs.registerHelper("getTimeArrival", function (departure, time, options) {
    let date = new Date(departure.getTime() + time * 60000);
    var options = {
        hour12: false,
        hour: 'numeric',
        minute: 'numeric'
    };
    return date.toLocaleString('en-US', options);
});
hbs.registerHelper('list', function (transactions, index, options) {
    if (!transactions[index]) {
        console.log("no details");
        return;
    }
    let details = transactions[index][0].TransactionDetails;
    // console.log(transactions[index][0].TransactionDetails);
    let res = "";
    details.forEach(detail => {
        res += detail.viTriGheDat + ";";
    });
    return (res);
});



// hbs.registerPartial("searchResultPartial", $("#searchResult-detail-template").html());


module.exports = router;