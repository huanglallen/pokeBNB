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
   await queryInterface.bulkInsert('Reviews', [
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
   ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Reviews', {stars: [1, 2, 3, 4, 5]})
  }
};
