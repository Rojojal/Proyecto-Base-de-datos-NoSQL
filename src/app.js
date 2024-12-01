// src/app.js
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const itemRoutes = require('./routes/itemRoutes');
//const path = require("path") 

const app = express();
 
//app.set('views', __dirname + '/views');


// Conectar a la base de datos
connectDB();
 
// Middleware
app.use(bodyParser.json());
 
// Rutas
app.use('/api', itemRoutes);

//app.get("/", function(req, res) {
   // res.sendFile(path.join(__dirname, 'views/index.html'));
  //}
//)


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));  