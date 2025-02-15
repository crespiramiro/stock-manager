require('dotenv').config(); 
const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, { 
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Database successfully connected');
    } catch (error) {
        throw new Error('Error initializing the DB');
    }
};

module.exports = dbConnection;