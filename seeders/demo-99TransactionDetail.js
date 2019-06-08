'use strict';


module.exports = {
  up: (queryInterface, Sequelize) => {
    var users = [];
    var i = 1;

    for (i = 1; i < 30; i++) {
      var user = {
        ten:"Lê Thành Công",
        namSinh:1998,
        viTriGheDat:"1A",
        TransactionId:i,
        GioiTinhId:1,
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      }
      users.push(user);
      user = {
        ten:"Lê Thành Công1",
        namSinh:1998,
        viTriGheDat:"2A",
        TransactionId:i,
        GioiTinhId:1,
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      }
      users.push(user);
    }
    console.log(users);
    return queryInterface.bulkInsert('TransactionDetails', users, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('TransactionDetails', null, {});
  }
};
