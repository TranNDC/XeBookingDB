var controller = {};

var models = require('../models');
var Transactions = models.Transaction;
var TransactionDetails = models.TransactionDetail;
var Chuyens=models.Chuyen;
var Tuyens=models.Tuyen;
var Xes=models.Xe;
var KhuyenMais = models.KhuyenMai;
var DiaDiems = models.DiaDiem;
var Users = models.User;
var LoaiXes = models.LoaiXe;
var GioiTinh = models.GioiTinh;




controller.getAll = (callback) => {
    Transactions
        .findAll()
        .then(result => {
            callback(result);
        });
}

controller.searchChuyen = function (chuyen_ID, callback) {
    Transactions.findAll({
        attributes: ['ChuyenId'],
        where:{id:chuyen_ID},
        include: [{
            model: TransactionDetails,
            required: true,
            attributes: ['viTriGheDat']
        }],
    })
        .then((Transactions) => {
            callback(Transactions);
        });
}

controller.searchUser = function (user_ID, callback) {
    Transactions.findAll({
        attributes: ['id', 'createdAt'],
        include: [
            { model: Users, attributes: ['id'], where: { id: user_ID } },
            {
                model: Chuyens,
                attributes: ['ngayGioKhoiHanh', 'gia'],
                required: true,
                include: [
                    {
                        model: Tuyens,
                        required: true,
                        include: [{ model: DiaDiems, as: "xuatphat", attributes: ['ten'] }
                            , { model: DiaDiems, as: "ketthuc", attributes: ['ten'] }
                        ]
                    },
                    { model: Xes, attributes: ['bienso'] },
                ]
            },
            { model: TransactionDetails, required: true, attributes: ['viTriGheDat'] },
            { model: KhuyenMais, attributes: ['phanTram'] }
        ]
    })
        .then((Transactions) => {
            callback(Transactions);
        });
}


controller.getTransactions = function (callback) {
    Transactions.findAll({
        attributes: ['id', 'createdAt', 'sdt', 'email'],
        include: [
            { model: Users, attributes: ['id'] },
            {
                model: Chuyens,
                attributes: ['ngayGioKhoiHanh', 'gia'],
                include: [
                    {
                        model: Tuyens,
                        attributes: ['soPhutDiChuyen'],
                        include: [{ model: DiaDiems, as: "xuatphat", attributes: ['ten'] }
                            , { model: DiaDiems, as: "ketthuc", attributes: ['ten'] }
                        ]
                    },
                    {
                        model: Xes, attributes: ['id', 'bienso'], include: {
                            model: LoaiXes,
                            attributes: ['ten']
                        }
                    },
                ]
            },
            {
                model: TransactionDetails,
                required: true,
                attributes: ['ten', 'namSinh', 'viTriGheDat'],
                include: [{ model: GioiTinh, attributes: ['ten'] }]
            },
            { model: KhuyenMais, attributes: ['maKhuyenMai', 'phanTram'] }
        ]
    })
        .then((Transactions) => {
            callback(Transactions);
        });
}


controller.getAllMoney = function (callback) {
    Transactions.findAll({
        attributes:['id','sdt','email','ChuyenId','UserId'],
        include: [{
            model: Chuyens,
            required: true,
            attributes: ['id','gia']
        }]
    })
        .then((Transactions) => {
            callback(Transactions);
        });
}


module.exports = controller;