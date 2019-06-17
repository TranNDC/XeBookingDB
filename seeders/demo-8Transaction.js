'use strict';


module.exports = {
  up: (queryInterface, Sequelize) => {
    var users = [];
    var i = 1;
    for (let i = 1; i <= 24; i++) {
      // for (let j = 1; j < 3; j++) {
          var user = {
            sdt:`0123456${i}`,
            email:`leThanhCong@abc.com`,
            ChuyenId:i,
            KhuyenMaiId:null,
            UserId:11,
            createdAt: Sequelize.literal('NOW()'),
            updatedAt: Sequelize.literal('NOW()')
          }
          users.push(user);
        // }
      }
    return queryInterface.bulkInsert('Transactions', users, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Transactions', null, {});
  }
};
