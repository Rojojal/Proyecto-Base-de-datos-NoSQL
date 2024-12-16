// src/controllers/RecomendacionesController.js
const { render } = require('ejs');
const RecomendacionesService = require('../services/recomendacionesService');



class RecomendacionesController {


   /** 
   * GET / 
   * Mostrar recomendaciones
  */
   async getAllRecomendaciones(req, res) {
    try {

      const recomendaciones = await RecomendacionesService.getAllRecomendaciones();
      res.render('Recomendaciones/index', { title: 'Recomendaciones', recomendaciones });
      
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  
   /** 
   * GET / 
   * Vista crear recomendaciones
  */
   async viewCreateRecomendaciones(req, res) {
    try {
      res.render('Recomendaciones/create',  { title: 'Crear recomendacion', recomendaciones: {}})
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  /** 
   * POST / 
   * Boton crear recomendaciones
  */
  async createRecomendaciones(req, res) {
    
    try {
      console.log('Datos recibidos:', req.body);
      const recomendaciones = await RecomendacionesService.createRecomendaciones(req.body);
      res.redirect('/recomendaciones');
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

/** 
  async getRecomendaciones(req, res) {
    try {
      const Recomendaciones = await RecomendacionesService.getRecomendaciones(req.params.id);
      if (!Recomendaciones) {
        return res.status(404).json({ error: 'Recomendación no encontrada' });
      }
      res.json(Recomendaciones);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
*/



/** 
   * GET / 
   * Vista actualizar recomendaciones
  */
  async viewUpdateRecomendaciones(req, res) {
    try {
      const Recomendaciones = await RecomendacionesService.getRecomendaciones(req.params.id, req.body);
      res.render('Recomendaciones/edit',  { title: 'editar recomendacion', Recomendaciones });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

/** 
   * PUT / 
   * Actualizar datos recomendaciones
  */
async updateRecomendaciones(req, res) {
  try {
    console.log(req.params.id)
    const Recomendaciones = await RecomendacionesService.updateRecomendaciones(req.params.id, req.body);
    if (!Recomendaciones) {
      return res.status(404).json({ error: 'Recomendación no encontrada' });
    }
    res.redirect('/recomendaciones');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


  async deleteRecomendaciones(req, res) {
    try {
      const Recomendaciones = await RecomendacionesService.deleteRecomendaciones(req.params.id);
      if (!Recomendaciones) {
        return res.status(404).json({ error: 'Recomendación no encontrada' });
      }
      res.json({ message: 'Recomendación eliminada' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new RecomendacionesController();
