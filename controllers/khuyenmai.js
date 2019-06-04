var controller = {};

var models = require('../models');
var voucher = models.KhuyenMai;
var Tuyens = models.Tuyen;

var DiaDiems = models.DiaDiem;


controller.getAll = function (callback) {
    voucher.findAll()
        .then(function (voucher) {
            callback(voucher);
        });
};

controller.getSumary = function (callback) {
    voucher.findAll({
        attributes: ['maKhuyenMai', 'phanTram', 'imagePath'],
        include: {
            model: Tuyens,
            attributes: [['id', 'id']],
            include: [{
                model: DiaDiems,
                as: "xuatphat",
                attributes: ['ten']
            }, {
                model: DiaDiems,
                as: "ketthuc",
                attributes: ['ten']
            }]
        }
    }).then(function (voucher) {
        callback(voucher);
    });
}

module.exports = controller;