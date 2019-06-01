'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    idChuyen: DataTypes.INTEGER,
    idUser: DataTypes.INTEGER,
    idXe: DataTypes.INTEGER,
    viTriDatGhe: DataTypes.STRING,
    idKhuyenMai: DataTypes.INTEGER
  }, {});
  Transaction.associate = function(models) {
    // associations can be defined here
  };
  return Transaction;
};