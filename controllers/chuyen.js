var controller = {};

var models = require('../models');
var Chuyens = models.Chuyen;
var Tuyens = models.Tuyen;
var DiaDiems = models.DiaDiem;
var Xes = models.Xe;
var LoaiXes = models.LoaiXe;
var KhuyenMais = models.KhuyenMai;





controller.getAll = function (callback) {
    voucher.findAll()
        .then(function (voucher) {
            callback(voucher);
        });
};


controller.search = function (xuatphatTen, ketthucTen, ngayKhoiHanh, callback) {
    Chuyens.findAll({
        attributes: ['id', 'ngayGioKhoiHanh', 'gia'],
        include: [{
            model: Tuyens,
            required: true,
            include: [{
                model: DiaDiems,
                as: "xuatphat",
                attributes: ['ten'],
                where:{ten:xuatphatTen}
            }, {
                model: DiaDiems,
                as: "ketthuc",
                attributes: ['ten'],
                where:{ten:ketthucTen}
            }, {
                model: KhuyenMais,
                attributes: ['maKhuyenMai','phanTram','ngayBatDau','ngayKetThuc'],
            }]
        },
        {
            model: Xes,
            include: {
                model: LoaiXes
            }
        }
        ],

    })
        .then((Chuyens) => {
            callback(Chuyens);
        });
}

controller.searchWithVoucher = function(xuatphatTen,ketthucTen,maKhuyenMai, callback){
    Chuyens.findAll({
        attributes: ['id', 'ngayGioKhoiHanh', 'gia'],
        include: [{
            model: Tuyens,
            required: true,
            include: [{
                model: DiaDiems,
                as: "xuatphat",
                required: true,
                attributes: ['ten'],
                where:{ten:xuatphatTen}
            }, {
                model: DiaDiems,
                as: "ketthuc",
                required: true,
                attributes: ['ten'],
                where:{ten:ketthucTen}
            }, {
                model: KhuyenMais,
                required: true,
                attributes: ['maKhuyenMai','phanTram','ngayBatDau','ngayKetThuc'],
                where:{maKhuyenMai:maKhuyenMai}
            }]
        },
        {
            model: Xes,
            include: {
                model: LoaiXes
            }
        }
        ],

    })
        .then((Chuyens) => {
            callback(Chuyens);
        });
}


module.exports = controller;