'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async(queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(options, [
    {
      spotId: 1,
      url: 'https://cdn.homedit.com/wp-content/uploads/2021/11/Modern-Mansion.jpg',
      preview: true
    },
    {
      spotId: 2,
      url: 'fakeurl.again',
      preview: true
    },
    {
      spotId: 3,
      url: 'another.fake',
      preview: false
    },
    {
      spotId: 1,
      url: 'https://thumbs.dreamstime.com/b/luxury-mansion-hallway-12319968.jpg',
      preview: true
    },
    {
      spotId: 1,
      url: 'https://image.cnbcfm.com/api/v1/image/105569495-1542057846065playa-vista-isle-hillsboro-beach-fl09.jpg?v=1542058324&w=929&h=523&vtcrop=y',
      preview: false
    },
    {
      spotId: 1,
      url: 'https://media.cnn.com/api/v1/images/stellar/prod/170807165700-inside-the-versace-mansion-khaydenversacemansionpoolfromabove.jpg?q=x_200,y_0,h_900,w_1200,c_crop',
      preview: false
    },
    {
      spotId: 1,
      url: 'https://thumbs.dreamstime.com/b/contemporary-luxury-mansion-interior-spiral-stairs-47533728.jpg',
      preview: false
    }
   ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
