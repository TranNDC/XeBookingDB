var controller = {};

var models = require('../models');
var Transactions = models.Transaction;
var TransactionDetails = models.TransactionDetail;



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


module.exports = controller;