'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    static associate({ Answer, Form }) {
      this.belongsTo(Form, { foreignKey: 'formId' });
      this.hasOne(Answer, { foreignKey: 'questionId' });
    }
  };
  Question.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    tableName: 'questions',
    modelName: 'Question',
  });
  return Question;
};