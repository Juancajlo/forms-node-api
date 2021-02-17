'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Menu extends Model {
    static associate({ Menu, Form }) {
      this.hasMany(Menu, { foreignKey: 'subMenuId' });
      this.belongsTo(Menu, { foreignKey: 'subMenuId' });
      this.belongsTo(Form, { foreignKey: 'formId' });
    }
  };
  Menu.init({
    subMenuId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    route: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    tableName: 'menus',
    modelName: 'Menu',
  });
  return Menu;
};