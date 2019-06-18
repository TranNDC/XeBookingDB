var controller = {};

var models = require('../models');
var TransactionDetails = models.TransactionDetail;


controller.add = function (transationDetail) {
    return new Promise((resolve,reject)=>{
        TransactionDetails
            .create(transationDetail)
            .then(newTransactionDetail=> resolve(newTransactionDetail)); 
    });
};

module.exports = controller;