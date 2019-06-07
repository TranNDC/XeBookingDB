var express = require('express');
var router = express.Router();

router.get('/chart_line', (req, res) => {
    res.send({
        "Revenue": [{
            "day": "May 1",
            "revenue": 3
        }, {
            "day": "May 2",
            "revenue": 5
        }, {
            "day": "May 3",
            "revenue": 4
        }, {
            "day": "May 4",
            "revenue": 5
        }, {
            "day": "May 5",
            "revenue": 7
        }, {
            "day": "May 7",
            "revenue": 3
        }, {
            "day": "May 8",
            "revenue": 6
        }, {
            "day": "Today",
            "revenue": 9
        }]
    });
});

router.get('/chart_col', (req, res) => {
    res.send({
        "Revenue": [{
            "day": "May 1",
            "revenue": 3
        }, {
            "day": "May 2",
            "revenue": 5
        }, {
            "day": "May 3",
            "revenue": 4
        }, {
            "day": "May 4",
            "revenue": 5
        }, {
            "day": "May 5",
            "revenue": 7
        }, {
            "day": "May 7",
            "revenue": 3
        }, {
            "day": "May 8",
            "revenue": 6
        }, {
            "day": "Today",
            "revenue": 9
        }]
    });
});

let allvisit = require('../controllers/logvisit');
let allbooking = require('../controllers/transaction');
router.get('/chart_donut', (req, res) => {
    var obj = {
        "Task": [{
            "task": "Visit but not book bus",
            "percent": 30
        }, {
            "task": "Visit then book bus",
            "percent": 70
        }]
    };
    allbooking.getAll(results=>{
        obj.Task[1].percent=Object.keys(results).length;
        allvisit.getAll(results=>{
            obj.Task[0].percent=Object.keys(results).length-obj.Task[1].percent;
            res.send(obj);
        });
    });
});

router.get('/chart_bustype', (req, res) => {
    res.send({
        "Bustype": [{
            "bustype": "Normal",
            "used": 30
        }, {
            "bustype": "Seater",
            "used": 30
        }, {
            "bustype": "Sleeper",
            "used": 40
        }]
    });
});

router.get('/chart_busroute', (req, res) => {
    res.send({
        "Revenue": [{
            "route": "New york - Dallas",
            "book": 52
        }, {
            "route": "Ho Chi Minh - Dallas",
            "book": 24
        }, {
            "route": "Dallas - Ho Chi Minh",
            "book": 14
        }, {
            "route": "Other",
            "book": 10
        }]
    });
});



module.exports = router;