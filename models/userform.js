
const { DataTypes, sequelize } = require("sequelize");
const { db } = require("../db/config");

const User = require("../models/user")
const { Form } = require("../models/form")

const UserForm = db.define("UserForm",{
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id"
      }
    },
    formId: { 
      type: DataTypes.INTEGER,
      references: {
        model: Form,
        key: "id"
      }
    }
  }, {
    tableName: 'UserForm',
});

UserForm.belongsTo("User", { foreignKey: "userId", as: "user" });
UserForm.belongsTo("Form", { foreignKey: "formId", as: "form" });

module.exports = {
  UserForm
};

