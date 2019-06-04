var express = require('express');
var router = express.Router();

var controller = require('../controllers/diadiem');
var controllerKhuyenMai = require('../controllers/khuyenmai');


router.get('/', function (req, res) {
    controller.getAll(function (stations) {
        res.locals.stations = stations;

        controllerKhuyenMai.getSumary(function (vouchers) {

            var caroselInfors = {
                numberOfCarousel: Math.ceil(vouchers.length/3.0),
                carouselVouchers: [],
            }
            let numberOfCarousel= Math.ceil(vouchers.length/3.0);
            for (let i = 0; i<numberOfCarousel;i++){
                let vouchersPerCarousel  ={idVouchers: []};
                vouchersPerCarousel.idVouchers.push(i*3);
                vouchersPerCarousel.idVouchers.push((i*3+1)%vouchers.length);
                vouchersPerCarousel.idVouchers.push((i*3+2)%vouchers.length);
                caroselInfors.carouselVouchers.push(vouchersPerCarousel);
            }
            
            res.locals.carouselInfors = caroselInfors;
            res.locals.vouchers = vouchers;

            res.render('index');
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
    return arg1[parseInt(arg2)].Tuyen.xuatphat.ten + " - " + arg1[parseInt(arg2)].Tuyen.ketthuc.ten ;
});


module.exports = router;    