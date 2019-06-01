'use strict';
module.exports = (sequelize, DataTypes) => {
  const Chuyen = sequelize.define('Chuyen', {
    idTuyen: DataTypes.INTEGER,
    idXe: DataTypes.INTEGER,
    ngayKhoiHanh: DataTypes.STRING,
    gioKhoiHanh: DataTypes.STRING,
    ngayDen: DataTypes.STRING,
    gioDen: DataTypes.STRING
  }, {});
  Chuyen.associate = function(models) {
    // associations can be defined here
  };
  return Chuyen;
};