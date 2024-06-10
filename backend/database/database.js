require('dotenv').config(); // Agrega esta línea al principio del archivo
const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, { // Usa la variable de entorno para la cadena de conexión
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Database successfully connected');
    } catch (error) {
        throw new Error('Error initializing the DB');
    }
};

module.exports = dbConnection;