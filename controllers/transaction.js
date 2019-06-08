var controller = {};

var models = require('../models');
var Transactions = models.Transaction;
var TransactionDetails = models.TransactionDetail;
var Chuyens = models.Chuyen;
const Op = require('../models').Sequelize.Op;

controller.getAll = (callback) => {
    Transactions
        .findAll()
        .then(result => {
            callback(result);
        });
}

controller.getAllBetweenDate = (datefrom, dateto, callback) => {
    Transactions
        .findAll({
            where: {
                createdAt: {
                    [Op.between]: [datefrom, dateto]
                }
            }
        })
        .then(result => {
            callback(result);
        });
}

controller.getAllWithSortDate = (callback) => {
    Transactions
        .findAll({
            order: [
                ['createdAt', 'ASC']
            ]
        })
        .then(result => {
            callback(result);
        });
}

controller.getAllWithSortDateAndRevenue = (callback) => {
    Transactions
        .findAll({
            order: [
                ['createdAt', 'ASC']
            ],
            include: [{
                model: Chuyens,
                required: true,
                attributes: ['id', 'gia']
            }]
        })
        .then(result => {
            callback(result);
        });
}

controller.searchChuyen = function (chuyen_ID, callback) {
    Transactions.findAll({
            attributes: ['ChuyenId'],
            where: {
                id: chuyen_ID
            },
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

controller.getAllMoney = function (callback) {
    Transactions.findAll({
            attributes: ['id', 'sdt', 'email', 'ChuyenId', 'UserId'],
            include: [{
                model: Chuyens,
                required: true,
                attributes: ['id', 'gia']
            }]
        })
        .then((Transactions) => {
            callback(Transactions);
        });
}

controller.getAllMoneyBetweenDate = function (datefrom, dateto, callback) {
    Transactions.findAll({
            where: {
                createdAt: {
                    [Op.between]: [datefrom, dateto]
                }
            },
            include: [{
                model: Chuyens,
                required: true,
                attributes: ['id', 'gia']
            }]
        })
        .then((Transactions) => {
            callback(Transactions);
        });
}

controller.getAllBusTypeBooked = function (callback) {
    Transactions.findAll({
            attributes: ['id', 'ChuyenId'],
            include: [{
                model: Chuyens,
                require: true,
                attributes: ['id', 'XeId'],
                include: [{
                    model: models.Xe,
                    require: true,
                    attributes: ['id', 'LoaiXeId']
                }]
            }]
        })
        .then((Transactions) => {
            callback(Transactions);
        });
}

controller.getAllBusRouteBooked = function (callback) {
    Transactions.findAll({
            attributes: ['id', 'ChuyenId'],
            include: [{
                model: Chuyens,
                require: true,
                attributes: ['id', 'XeId'],
                include: [{
                    model: models.Tuyen,
                    require: true,
                    attributes: ['id', 'xuatphatId', 'ketthucId'],
                    include: [{
                        model: models.DiaDiem,
                        as: "xuatphat",
                        required: true,
                        attributes: ['ten']
                    }, {
                        model: models.DiaDiem,
                        as: "ketthuc",
                        required: true,
                        attributes: ['ten']
                    }]
                }]
            }]
        })
        .then((Transactions) => {
            callback(Transactions);
        });
}

//----------------date chart between
controller.getAllBusRouteBookedBetweenDate = function (datefrom, dateto, callback) {
    Transactions.findAll({
            attributes: ['id', 'ChuyenId', 'createdAt'],
            where: {
                createdAt: {
                    [Op.between]: [datefrom, dateto]
                }
            },
            include: [{
                model: Chuyens,
                require: true,
                attributes: ['id', 'XeId'],
                include: [{
                    model: models.Tuyen,
                    require: true,
                    attributes: ['id', 'xuatphatId', 'ketthucId'],
                    include: [{
                        model: models.DiaDiem,
                        as: "xuatphat",
                        required: true,
                        attributes: ['ten']
                    }, {
                        model: models.DiaDiem,
                        as: "ketthuc",
                        required: true,
                        attributes: ['ten']
                    }]
                }]
            }]
        })
        .then((Transactions) => {
            callback(Transactions);
        });
}

controller.getAllBusTypeBookedBetweenDate = function (datefrom, dateto, callback) {
    Transactions.findAll({
            attributes: ['id', 'ChuyenId', 'createdAt'],
            where: {
                createdAt: {
                    [Op.between]: [datefrom, dateto]
                }
            },
            include: [{
                model: Chuyens,
                require: true,
                attributes: ['id', 'XeId'],
                include: [{
                    model: models.Xe,
                    require: true,
                    attributes: ['id', 'LoaiXeId']
                }]
            }]
        })
        .then((Transactions) => {
            callback(Transactions);
        });
}

controller.getAllWithSortDateBetweenDate = (datefrom, dateto, callback) => {
    Transactions
        .findAll({
            where: {
                createdAt: {
                    [Op.between]: [datefrom, dateto]
                }
            },
            order: [
                ['createdAt', 'ASC']
            ]
        })
        .then(result => {
            callback(result);
        });
}

controller.getAllWithSortDateAndRevenueBetweenDate = (datefrom, dateto, callback) => {
    Transactions
        .findAll({
            where: {
                createdAt: {
                    [Op.between]: [datefrom, dateto]
                }
            },
            order: [
                ['createdAt', 'ASC']
            ],
            include: [{
                model: Chuyens,
                required: true,
                attributes: ['id', 'gia']
            }]
        })
        .then(result => {
            callback(result);
        });
}

module.exports = controller;