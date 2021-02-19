const { DataTypes, sequelize } = require("sequelize");
const db = require("../models");
const { User, UserForm, Sequelize } = require("../models");

// const {User} = require("../models/user");
// const { UserForm } = require("../models/userform");

const Form = db.define("Form", {
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
    tableName: 'Form'
});


Form.belongsToMany(User, { foreignKey: 'formId', through: UserForm, as: "users" });
// Form.hasMany(Question, { foreignKey: 'formId' });
// Form.hasOne(Menu, { foreignKey: 'subMenuId' });


module.exports = {
  Form
};