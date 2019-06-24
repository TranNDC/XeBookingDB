var express = require('express');
var router = express.Router();

var userController = require('../controllers/users');
var controllerDiaDiem = require('../controllers/diadiem');
var controllerTuyen = require('../controllers/tuyen');
var controllerXe = require('../controllers/xe');
var controllerKhuyenMai = require('../controllers/khuyenmai');
var controllerChuyen = require('../controllers/chuyen');
var controllerTransaction = require('../controllers/transaction');

let allchuyen = require('../controllers/chuyen');

function getData(type, results) {
    switch (type) {
        case 'licenseplate': {
            return (results.Xe.bienso)
        }
        case 'minutemove': {
            return (results.Tuyen.soPhutDiChuyen)
        }
        case 'departure': {
            
            return results.ngayGioKhoiHanh
        }
        case 'busroute': {
            return results.Tuyen.xuatphat.ten + '-' + results.Tuyen.ketthuc.ten;
        }
        case 'price': {
            return results.gia;
        }

        default:
            break;
    }
}


function sort(type, isAsc, res) {
    let n = res.length;

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < i; j++) {
            let xi = getData(type, res[i]);
            let xj = getData(type, res[j]);
            if (!isAsc ? xi > xj : xi < xj) {
                let tmp = res[i];
                res[i] = res[j];
                res[j] = tmp;
            }
        }
    }
}

router.get('/delete/:chuyenId',userController.isAdmin,(req,res)=>{
    chuyenId = req.params.chuyenId;
    
    allchuyen.deleteById(chuyenId, (result)=>{
        res.redirect("/users/masterdata");
    });
});

router.get('/create',userController.isAdmin,(req,res)=>{
    controllerTuyen.getAll(function (tuyens) {
        controllerXe.getAll(function(xes){
            res.locals.stations = tuyens;
            res.locals.xes = xes;
            res.render("createDeparture");
        })
        
    })
    
});

router.put('/edit/:chuyenId/put',userController.isAdmin,(req,res)=>{
    var date = new Date(req.body.timedeparture);
    var tuyenidt = req.body.busrouteid.split("-");
    var tuyenid = parseInt(tuyenidt[0]);
    var chuyen={
        ngayGioKhoiHanh:date,
        gia:req.body.price,
        deleted:0,
        TuyenId:tuyenid,
        XeId:parseInt(req.body.busid.split("-")[0])
    }
    chuyenId = req.params.chuyenId;;
    allchuyen.modifyById(chuyenId, chuyen, function (chuyenUpdate) {
        if (!chuyenUpdate)
            res.send("failed to edit");
        res.render("successRespond",{info:"Update "});
    });
});

router.get('/edit/:chuyenId',userController.isAdmin,(req,res)=>{
    controllerTuyen.getAll(function (tuyens) {
        controllerXe.getAll(function(xes){
            res.locals.stations = tuyens;
            res.locals.xes = xes;
            res.locals.chuyenId = req.params.chuyenId;
            
            allchuyen.getById(res.locals.chuyenId, (result)=>{
                res.locals.result=result;
                res.render("editDeparture");
            })
            
        })
        
    })
    
});

router.post('/create/post',userController.isAdmin,(req,res)=>{
    
    var date = new Date(req.body.timedeparture);
    var tuyenidt = req.body.busrouteid.split("-");
    var tuyenid = parseInt(tuyenidt[0]);
    var chuyen={
        ngayGioKhoiHanh:date,
        gia:req.body.price,
        deleted:0,
        TuyenId:tuyenid,
        XeId:parseInt(req.body.busid.split("-")[0])
    }
    allchuyen.createChuyen(chuyen,(result)=>{
        if (!result)
            res.send("failed to create");
        res.render("successRespond",{info:"Create "});
    });
});

router.get('/', userController.isAdmin, (req, res) => {
    allchuyen.getAllForMasterdata(results => {

        var order = req.query.order;
        if (!order) {
            order = "departure_desc";
        }
        let tmp = order.split('_');

        filterFunc(req, res, results);
        sort(tmp[0], tmp[1] == 'asc', results);

        var page = parseInt(req.query.page);
        var limit = 9;
        page = isNaN(page) ? 1 : page;
        let numPage = Math.ceil(results.length / limit);
        page = (page <= numPage && page >= 1) ? page : numPage;
        var pagination = {
            limit: limit,
            page: page,
            totalRows: results.length
        }
        var offset = (page - 1) * limit;

        
        res.locals.results = results.slice(offset, offset + limit);;
        
        res.locals.pagination = pagination;
        res.locals.hasPagination = (pagination.totalRows / limit > 1);
        
        controllerDiaDiem.getAll(function (stations) {
            res.locals.stations = stations;
            res.render('masterdata');
        })
    });
});

// var hbs = require('handlebars');

function filterFunc(req, res, Chuyens) {
    let departureRange = [req.query.departure_min, req.query.departure_max];
    let palaceLiscene = req.query.palaceLiscene;
    let xuatphat = req.query.from;
    let ketthuc = req.query.to;


    let foundEr = true;
    while (foundEr) {
        foundEr = false;
        Chuyens.forEach((item, index, object) => {
            departureRange = [req.query.departure_min, req.query.departure_max];
            if (!filerChuyen(departureRange,palaceLiscene,xuatphat,ketthuc,item)) {
                object.splice(index, 1);
                foundEr = true;
            }
        });
    }
}

function filterDeparture(departureRange,Chuyen){
    let date = Chuyen.ngayGioKhoiHanh;
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

function filterPalaceLiscene(palaceLiscene,Chuyen) {
    if (!palaceLiscene) return true;
    palaceLiscene = palaceLiscene.trim();
    let tphone = Chuyen.Xe.bienso.trim();
    return tphone.search(palaceLiscene) >=0;
}
function filterXuatphat(ten,Chuyen) {
    if (!ten) return true;
    ten = ten.trim();
    let tphone = Chuyen.Tuyen.xuatphat.ten.trim();
    return tphone.search(ten) >= 0;
}
function filterKetthuc(ten,Chuyen) {
    if (!ten) return true;
    ten = ten.trim();
    let tphone = Chuyen.Tuyen.ketthuc.ten.trim();
    return tphone.search(ten) >=0;
}



function filerChuyen(departureRange,palaceLiscene,xuatphat,ketthuc,Chuyen) {
    return filterDeparture(departureRange,Chuyen)&&
    filterKetthuc(ketthuc,Chuyen)&&
    filterXuatphat(xuatphat,Chuyen)&&
    filterPalaceLiscene(palaceLiscene,Chuyen);
}


module.exports = router;