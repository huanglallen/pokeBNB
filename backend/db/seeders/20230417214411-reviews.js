'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async(queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, [
    {
      spotId: 1,
      userId: 1,
      review: "my place is the bestest",
      stars: 5
    },
    {
      spotId: 1,
      userId: 2,
      review: 'thought it was ok',
      stars: 2
    },
    {
      spotId: 2,
      userId: 3,
      review: "it sucked",
      stars: 1
    },
    {
      spotId: 4,
      userId: 1,
      review: "love the music here",
      stars: 4
    }
   ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 4] }
    }, {});
  }
};