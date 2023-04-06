'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        email: 'demo@user.io',
        username: 'DemoUser',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: "Ryan",
        lastName: "Harden"
      },
      {
        email: 'user1@user.io',
        username: 'abbey',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: "Abigail",
        lastName: "Horner"
      },
      {
        email: 'user2@user.io',
        username: 'gabeD',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: "Gabriel",
        lastName: "Debaca"
      },
      {
        email: 'tom@gmail.com',
        username: 'tomvalentine',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: "Tom",
        lastName: "Valentine"
      },
      {
        email: 'abbey@gmail.com',
        username: 'abbeyhorner',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: "Abbey",
        lastName: "Horner"
      },
      {
        email: 'leandro@gmail.com',
        username: 'leandroF',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: "Leandro",
        lastName: "Figueiredo"
      },
      {
        email: 'roysa@gmail.com',
        username: 'roysaP',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: "Roysa",
        lastName: "Peguero"
      },
      {
        email: 'lilly@gmail.com',
        username: 'lillyann',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: "Lilly",
        lastName: "Ann"
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo', 'abbey', 'gabe', 'tomvalentine', 'abbeyhorner', 'leandroF', 'roysaP', 'lillyann'] }
    }, {});
  }
};
