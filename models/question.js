const { inputValues } = require("../enums/input-types");

("use strict");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    static associate({ Answer, Form }) {
      this.belongsTo(Form, { foreignKey: "formId", as: "form" });
      this.hasMany(Answer, {
        foreignKey: "questionId",
        as: "answers",
        onDelete: "CASCADE",
      });
    }
  }
  Question.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      input_type: {
        type: DataTypes.ENUM,
        values: inputValues,
        allowNull: false,
      },
      input_options: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
      formId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "Form",
          key: "id",
        },
      },
    },
    {
      sequelize,
      tableName: "Question",
    }
  );
  return Question;
};
