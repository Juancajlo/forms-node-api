"use strict";
module.exports = (sequelize, DataTypes) => {
  const Menu = sequelize.define(
    "Menu",
    {
      subMenuId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "Menu",
          key: "id",
        },
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      route: {
        type: DataTypes.STRING,
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
      tableName: "Menu",
    }
  );
  Menu.associate = function (models) {
    Menu.hasMany(Menu, { foreignKey: "subMenuId", as: "subMenu" });
    Menu.belongsTo(Menu, { foreignKey: "id", as: "parentMenu" });
    Menu.belongsTo(models.Form, { foreignKey: "formId", as: "form" });
  };
  return Menu;
};
