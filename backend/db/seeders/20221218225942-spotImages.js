'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = "SpotImages";
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-755137040389728919/original/e85cf04c-2a57-41ac-bc69-c4eb5ff592ae.jpeg?im_w=960",
        preview: true
      },
      {
        spotId: 2,
        url: "https://a0.muscache.com/im/pictures/9eee0ce8-2dd2-459e-9823-598eaeec2b37.jpg?im_w=960",
        preview: true
      },
      {
        spotId: 3,
        url: "https://a0.muscache.com/im/pictures/ae39c728-74d3-4f8f-81a6-9ce1afc90a9c.jpg?im_w=1200",
        preview: true
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "SpotImages";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: [1, 2, 3]}
    }, {})
  }
};
