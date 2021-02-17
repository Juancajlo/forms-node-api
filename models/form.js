'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Form extends Model {
    static associate({ User, Question, Menu }) {
      this.belongsTo(User, { foreignKey: 'userId' });
      this.hasMany(Question, { foreignKey: 'formId' });
      this.hasOne(Menu, { foreignKey: 'subMenuId' });
    }
  };
  Form.init({
    title: {
      type: DataTypes.STRING,  
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    subMenuId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    tableName: 'forms',
    modelName: 'Form',
  });
  return Form;
};