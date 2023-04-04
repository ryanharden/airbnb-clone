'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
// module.exports = {
//   async up (queryInterface, Sequelize) {
//     await queryInterface.addColumns('Spot', {
//       guests: {
//         type: Sequelize.INTEGER,
//         allowNull: false,
//       },
//       total: {
//         type: Sequelize.INTEGER,
//         allowNull: false,
//       },
//     }, options);
//   },

//   async down (queryInterface, Sequelize) {
//     await queryInterface.bulkDelete('Spot', ['guests', 'total'])
//   }
// };
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await Promise.all([
        queryInterface.addColumn('Bookings', 'guests', {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 1
        }, { transaction }),
        queryInterface.addColumn('Bookings', 'total', {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0
        }, { transaction })
      ]);
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },

  async down (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await Promise.all([
        queryInterface.removeColumn('Bookings', 'guests', { transaction }),
        queryInterface.removeColumn('Bookings', 'total', { transaction })
      ]);
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }
};
