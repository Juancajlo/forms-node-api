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
        allowNull: true,
      },
      questionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
