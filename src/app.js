// src/app.js
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const connectDB = require('./config/db');
const expressLayouts = require('express-ejs-layouts'); 
const itemRoutes = require('./routes/itemRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const recomendacionRoutes = require('./routes/recomendacionesRoutes');
 



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

// Ruta principal index
app.get('/', (req, res) => {
  res.render('index', { title: 'CuidaT' }); 
});

// Rutas

app.get('/', (req, res) => {
  res.render('views/Recomendaciones/index', { title: 'Recomendaciones' }); 
});

app.use('/api', itemRoutes);
app.use('/Usuarios', usuarioRoutes);
app.use('/', recomendacionRoutes);



// Manejo de errores

app.get('*', (req, res)=> {
  res.status(404).render('views/Error/404')
});
 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));  