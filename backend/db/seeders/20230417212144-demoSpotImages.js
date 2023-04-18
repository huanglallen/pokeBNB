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
   await queryInterface.bulkInsert('SpotImages', [
    {
      spotId: 1,
      url: 'fake.url',
      preview: true
    },
    {
      spotId: 1,
      url: 'fakeurl.again',
      preview: true
    },
    {
      spotId: 2,
      url: 'another.fake',
      preview: false
    },
    {
      spotId: 2,
      url: 'yup.again',
      preview: true
    },
    {
      spotId: 2,
      url: 'youknowthe.deal',
      preview: true
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
    await queryInterface.bulkDelete('SpotImages', {spotId: [1, 2]})
  }
};
