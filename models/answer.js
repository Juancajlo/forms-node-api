const {inputValues} = require('./input-types');

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Answer extends Model {
    static associate({ Question }) {
      this.belongsTo(Question, { foreignKey: 'questionId' });
    }
  };
  Answer.init({
    input: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    input_type: {
      type: DataTypes.ENUM,
      values: inputValues,
      allowNull: false,
    },
  }, {
    sequelize,
    tableName: 'answers',
    modelName: 'Answer',
  });
  return Answer;
};