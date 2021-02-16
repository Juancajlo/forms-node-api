const { Sequelize } = require('sequelize');

const dbConnection = async () => {

    try {
        
        const sequelize = new Sequelize(process.env.POSTGRES_CNN);
        try {
            await sequelize.authenticate();
            console.log('Connection has been established successfully.');
        } catch (error) {   
            console.error('Unable to connect to the database:', error);
        }

    } catch (error) {
        console.log(error);
        throw new Error('Error trying to init DB');
    }

}

module.exports = {
    dbConnection
}