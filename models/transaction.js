'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    ten: DataTypes.STRING,
    namSinh: DataTypes.INTEGER,
    viTriDatGhe: DataTypes.STRING
  }, {});
  Transaction.associate = function(models) {
    // associations can be defined here
    Transaction.belongsTo(models.GioiTinh);
    Transaction.belongsTo(models.Chuyen);
    Transaction.belongsTo(models.KhuyenMai);
    Transaction.belongsTo(models.User);
  };
  return Transaction;
};