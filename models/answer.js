const { inputValues } = require("../enums/input-types");

("use strict");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Answer extends Model {
    static associate({ Question, User }) {
      this.belongsTo(Question, { foreignKey: "questionId", as: "question" });
      this.belongsTo(User, { foreignKey: "userId", as: "answer" });
    }
  }
  Answer.init(
    {
      input: {
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
      },
      questionId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "Question",
          key: "id",
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "User",
          key: "id",
        },
      },
    },
    {
      sequelize,
      tableName: "Answer",
    }
  );
  return Answer;
};
