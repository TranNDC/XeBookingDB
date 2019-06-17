'use strict';


module.exports = {
  up: (queryInterface, Sequelize) => {
    var users = [];
    var i = 1;
    for (let i = 481; i <= 504; i++) {
      for (let j = 1; j < 3; j++) {
        let ghe;
        if (i%2==1) ghe = '3A'; else ghe =5;
        var user = {
          ten:"Lê Thành Công",
          namSinh:1998,
          viTriGheDat:ghe,
          TransactionId:i,
          GioiTinhId:1,
          createdAt: Sequelize.literal('NOW()'),
          updatedAt: Sequelize.literal('NOW()')
        }
        users.push(user);
        if (i%2==1) ghe = '3B'; else ghe =6;
        user = {
          ten:"Nguyễn Trân",
          namSinh:1998,
          viTriGheDat:ghe,
          TransactionId:i,
          GioiTinhId:1,
          createdAt: Sequelize.literal('NOW()'),
          updatedAt: Sequelize.literal('NOW()')
        }
        users.push(user);
      }
    }

    console.log(users);
    return queryInterface.bulkInsert('TransactionDetails', users, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('TransactionDetails', null, {});
  }
};
