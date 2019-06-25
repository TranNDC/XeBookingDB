var express = require('express');
var router = express.Router();
var paypal = require('paypal-rest-sdk');

var waitSecond = 60;


var transactionController = require('../controllers/transaction');
var transactionDetailController = require('../controllers/transactiondetail');
var paymentdetailController = require('../controllers/paymentdetail');

var return_url="http://localhost:5000/payment/success";
var cancel_url="http://localhost:5000/payment/error";

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'ARnNOLC0vuF61RsM-blJP5kJbjAfn-hf3dLAH-5j5TcI4SIfjkWURx5oUwEsbVYd35GtDcH_9n6jfUm_',
    'client_secret': 'EHhkR41jpZfCctkKm0jmmYAmPpLljaGmjrsY0kFJJT6TTQULhQBlWNLWSA2_7q7GMS0rHGjgdX4RYuJ2'
});


router.post('/', (req, res) => {
    let Chuyen = JSON.parse(decodeURI(req.body.Chuyen));
    let Transaction = JSON.parse(decodeURI(req.body.Transaction));
    let UserId = req.body.UserId;   
    let count = Transaction.TransactionDetails.length;
    let newTransaction = getNewTransaction(Chuyen, Transaction, UserId);
    let newTransactionDetails = getNewTransactionDetails(Transaction);
    // console.log(Transaction);
    PostTransaction(res, count, newTransaction, newTransactionDetails,
        () =>{
            let paypalItems = getPayPalItem(Chuyen,Transaction);
            let create_payment_json = getcreate_payment_json(Transaction, paypalItems);
            
            paypal.payment.create(create_payment_json, function (error, payment) {
                if (error) {
                    console.log(error.response);
                    res.render('paymentError');
                } else {
                    for (let i = 0; i < payment.links.length; i++) {
                        if (payment.links[i].rel === 'approval_url') {
                            res.redirect(payment.links[i].href);
                        }
                    }
                }
            });
        });
    

});


router.get('/success', function (req, res) {
    res.locals.note = "Payment Error";
    let TransactionId = req.query.ID;
    let PaymentId = req.query.paymentId;
    let PayerId = req.query.PayerID;
    let Token = req.query.token;
    let newPaymentDetail = {
        "PaymentId":PaymentId,
        "PayerId":PayerId,
        "Token":Token
    }


    transactionController.getOne(parseInt(TransactionId), transaction =>{
        deleteWaitQueue(transaction[0].ChuyenId,getViTris(transaction[0].TransactionDetails));
    });
    paymentdetailController
        .add(newPaymentDetail ,paymentdetail => {
            transactionController
            .update(TransactionId,paymentdetail.id,()=>{
                res.render('paymentSuccess');
            });
            
        });
});

router.get('/error', function (req, res) {
    res.render('paymentError');
});

function getViTris(newTransactionDetails){
    let  vitris = [];
    newTransactionDetails.forEach(element => {
        vitris.push(element.viTriGheDat);
    });
    return vitris;
}

var TransactionNow = [];

function addToWaitQueue(chuyenId, vitris) {
    for (let i = 0; i < TransactionNow.length; i++) {
        if (TransactionNow[i].ChuyenId == chuyenId) {
            vitris.forEach(element => {
                var index = TransactionNow[i].vitris.indexOf(element);
                if (index > -1) {
                    TransactionNow[i].vitris.splice(index, 1);
                }
            });

            // tat paypal
            // xoa trong dtb

            // setTimeout((chuyenId, vitris) => {
            //     transactionDetailController.detele(parseInt(chuyenId), () => {
            //         transactionController.detele(parseInt(chuyenId));
            //     })
            // }, waitSecond)
        }
    }

}

function checkEmtyWaitQueue(ChuyenId, vitris){
    console.log(ChuyenId,vitris);
    let checkExistBooking = false;
    let checkExistChuyenId = false;

    for (let i = 0; i< TransactionNow.length; i++){
        if (TransactionNow[i].ChuyenId == ChuyenId){
            for (let j =0; j< vitris.length;j++){
                if (TransactionNow[i].vitris.indexOf(vitris[j])>=0){
                    checkExistBooking = true;
                    break;
                }
            }
            checkExistChuyenId = true;
            if (!checkExistBooking){
                addToWaitQueue(ChuyenId,vitris);
            }
        }
    }
    if (!checkExistChuyenId){
        let item = {
            'ChuyenId':ChuyenId,
            'vitris':[]

        }
        TransactionNow.push(item);
        addToWaitQueue(ChuyenId,vitris);
    }
    return !checkExistBooking;
}


function deleteWaitQueue(ChuyenId, vitris){
    for (let i = 0; i< TransactionNow.length; i++){
        if (TransactionNow[i].ChuyenId == ChuyenId){
            for (let j =0; j< vitris.length;j++){
                if (TransactionNow[i].vitris.indexOf(vitris[j])>=0){
                    TransactionNow[i].vitris.splice(TransactionNow[i].vitris.indexOf(vitris[j]), 1);
                }

            }
        }
    }
}

function PostTransaction(res, count, newTransaction, newTransactionDetails,callback){

    if (checkEmtyWaitQueue(newTransaction.ChuyenId,getViTris(newTransactionDetails))){
        transactionController
        .add(newTransaction ,transaction => {
            return_url += "?ID="+transaction.id;
            for (let i = 0; i < count; i++) {
                newTransactionDetails[i].TransactionId = transaction.id;
                transactionDetailController
                    .add(newTransactionDetails[i], transactionDetail => {
                        if (i == count - 1) {
                            // res.sendStatus(204);
                            console.log("complete Write To Server");
                            callback();
                        }
                    });
            }
        });
    }
    else{
        res.locals.note =":( You are a little bit late! Please try again!"
        res.render('paymentError');
    }

}


function getDate(value){
    let date = new Date(value);
    var options = {
        hour12: false,
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    };
    return date.toLocaleString('en-US', options);
}

function getNewTransaction(Chuyen, Transaction, UserId){
    let newTransaction = {
        'sdt': Transaction.sdt,
        'email': Transaction.email,
        'ChuyenId': Chuyen.id,
        'KhuyenMaiId': Chuyen.Tuyen.KhuyenMais.length>0?Chuyen.Tuyen.KhuyenMais[0].id:null,
        'UserId': UserId,
        'createAt': Date.now(),
        'updateAt': Date.now()
    };
    return newTransaction;
}

function getNewTransactionDetails(Transaction){
    let count = Transaction.TransactionDetails.length;
    let newTransactionDetails = [];
    for (let i = 0; i < count; i++) {
        let tmp = {
            'viTriGheDat': Transaction.TransactionDetails[i].viTriGheDat,
            'ten': Transaction.TransactionDetails[i].ten,
            'namSinh': parseInt(Transaction.TransactionDetails[i].namSinh),
            'GioiTinhId': parseInt(Transaction.TransactionDetails[i].GioiTinhId),
            'TransactionId': null,
            'createAt': Date.now(),
            'updateAt': Date.now()
        }
        newTransactionDetails.push(tmp);
    }
    return newTransactionDetails;
}

function getPayPalItem(Chuyen, Transaction){
    let count = Transaction.TransactionDetails.length;
    let paypalItems = [];
    let item ;
    let itemDescription = "Departure: " + getDate(Chuyen.ngayGioKhoiHanh);

    item = {
        "name": count + " " + Chuyen.Xe.LoaiXe.ten + ": " + Chuyen.Tuyen.xuatphat.ten + " - " + Chuyen.Tuyen.ketthuc.ten,
        "price": parseInt(Chuyen.gia),
        "currency": "USD",
        "quantity": count,
        "description": itemDescription
    };
    if (Chuyen.Tuyen.KhuyenMais.length > 0) {
        let voucher = Chuyen.Tuyen.KhuyenMais[0];
        let discountVal = Math.ceil((100 - parseInt(voucher.phanTram) )* parseInt(Chuyen.gia) / 100);
        item.description += "\nDiscount: " + voucher.phanTram + "%";
        item.price = discountVal;
    }
    paypalItems.push(item);
    return paypalItems;
}

function getcreate_payment_json(Transaction, paypalItems){
    var create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": return_url,
            "cancel_url": cancel_url
        },
        "application_context": {
            "shipping_preference": 'NO_SHIPPING'
        },
        "transactions": [{
            "item_list": {
                "items": paypalItems
            },
            "amount": {
                "currency": "USD",
                "total": Transaction.total
            }
        }]
    };
    return create_payment_json;
}

module.exports = router;