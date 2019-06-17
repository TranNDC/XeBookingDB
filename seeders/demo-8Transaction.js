'use strict';


module.exports = {
  up: (queryInterface, Sequelize) => {
    var users = [];
    var i = 1;
    for (i = 1; i <= 10; i++) {
      for (let j = 1; j <= 10; j++) {
        var user = {
          sdt: `0123456${i}`,
          email: `leThanhCong@abc.com`,
          ChuyenId: (i-1)*10 + j,
          KhuyenMaiId: null,
          UserId: i,
          createdAt: Sequelize.literal('NOW()'),
          updatedAt: Sequelize.literal('NOW()')
        }
        users.push(user);
      }
    }
    console.log(users);
    return queryInterface.bulkInsert('Transactions', users, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Transactions', null, {});
  }
};
