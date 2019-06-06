var controller = {};

var models = require('../models');
var Chuyens = models.Chuyen;
var Tuyens = models.Tuyen;
var DiaDiems = models.DiaDiem;
var Xes = models.Xe;
var LoaiXes = models.LoaiXe;




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
            // attributes: [['id', 'id'],"soPhutDiChuyen","xuatphatId", "ketthucId"],
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