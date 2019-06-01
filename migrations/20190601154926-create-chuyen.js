'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Chuyens', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idTuyen: {
        type: Sequelize.INTEGER
      },
      idXe: {
        type: Sequelize.INTEGER
      },
      ngayKhoiHanh: {
        type: Sequelize.STRING
      },
      gioKhoiHanh: {
        type: Sequelize.STRING
      },
      ngayDen: {
        type: Sequelize.STRING
      },
      gioDen: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Chuyens');
  }
};