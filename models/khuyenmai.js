'use strict';
module.exports = (sequelize, DataTypes) => {
  const KhuyenMai = sequelize.define('KhuyenMai', {
    ngayBatDau: DataTypes.DATE,
    ngayKetThuc: DataTypes.DATE,
    loaiKhuyenMai: DataTypes.INTEGER
  }, {});
  KhuyenMai.associate = function(models) {
    // associations can be defined here
  };
  return KhuyenMai;
};