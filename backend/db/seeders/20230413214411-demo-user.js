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
        firstName: 'Demo',
        lastName: 'User',
        email: 'demo@user.io',
        username: 'DemoUser',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Allen',
        lastName: 'Huang',
        email: 'allen@allen.io',
        username: 'pokemonmaster',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Ash',
        lastName: 'Ketchum',
        email: 'ash@ash.io',
        username: 'pikachulover',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Misty',
        lastName: 'Williams',
        email: 'misty@misty.io',
        username: 'waterlover',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Brock',
        lastName: 'Harrison',
        email: 'brock@brock.io',
        username: 'rocklover',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Nurse',
        lastName: 'Joy',
        email: 'joy@joy.io',
        username: 'ilove2heal',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Game',
        lastName: 'Freak',
        email: 'game@game.io',
        username: 'gamefreak',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Samuel',
        lastName: 'Oak',
        email: 'oak@oak.io',
        username: 'profoak',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Giovanni',
        lastName: 'Sakaki',
        email: 'gio@gio.io',
        username: 'teamrocket',
        hashedPassword: bcrypt.hashSync('password')
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      firstName: { [Op.in]: ['Demo', 'Allen', 'Ash', 'Misty', 'Brock', 'Nurse', 'Game', 'Samuel', 'Giovanni'] }
    }, {});
  }
};
