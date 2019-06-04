'use strict';

// tuyen

module.exports = {
  up: (queryInterface, Sequelize) => {
    let tuyens = [];
    let tuyen = {
      gia:500,
      soPhutDiChuyen:630,
      xuatphatId:1,
      ketthucId:2,
      createdAt: Sequelize.literal('NOW()'),
      updatedAt: Sequelize.literal('NOW()')
    }
    tuyens.push(tuyen);

    tuyen = {
      gia:500,
      soPhutDiChuyen:630,
      xuatphatId:2,
      ketthucId:1,
      createdAt: Sequelize.literal('NOW()'),
      updatedAt: Sequelize.literal('NOW()')
    }
    tuyens.push(tuyen);

    tuyen = {
      gia:100,
      soPhutDiChuyen:420,
      xuatphatId:3,
      ketthucId:4,
      createdAt: Sequelize.literal('NOW()'),
      updatedAt: Sequelize.literal('NOW()')
    }
    tuyens.push(tuyen);

    tuyen = {
      gia:100,
      soPhutDiChuyen:420,
      xuatphatId:4,
      ketthucId:3,
      createdAt: Sequelize.literal('NOW()'),
      updatedAt: Sequelize.literal('NOW()')
    }
    tuyens.push(tuyen);
    console.log(tuyens);
    return queryInterface.bulkInsert('Tuyens', tuyens, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Tuyens', null, {});
  }
};
