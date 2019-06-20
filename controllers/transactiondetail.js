var controller = {};

var models = require('../models');
var TransactionDetails = models.TransactionDetail;



controller.add = (transationDetail,callback)=>{
    TransactionDetails
    .create(transationDetail)
    .then(callback);
}
module.exports = controller;