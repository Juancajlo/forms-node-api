const { Sequelize } = require('sequelize');

const db = new Sequelize(process.env.POSTGRES_CNN);

module.exports = {
    db
}