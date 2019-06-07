'use strict';

// users

module.exports = {
  up: (queryInterface, Sequelize) => {
    var users = [];

    var user = {
      name: `Lê Thành Công`,
      email: 'lecongpr98@gmail.com',
      password: 'cong',
      isAdmin: false,
      phone:'0123456789',
      imagePath: `/img/user/user-cong.jpg`,
      location:'Ho Chi Minh City, Viet Nam',
      
      createdAt: Sequelize.literal('NOW()'),
      updatedAt: Sequelize.literal('NOW()')
    }
    users.push(user);
    console.log(users);

    var user = {
      name: `Nguyễn Đỗ Cát Trân`,
      email: 'tranndc@gmail.com',
      password: 'tran',
      isAdmin: true,
      phone:'0123456789',
      imagePath: `/img/user/user.jpg`,
      location:'Ho Chi Minh City, Viet Nam',
      createdAt: Sequelize.literal('NOW()'),
      updatedAt: Sequelize.literal('NOW()')
    }
    users.push(user);
    console.log(users);

    var user = {
      name: `Lê Thành Công`,
      email: 'lecongpr981@gmail.com',
      password: 'cong',
      isAdmin: false,
      phone:'0123456789',
      imagePath: `/img/user/user-cong.jpg`,
      location:'Ho Chi Minh City, Viet Nam',
      createdAt: Sequelize.literal('NOW()'),
      updatedAt: Sequelize.literal('NOW()')
    }
    users.push(user);
    console.log(users);

    var user = {
      name: `Nguyễn Đỗ Cát Trân`,
      email: 'tranndc1@gmail.com',
      password: 'tran',
      isAdmin: true,
      phone:'0123456789',
      imagePath: `/img/user/user.jpg`,
      location:'Ho Chi Minh City, Viet Nam',
      createdAt: Sequelize.literal('NOW()'),
      updatedAt: Sequelize.literal('NOW()')
    }
    users.push(user);
    console.log(users);

    var user = {
      name: `Lê Thành Công`,
      email: 'lecongpr982@gmail.com',
      password: 'cong',
      isAdmin: false,
      phone:'0123456789',
      imagePath: `/img/user/user-cong.jpg`,
      location:'Ho Chi Minh City, Viet Nam',
      createdAt: Sequelize.literal('NOW()'),
      updatedAt: Sequelize.literal('NOW()')
    }
    users.push(user);
    console.log(users);

    var user = {
      name: `Nguyễn Đỗ Cát Trân`,
      email: 'tranndc2@gmail.com',
      password: 'tran',
      isAdmin: true,
      phone:'0123456789',
      imagePath: `/img/user/user.jpg`,
      location:'Ho Chi Minh City, Viet Nam',
      createdAt: Sequelize.literal('NOW()'),
      updatedAt: Sequelize.literal('NOW()')
    }
    users.push(user);
    console.log(users);


    var user = {
      name: `Lê Thành Công`,
      email: 'lecongpr983@gmail.com',
      password: 'cong',
      isAdmin: false,
      phone:'0123456789',
      imagePath: `/img/user/user-cong.jpg`,
      location:'Ho Chi Minh City, Viet Nam',
      createdAt: Sequelize.literal('NOW()'),
      updatedAt: Sequelize.literal('NOW()')
    }
    users.push(user);
    console.log(users);

    var user = {
      name: `Nguyễn Đỗ Cát Trân`,
      email: 'tranndc3@gmail.com',
      password: 'tran',
      isAdmin: true,
      phone:'0123456789',
      imagePath: `/img/user/user.jpg`,
      location:'Ho Chi Minh City, Viet Nam',
      createdAt: Sequelize.literal('NOW()'),
      updatedAt: Sequelize.literal('NOW()')
    }
    users.push(user);
    console.log(users);


    var user = {
      name: `Lê Thành Công`,
      email: 'lecongpr984@gmail.com',
      password: 'cong',
      isAdmin: false,
      phone:'0123456789',
      imagePath: `/img/user/user-cong.jpg`,
      location:'Ho Chi Minh City, Viet Nam',
      createdAt: Sequelize.literal('NOW()'),
      updatedAt: Sequelize.literal('NOW()')
    }
    users.push(user);
    console.log(users);

    var user = {
      name: `Nguyễn Đỗ Cát Trân`,
      email: 'tranndc4@gmail.com',
      password: 'tran',
      isAdmin: true,
      phone:'0123456789',
      imagePath: `/img/user/user.jpg`,
      location:'Ho Chi Minh City, Viet Nam',
      createdAt: Sequelize.literal('NOW()'),
      updatedAt: Sequelize.literal('NOW()')
    }
    users.push(user);
    console.log(users);


    return queryInterface.bulkInsert('Users', users, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};