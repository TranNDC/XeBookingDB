let controller = {};

let Logvisit = require('../models').Logvisit;

controller.add = (visit) => {
    return new Promise((resolve, reject) => {
        Logvisit
            .create(visit)
            .then(newLogvisit => resolve(newLogvisit));
    });
}

controller.getAll = (callback) => {
    Logvisit
        .findAll()
        .then(result => {
            callback(result);
        });
}

module.exports = controller;