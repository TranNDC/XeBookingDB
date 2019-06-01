'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tuyen = sequelize.define('Tuyen', {
    noiDi: DataTypes.STRING,
    noiDen: DataTypes.STRING,
    gia: DataTypes.INTEGER
  }, {});
  Tuyen.associate = function(models) {
    // associations can be defined here
  };
  return Tuyen;
};