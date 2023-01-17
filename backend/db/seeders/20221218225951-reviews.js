'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = "Reviews";
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 2,
        review: "So modern and minimalistic!",
        stars: 5
      },
      {
        spotId: 2,
        userId: 3,
        review: "Fantastic view of the ocean with an inviting vibe",
        stars: 5
      },
      {
        spotId: 3,
        userId: 4,
        review: "Such a great time!",
        stars: 5
      },
      {
        spotId: 4,
        userId: 5,
        review: "Highly recommend!",
        stars: 5
      },
      {
        spotId: 5,
        userId: 6,
        review: "Beautiful deck views!",
        stars: 5
      },
      {
        spotId: 6,
        userId: 7,
        review: "Cozy cabin in nature!",
        stars: 5
      },
      {
        spotId: 7,
        userId: 8,
        review: "Great spot in Sea Ranch!",
        stars: 5
      },
      {
        spotId: 8,
        userId: 1,
        review: "Perfect for wine expeditions!",
        stars: 5
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "Reviews";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8] }
    }, {})
  }
};
