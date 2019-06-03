'use strict';

// users

module.exports = {
  up: (queryInterface, Sequelize) => {
    var users = [];
    var i = 1;

    for (i = 1; i < 10; i++) {
      var user = {
        name: `User ${i}`,
        email: 'lecongpr98@gmail.com',
        password: 'cong',
        isAdmin: false,
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      }
      users.push(user);
    }
    console.log(users);
    return queryInterface.bulkInsert('Users', users, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
