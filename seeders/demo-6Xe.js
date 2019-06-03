'use strict';
// Xe

module.exports = {
  up: (queryInterface, Sequelize) => {
    let buses = [];
    let i;
    for (i = 1; i <= 5; i++) {
      let palaceLicense = "59-A1 01.12"+i;
      let bus = {
        bienso:palaceLicense,
        LoaiXeId:1,
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      }
      buses.push(bus);
    }
    for (i = 1; i < 5; i++) {
      let palaceLicense = "59-B1 01.12"+i;
      let bus = {
        bienso:palaceLicense,
        LoaiXeId:2,
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      }
      buses.push(bus);
    }

    console.log(buses);
    return queryInterface.bulkInsert('Xes', buses, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Xes', null, {});
  }
};
