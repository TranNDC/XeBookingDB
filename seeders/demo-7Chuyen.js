'use strict';

// chuyen

module.exports = {
  up: (queryInterface, Sequelize) => {
    let chuyens = [];

    for (let i = 1; i < 10; i++) {
      var time = i + ":00";
      var chuyen = {
        ngayKhoiHanh:'2019-06-01',
        gioKhoiHanh: time,
        TuyenId: i % 4 + 1,
        XeId: i,
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      }
      chuyens.push(chuyen);
    }
    console.log(chuyens);
    return queryInterface.bulkInsert('Chuyens', chuyens, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Chuyens', null, {});
  }
};

