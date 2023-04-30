'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Link extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }
  Link.init({
    userName: DataTypes.STRING,
    title: DataTypes.TEXT,
    link: DataTypes.TEXT,
    categories: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Link',
  });
  return Link;
};