'use strict';

// chuyen

module.exports = {
  up: (queryInterface, Sequelize) => {
    let chuyens = [];

    for (let i = 1; i < 10; i++) {
      for (let j = 1; j < 10; j++) {
        var date = new Date();
        date.setMinutes(0);
        date.setSeconds(0);
        date.setHours(date.getHours()+j);
        date.setDate(date.getDate()+i-1);
        var chuyen = {
          ngayGioKhoiHanh: date.toLocaleString(),
          gia: Math.floor(Math.random() * 401) + 100,
          TuyenId: Math.floor(Math.random() * 4)+1,
          XeId: Math.floor(Math.random() * 9)+1,
          createdAt: Sequelize.literal('NOW()'),
          updatedAt: Sequelize.literal('NOW()')
        }
        chuyens.push(chuyen);
      }
    }
    return queryInterface.bulkInsert('Chuyens', chuyens, {});

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Chuyens', null, {});
  }
};

