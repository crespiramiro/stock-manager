const express = require('express');
const cors = require('cors');
const axios = require('axios');

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.productsPath = '/api/products';

        this.middlewares();
        this.routes();
        this.connectDb();
    }

    async connectDb(){
        await dbConnection();
    }

    requestLogger(req, res, next) {
        console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
        next();
    }

    middlewares(){
        this.app.use(express.json());
        this.app.use(express.static('public'));
        this.app.use(cors());
        this.app.use(this.requestLogger);
    }

    routes(){
        this.app.use(this.productsPath, require('../routes/productRoutes.js'));
    }

listen() {
    this.app.listen(this.port, () => {
        console.log(`Server running in port ${this.port}`);
    });
}
}

module.exports = Server;



