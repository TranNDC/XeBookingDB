var express = require('express');
var router = express.Router();

var controller = require('../controllers/diadiem');


router.get('/', function (req, res) {
    controller.getAll(function (stations) {
        res.locals.stations = stations;
         res.render('index');

    });
});

module.exports = router;    