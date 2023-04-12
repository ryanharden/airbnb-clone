'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await Promise.all([
        queryInterface.addColumn('Reviews', 'cleanliness', {
          type: Sequelize.INTEGER,
        }, { transaction }),
        queryInterface.addColumn('Reviews', 'communication', {
          type: Sequelize.INTEGER,
        }, { transaction }),
        queryInterface.addColumn('Reviews', 'checkin', {
          type: Sequelize.INTEGER,
        }, { transaction }),
        queryInterface.addColumn('Reviews', 'accuracy', {
          type: Sequelize.INTEGER,
        }, { transaction }),
        queryInterface.addColumn('Reviews', 'location', {
          type: Sequelize.INTEGER,
        }, { transaction }),
        queryInterface.addColumn('Reviews', 'value', {
          type: Sequelize.INTEGER
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
        queryInterface.removeColumn('Reviews', 'cleanliness', { transaction }),
        queryInterface.removeColumn('Reviews', 'communication', { transaction }),
        queryInterface.removeColumn('Reviews', 'checkin', { transaction }),
        queryInterface.removeColumn('Reviews', 'accuracy', { transaction }),
        queryInterface.removeColumn('Reviews', 'location', { transaction }),
        queryInterface.removeColumn('Reviews', 'value', { transaction }),
      ]);
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }
};
