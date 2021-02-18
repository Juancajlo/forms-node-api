const { DataTypes } = require("sequelize");
const db  = require("../models");

const { UserForm } = require("../models/userform")

console.log(db)

const User = db.sequelize.define("User",{
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
    },
    gender: {
      type: DataTypes.STRING,
    },
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },    
  }, {
    tableName: 'User',
  });



User.belongsToMany(Form, {foreignKey: 'userId', through: UserForm, as: "forms"});


module.exports = {
  User
};