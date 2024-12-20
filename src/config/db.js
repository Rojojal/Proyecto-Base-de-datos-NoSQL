// src/config/db.js

const mongoose = require('mongoose');
const PORT = 3000;


const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/CuidaT', {});
        console.log('MongoDB connected');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
