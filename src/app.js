// src/app.js
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const connectDB = require('./config/db');
const itemRoutes = require('./routes/itemRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const expressLayouts = require('express-ejs-layouts'); 
 
const app = express();
 
// Conectar a la base de datos
connectDB();
 
// Middleware
app.use(bodyParser.json());
 

// Renderizado de vistas con EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Para el layout sea comun
app.use(expressLayouts);

app.set('layout', '_layout');  // Establece _layout como preterminado

// Para archivos como css, imagenes, js, especificamente estaticos
app.use(express.static(path.join(__dirname, 'public')));

// Ruta principal
app.get('/', (req, res) => {
  res.render('index', { title: 'CuidaT' }); 
});

// Rutas
app.use('/api', itemRoutes);
app.use('/usuarios', usuarioRoutes);
 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));  