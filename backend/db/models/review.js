'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review.belongsTo(models.Spot, { foreignKey: "spotId" });
      Review.belongsTo(models.User, { foreignKey: "userId"});
      Review.hasMany(models.ReviewImage, { foreignKey: "reviewId", onDelete: "CASCADE", hooks: true });
    }
  }
  Review.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "Spots" }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "Users" }
    },
    review: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cleanliness: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        max: 5
      }
    },
    communication: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        max: 5
      }
    },
    checkin: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        max: 5
      }
    },
    accuracy: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        max: 5
      }
    },
    location: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        max: 5
      }
    },
    value: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        max: 5
      }
    }
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};
