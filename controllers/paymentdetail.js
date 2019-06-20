let controller = {};

let PaymentDetail = require('../models').PaymentDetail;

controller.add = (paymentDetail,callback)=>{
    PaymentDetail
    .create(paymentDetail)
    .then(callback);
}




module.exports = controller;