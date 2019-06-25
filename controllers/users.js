var controller = {};

var models = require('../models');
var bcrypt = require('bcryptjs');
const Op = require('../models').Sequelize.Op;

let user = models.User;
controller.getAll = (callback) => {
    user
        .findAll()
        .then(result => {
            callback(result);
        });
}

controller.getAllWithDate = (datefrom, dateto, callback) => {
    user
        .findAll({
            where: {
                isAdmin: false,
                createdAt: {
                    [Op.between]: [datefrom, dateto],
                }
            }
        })
        .then(result => {
            callback(result);
        });
}


controller.createUser = function (user, callback) {
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(user.password, salt, function (err, hash) {
            user.password = hash;
            user.imagePath = `/img/user/user.jpg`;
            models.User
                .create(user)
                .then(function () {
                    callback(err);
                });
        });
    });
};

controller.getUserByEmail = function (email, callback) {
    let Obj = {
        email: email
    }
    models.User
        .findOne({
            where: Obj
        })
        .then(function (user) {
            callback(user);
        })
        .catch(function (err) {
            if (err) throw err;
            callback(null);
        });
};

controller.comparePassword = function (password, hash, callback) {
    bcrypt.compare(password, hash, function (err, isMatch) {
        if (err) throw err;
        callback(isMatch);
    });
};

controller.getUserById = function (userid, callback) {
    models.User
        .findOne({
            where: {
                id: userid
            }
        })
        .then(function (user) {
            callback(user);
        });
}

controller.isLoggedIn = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.redirect(`/users/login?returnURL=${req.originalUrl}`);
    }
};

controller.isAdmin = (req, res, next) => {
    if (req.session.user && req.session.user.isAdmin) {
        next();
    } else {
        res.redirect(`/users/login?returnURL=${req.originalUrl}`);
        //res.status(403);
        //res.end();
    }
};


controller.modify = (userID, user, callback) => {

    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(user.password, salt, function (err, hash) {
            user.password = hash;

            models.User
                .findOne({
                    where: {
                        id: userID
                    }
                })
                .then(function (result) {
                    result.update({
                        name: user.name || result.name,
                        password: user.password || result.password,
                        phone: user.phone || result.phone,
                        email: user.email || result.email,
                        location:user.location||result.location
                    }).then(()=>{
                        callback(err,result);
                    });
                })
        });
    });
}

module.exports = controller;