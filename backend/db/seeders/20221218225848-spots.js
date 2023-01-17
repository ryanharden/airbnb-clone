'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   options.tableName = "Spots";
   return queryInterface.bulkInsert(options, [
    {
      ownerId: 1,
      address: "2034 Joshua Tree Road",
      city: "Joshua Tree",
      state: "California",
      country: "United States",
      lat: 33.8734,
      lng: 115.9010,
      name: "Invisible House",
      description: "An exploration in contrasts, the mirrored 22-story horizontal skyscraper features an entirely reflective facade that absorbs its surroundings and vanishes into the desert landscape.",
      price: 3652
    },
    {
      ownerId: 2,
      address: "1234 Bodega Bay Street",
      city: "Bodega Bay",
      state: "California",
      country: "United States",
      lat: 38.3332,
      lng: 123.0481,
      name: "The Beach House",
      description: "This stunning house sits on a bluff directly above the ocean. Sit in the living room with a 180 degree view of the ocean, hear the waves as they roll in, watch birds of prey land on a cypress tree, and deer, foxes and other wildlife forage on the hill.",
      price: 600
    },
    {
      ownerId: 3,
      address: "4321 Neskowin Drive",
      city: "Neskowin",
      state: "Oregon",
      country: "United States",
      lat: 45.1068,
      lng: 123.9843,
      name: "Neskape Beach House",
      description: "Our coastal home is a sophisticated blend of comfort and beautiful simplicity. With impeccable panoramic ocean views to enjoy.",
      price: 1034
    },
    {
      ownerId: 4,
      address: "3455 La Jolla Road",
      city: "San Diego",
      state: "California",
      country: "United States",
      lat: 45.1068,
      lng: 123.9843,
      name: "Luxury Listing w/ Exclusive View in La Jolla",
      description: "Come enjoy this beautiful home with amazing views and lots of entertainment just steps away!",
      price: 392
    },
    {
      ownerId: 5,
      address: "8347 Mission Beach Street",
      city: "San Diego",
      state: "California",
      country: "United States",
      lat: 45.1068,
      lng: 123.9843,
      name: "Oceanfront Condo w/ Private Roof Deck & Upgrades",
      description: "Wake up every day in paradise with panoramic ocean views you will never forget. ",
      price: 465
    },
    {
      ownerId: 6,
      address: "934 Inverness Drive",
      city: "Point Reyes Station",
      state: "California",
      country: "United States",
      lat: 45.1068,
      lng: 123.9843,
      name: "Inverness A-Frame",
      description: "Bohemian Modern A- Frame two bed two bath spacious cabin located in Northern California in beautiful West Marin county.",
      price: 586
    },
    {
      ownerId: 7,
      address: "259 Sea Ranch Lane",
      city: "Sea Ranch",
      state: "California",
      country: "United States",
      lat: 45.1068,
      lng: 123.9843,
      name: "Dog-Friendly Oceanfront Home with Gorgeous Views",
      description: "The Stoney home is a private oasis nestled atop the ocean bluff, with floor to ceiling windows offering panoramic views out over the ocean and the California coast.",
      price: 358
    },
    {
      ownerId: 8,
      address: "6890 Temecula Lane",
      city: "Temecula",
      state: "California",
      country: "United States",
      lat: 45.1068,
      lng: 123.9843,
      name: "Ultimate Winery Getaway with Spa and Amazing Hilltop View",
      description: "Temecula Wine Country offers a wide array of  bucket-list worthy activities for those looking to retreat from the city.",
      price: 300
    },
   ], {})
  },

  async down (queryInterface, Sequelize) {
  options.tableName = "Spots";
  const Op = Sequelize.Op;
  return queryInterface.bulkDelete(options, {
    id: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8]}
  }, {});
  }
};
