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
      ownerId: 2,
      address: "123 Pika Street",
      city: "Pikatown",
      state: "Pikaville",
      country: "Pokemon World",
      lat: 1,
      lng: 1,
      name: "Pikachu's Fun House",
      description: "Pika Pika Pika Pika Pika Pika Pika Pika Pika Pika Pika Pika Pika Pika Pika Pika Pika Pika Pika Pika Pika Pika Pika Pika Pika Pika Pika Pika Pika Pika Pika Pika Pika Pika Pika Pika Pika Pika Pika Pika Pika Pika Pika Pika Pika Pika Pika Pika Pika Pika",
      price: 250
    },
    {
      ownerId: 3,
      address: "113 Main Street",
      city: "Pallet Town",
      state: "Kanto",
      country: "Pokemon World",
      lat: 1,
      lng: 1,
      name: "Ash's House",
      description: "Come and stay at my place with me! I have a bunkbed that is super comfortable. You will be able to hang out with me and Pikachu. For meals, my mom cooks the best curry, with the help of Mr.Mime of course.",
      price: 99
    },
    {
      ownerId: 4,
      address: "Cerulean Gym",
      city: "Cerulean City",
      state: "Kanto",
      country: "Pokemon World",
      lat: 1,
      lng: 1,
      name: "Cerulean Gym",
      description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies...",
      price: 125
    },
    {
      ownerId: 5,
      address: "Pewter Gym",
      city: "Pewter City",
      state: "Kanto",
      country: "Pokemon World",
      lat: 1,
      lng: 1,
      name: "Pewter Gym",
      description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies...",
      price: 120
    },
    {
      ownerId: 6,
      address: "Pokemon Center",
      city: "Worldwide",
      state: "PKM",
      country: "Pokemon World",
      lat: 1,
      lng: 1,
      name: "Pokemon Center",
      description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies...",
      price: 0.99
    },
    {
      ownerId: 7,
      address: "Elite Four building",
      city: "Indigo Plateau",
      state: "Kanto",
      country: "Pokemon World",
      lat: 1,
      lng: 1,
      name: "Elite Four Battle",
      description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies...",
      price: 999
    },
    {
      ownerId: 7,
      address: "Beauty Contest",
      city: "Lilycove City",
      state: "Hoenn",
      country: "Pokemon World",
      lat: 1,
      lng: 1,
      name: "Beauty Contest",
      description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies...",
      price: 15
    },
    {
      ownerId: 8,
      address: "Professor Oak's Laboratory",
      city: "Pallet Town",
      state: "Kanto",
      country: "Pokemon World",
      lat: 1,
      lng: 1,
      name: "Professor Oak's Laboratory",
      description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies...",
      price: 60
    },
    {
      ownerId: 9,
      address: "Team Rocket Headquarters",
      city: "Mahogany Town",
      state: "Kanto",
      country: "Pokemon World",
      lat: 1,
      lng: 1,
      name: "Team Rocket Headquarters",
      description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies...",
      price: 666
    },
    {
      ownerId: 9,
      address: "Viridian City Gym",
      city: "Viridian City",
      state: "Kanto",
      country: "Pokemon World",
      lat: 1,
      lng: 1,
      name: "Viridian City Gym",
      description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies...",
      price: 800
    },
    {
      ownerId: 7,
      address: "Late of Rage",
      city: "Mahogany Town",
      state: "johto",
      country: "Pokemon World",
      lat: 1,
      lng: 1,
      name: "Lake of Rage",
      description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies...",
      price: 2.25
    },
    {
      ownerId: 7,
      address: "???",
      city: "???",
      state: "Kanto",
      country: "Pokemon World",
      lat: 1,
      lng: 1,
      name: "Mew's Hiding place",
      description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies...",
      price: 2.25
    },
    {
      ownerId: 7,
      address: "Daycare Center",
      city: "Saffron City",
      state: "Kanto",
      country: "Pokemon World",
      lat: 1,
      lng: 1,
      name: "Daycare Center",
      description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies...",
      price: 2.25
    },
   ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "Spots";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      ownerId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9] }
    }, {});
  }
};
