'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async(queryInterface, Sequelize) => {
    options.tableName = "Spots";
    return queryInterface.bulkInsert(options, [
    {
      ownerId: 1,
      address: "123 Disney Lane",
      city: "San Francisco",
      state: "California",
      country: "United States of America",
      lat: 37.7645358,
      lng: -122.4730327,
      name: "App Academy",
      description: "Place where web developers are created",
      price: 123
    },
    {
      ownerId: 1,
      address: "113 Main Dr",
      city: "San Francisco",
      state: "California",
      country: "United States of America",
      lat: 27.7645358,
      lng: -122.4730327,
      name: "App Academy",
      description: "Place where traffic never ends",
      price: 5
    },
    {
      ownerId: 1,
      address: "122 Sesame St",
      city: "Los Angeles",
      state: "California",
      country: "United States of America",
      lat: 17.7645358,
      lng: -122.4730327,
      name: "App Academy",
      description: "Place where Elmo and his gang live",
      price: 1234
    },
    {
      ownerId: 2,
      address: "321 Piano Path",
      city: "San Francisco",
      state: "California",
      country: "United States of America",
      lat: 0,
      lng: 0,
      name: "App Academy",
      description: "Place where music happens",
      price: 1000
    }
   ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "Spots";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      ownerId: { [Op.in]: [1, 2] }
    }, {});
  }
};
