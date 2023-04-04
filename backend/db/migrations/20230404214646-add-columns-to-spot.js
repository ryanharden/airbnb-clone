'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
// module.exports = {
//   async up (queryInterface, Sequelize) {
//     await queryInterface.addColumns('Spot', {
//       category: {
//         type: Sequelize.STRING,
//         allowNull: false,
//       },
//       guests: {
//         type: Sequelize.INTEGER,
//         allowNull: false,
//       },
//       bedrooms: {
//         type: Sequelize.INTEGER,
//         allowNull: false,
//       },
//       beds: {
//         type: Sequelize.INTEGER,
//         allowNull: false,
//       },
//       bathrooms: {
//         type: Sequelize.INTEGER,
//         allowNull: false,
//       },
//       wifi: {
//         type: Sequelize.BOOLEAN,
//         allowNull: false,
//       },
//       parking: {
//         type: Sequelize.BOOLEAN,
//         allowNull: false,
//       },
//       kitchen: {
//         type: Sequelize.BOOLEAN,
//         allowNull: false,
//       },
//       pets: {
//         type: Sequelize.BOOLEAN,
//         allowNull: false,
//       },
//       washer: {
//         type: Sequelize.BOOLEAN,
//         allowNull: false,
//       },
//       dryer: {
//         type: Sequelize.BOOLEAN,
//         allowNull: false,
//       },
//     }, options);
//   },

//   async down (queryInterface, Sequelize) {
//     await queryInterface.bulkDelete('Spot', ['category', 'guests', 'bedrooms', 'beds', 'bathrooms', 'wifi', 'parking', 'kitchen', 'pets', 'washer', 'dryer']);
//   }
// };
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await Promise.all([
        queryInterface.addColumn('Spots', 'category', {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: '',
        }, { transaction }),
        queryInterface.addColumn('Spots', 'guests', {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 1,
        }, { transaction }),
        queryInterface.addColumn('Spots', 'bedrooms', {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 1,
        }, { transaction }),
        queryInterface.addColumn('Spots', 'beds', {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 1,
        }, { transaction }),
        queryInterface.addColumn('Spots', 'bathrooms', {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 1,
        }, { transaction }),
        queryInterface.addColumn('Spots', 'wifi', {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        }, { transaction }),
        queryInterface.addColumn('Spots', 'parking', {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        }, { transaction }),
        queryInterface.addColumn('Spots', 'kitchen', {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        }, { transaction }),
        queryInterface.addColumn('Spots', 'pets', {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        }, { transaction }),
        queryInterface.addColumn('Spots', 'washer', {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        }, { transaction }),
        queryInterface.addColumn('Spots', 'dryer', {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
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
        queryInterface.removeColumn('Spots', 'category', { transaction }),
        queryInterface.removeColumn('Spots', 'guests', { transaction }),
        queryInterface.removeColumn('Spots', 'bedrooms', { transaction }),
        queryInterface.removeColumn('Spots', 'beds', { transaction }),
        queryInterface.removeColumn('Spots', 'bathrooms', { transaction }),
        queryInterface.removeColumn('Spots', 'wifi', { transaction }),
        queryInterface.removeColumn('Spots', 'parking', { transaction }),
        queryInterface.removeColumn('Spots', 'kitchen', { transaction }),
        queryInterface.removeColumn('Spots', 'pets', { transaction }),
        queryInterface.removeColumn('Spots', 'washer', { transaction }),
        queryInterface.removeColumn('Spots', 'dryer', { transaction })
      ]);
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }
};
