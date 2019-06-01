'use strict';
module.exports = (sequelize, DataTypes) => {
  const Xe = sequelize.define('Xe', {
    bienSo: DataTypes.STRING,
    loaiXe: DataTypes.STRING,
    soCho: DataTypes.INTEGER
  }, {});
  Xe.associate = function(models) {
    // associations can be defined here
  };
  return Xe;
};