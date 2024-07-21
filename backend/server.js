require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const dbConnection = require('./database/database.js');
const rateLimit = require('express-rate-limit'); 

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.productsPath = '/api/products';
        this.usersPath = '/api/users';
        this.authPath = '/api/auth'
        this.loginPath = '/api/login'

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
    
        const limiter = rateLimit({
            windowMs: 15 * 60 * 1000, 
            max: 100, 
            message: 'Too many requests from this IP, please try again later.'
        });

        // Aplicar el rate limiter globalmente
        this.app.use(limiter);
    }

    routes(){
        this.app.use(this.productsPath, require('./routes/productRoutes.js'));
        this.app.use(this.usersPath, require('./routes/userRoute.js'));
        this.app.use(this.authPath, require('./routes/auth.js'));
        this.app.use(this.loginPath, require('./routes/auth.js'));
        }

listen() {
    this.app.listen(this.port, () => {
        console.log(`Server running in port ${this.port}`);
    });
}
}

module.exports = Server;



