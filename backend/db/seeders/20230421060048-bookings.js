'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Bookings";
    return queryInterface.bulkInsert(options, [
      {
        spotId: 4,
        userId: 1,
        startDate: new Date('2000-01-15'),
        endDate: new Date('2000-01-20')
      },
      {
        spotId: 1,
        userId: 1,
        startDate: new Date('2000-02-15'),
        endDate: new Date('2000-02-20')
      },
      {
        spotId: 1,
        userId: 2,
        startDate: new Date('2000-02-15'),
        endDate: new Date('2000-02-20')
      },
      {
        spotId: 1,
        userId: 4,
        startDate: new Date('2001-01-15'),
        endDate: new Date('2001-01-20')
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
