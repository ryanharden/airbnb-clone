'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spot.belongsTo(models.User, { foreignKey: "ownerId", as: "Owner" });
      Spot.hasMany(models.SpotImage, { foreignKey: "spotId", onDelete: "CASCADE", hooks: true });

      Spot.belongsToMany(models.User, {
        through: models.Booking,
        foreignKey: "spotId",
        otherKey: "userId"
      });

      Spot.hasMany(models.Review, {foreignKey: "spotId", onDelete: "CASCADE", hooks:true});
    }
  }
  Spot.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lat: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    lng: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    guests: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    bedrooms: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    beds: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    bathrooms: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    wifi: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    parking: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    kitchen: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    pets: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    washer: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    dryer: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
