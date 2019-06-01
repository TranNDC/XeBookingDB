'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    var users = [];
    var i = 1;

    for (i = 1; i < 10; i++) {
      var user = {
        name: `User ${i}`,
        email: 'lecongpr98@gmail.com',
        password: 'cong',
        isAdmin: false,
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      }
      users.push(user);
    }
    console.log(users);
    return queryInterface.bulkInsert('Users', users, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('User', null, {});
  }
};

module.exports = {
  up: (queryInterface, Sequelize) => {
    var users = [];
    var i = 1;

    for (i = 1; i < 10; i++) {
      var user = {
        idTuyen: 1,
        idXe: 1,
        ngayKhoiHanh: "05/05/2019",
        gioKhoiHanh: "13:10",
        ngayDen: "05/05/2019",
        gioDen: "17:00",
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      }
      users.push(user);
    }
    console.log(users);
    return queryInterface.bulkInsert('Chuyens', users, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Chuyens', null, {});
  }
};

module.exports = {
  up: (queryInterface, Sequelize) => {
    var users = [];
    var i = 1;

    for (i = 1; i < 10; i++) {
      var user = {
        ngayBatDau: "2019-06-01 23:24:08",
        ngayKetThuc: "2019-07-01 23:24:08",
        loaiKhuyenMai: 1,
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      }
      users.push(user);
    }
    console.log(users);
    return queryInterface.bulkInsert('KhuyenMais', users, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('KhuyenMais', null, {});
  }
};



module.exports = {
  up: (queryInterface, Sequelize) => {
    var users = [];
    var i = 1;

    for (i = 1; i < 10; i++) {
      var user = {
        idChuyen: 1,
        idUser: 1,
        idXe: 1,
        viTriDatGhe: "9",
        idKhuyenMai: 1,
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      }
      users.push(user);
    }
    console.log(users);
    return queryInterface.bulkInsert('Transactions', users, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Transactions', null, {});
  }
};

module.exports = {
  up: (queryInterface, Sequelize) => {
    var users = [];
    var i = 1;

    for (i = 1; i < 10; i++) {
      var user = {
        noiDi: "Dallas",
    noiDen: "New York",
    gia: 1000,
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      }
      users.push(user);
    }
    console.log(users);
    return queryInterface.bulkInsert('Tuyens', users, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Tuyens', null, {});
  }
};

module.exports = {
  up: (queryInterface, Sequelize) => {
    var users = [];
    var i = 1;

    for (i = 1; i < 10; i++) {
      var user = {
        bienSo: "50H 6789",
    loaiXe: "Sleeper",
    soCho: 30,
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      }
      users.push(user);
    }
    console.log(users);
    return queryInterface.bulkInsert('Xes', users, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Xes', null, {});
  }
};