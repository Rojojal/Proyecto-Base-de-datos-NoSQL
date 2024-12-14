// src/app.js
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const connectDB = require('./config/db');
const itemRoutes = require('./routes/itemRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
 
const app = express();
 
// Conectar a la base de datos
connectDB();
 
// Middleware
app.use(bodyParser.json());
 

// Renderizado de vistas con EJS

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Ruta principal
app.get('/', (req, res) => {
  res.render('Usuarios/index'); 
});

// Rutas
app.use('/api', itemRoutes);
app.use('/usuarios', usuarioRoutes);
 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));  