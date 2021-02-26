"use strict";

const { inputValues } = require("../enums/input-types");

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable("Question", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING,
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
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable("Question");
  },
};
