const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../db/config');

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;

        this.usersPath = '/api/users';
        this.formsPath = '/api/forms'
        this.authPath = '/api/auth';

        // Connect to DB
        this.connectDB();

        // Middlewares
        this.middlewares();

        // Routes
        //this.routes();
    }

    async connectDB() {
        await dbConnection();
    }


    middlewares() {
        // CORS
        this.app.use(cors());

        // Read and body parser
        this.app.use(express.json());

        // Public folder
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.usersPath, require('../routes/users'));
        this.app.use(this.formsPath, require('../routes/forms'));
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Server running on port: ', this.port);
        });
    }

}


module.exports = Server;


