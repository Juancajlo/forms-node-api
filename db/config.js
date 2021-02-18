const { Sequelize } = require('sequelize');

const db = new Sequelize(process.env.POSTGRES_CNN, { logging: true });

module.exports = {
    db
}