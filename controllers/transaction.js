var controller = {};

var models = require('../models');
var Transactions = models.Transaction;
var TransactionDetails = models.TransactionDetail;
var Chuyens=models.Chuyen;

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