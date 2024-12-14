// src/app.js
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const itemRoutes = require('./routes/itemRoutes');
 
const app = express();
 
// Conectar a la base de datos
connectDB();
 
// Middleware
app.use(bodyParser.json());
 
// Rutas
app.use('/api', itemRoutes);
 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));  