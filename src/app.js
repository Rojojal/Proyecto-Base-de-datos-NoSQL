// src/app.js
const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
const expressLayouts = require('express-ejs-layouts'); 
const methodOverride = require('method-override');
const itemRoutes = require('./routes/itemRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const recomendacionRoutes = require('./routes/recomendacionesRoutes');
const suenoRoutes = require('./routes/suenoRoutes');
const seguimientoSaludRoutes = require('./routes/seguimientoSaludRoutes');
const retroalimentacionRoutes = require('./routes/retroalimentacionRoutes');
const recordatorioRoutes = require('./routes/recordatorioRoutes');
const logrosRoutes = require('./routes/logrosRoutes');
const historiasExitoRoutes = require('./routes/historiasExitoRoutes');
const historiasConsultasRoutes = require('./routes/historiasConsultasRoutes');
const actividadFisicaRoutes = require('./routes/actividadFisicaRoutes');
const emocionalRoutes = require('./routes/emocionalRoutes'); 
const alimentacionRoutes = require('./routes/alimentacionRoutes');

const app = express();
 
// Conectar a la base de datos
connectDB();
 
// Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
 

/** 
 * Renderizado de vistas con EJS
*/
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

/** 
 * Para poder usar el layout
 * Establece _layout como preterminado para el footer y header
*/
app.use(expressLayouts);
app.set('layout', '_layout');  

/** 
 * Para archivos como css, imagenes, js, especificamente estaticos
*/
app.use(express.static(path.join(__dirname, 'public')));

/** 
 * Ruta principal, lo primero en cargar en la pagina
*/
app.get('/', (req, res) => {
  res.render('index', { title: 'CuidaT' }); 
});

/** 
 * Rutas 
*/

app.use('/api', itemRoutes);
app.use('/Usuarios', usuarioRoutes);
app.use('/recomendaciones', recomendacionRoutes);
app.use('/sueno', suenoRoutes);
app.use('/seguimientoSalud', seguimientoSaludRoutes);
app.use('/retroalimentacion', retroalimentacionRoutes);
app.use('/recordatorio', recordatorioRoutes);
app.use('/logros', logrosRoutes);
app.use('/historiasExito', historiasExitoRoutes);
app.use('/historiasConsultas', historiasConsultasRoutes);
app.use('/emocional', emocionalRoutes); 
app.use('/alimentacion', alimentacionRoutes);
app.use('/actividadFisica', actividadFisicaRoutes);




/** 
 * Manejo de errores
*/
app.get('*', (req, res)=> {
  res.status(404).render('Error/404', { title: '404 - Pagina no Encontrada' })
});
 
app.get('*', (req, res)=> {
  res.status(500).render('Error/500', { title: '500 - Error del servidor' })
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));  