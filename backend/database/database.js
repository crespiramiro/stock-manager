const mongoose = require('mongoose')

const dbConnection = async () => {
    try {
        await mongoose.connect('mongodb+srv://crespiramiro:gZFlwA3VzThZF2Bw.@cluster0.mob9ktw.mongodb.net/', { // URI directamente especificada aquí
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Database successfully connected');
    } catch (error) {
        throw new Error('Error initializing the DB');
    }
};

module.exports = dbConnection;
