'use strict';
module.exports = (sequelize, DataTypes) => {
  const Chuyen = sequelize.define('Chuyen', {
    ngayKhoiHanh: DataTypes.DATE,
    gioKhoiHanh: DataTypes.TIME
  }, {});
  Chuyen.associate = function(models) {
    // associations can be defined here
    Chuyen.belongsTo(models.Tuyen);
    Chuyen.belongsTo(models.Xe);
    Chuyen.hasMany(models.Transaction);
  };
  return Chuyen;
};