'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('Spots', [
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
   ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Spots', {ownerId: [1, 2]})
  }
};
