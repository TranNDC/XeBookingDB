'use strict';


module.exports = {
  up: (queryInterface, Sequelize) => {
    var users = [];
    var i = 1;

    for (i = 1; i < 10; i++) {
      var user = {
        ten:"Lê Thành Công",
        namSinh:1998,
        viTriDatGhe:"1A",
        GioiTinhId:1,
        ChuyenId:i,
        KhuyenMaiId:null,
        UserId:i,
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      }
      users.push(user);
    }
    console.log(users);
    return queryInterface.bulkInsert('Transactions', users, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Transactions', null, {});
  }
};
