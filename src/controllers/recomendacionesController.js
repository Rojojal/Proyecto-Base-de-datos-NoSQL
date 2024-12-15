// src/controllers/RecomendacionesController.js
const { render } = require('ejs');
const RecomendacionesService = require('../services/recomendacionesService');
const Recomendaciones = require('../models/recomendaciones');


class RecomendacionesController {


  /** 
   * GET / 
   * Crear recomendaciones
  */
  async createRecomendaciones(req, res) {
    try {
      const Recomendaciones = await RecomendacionesService.createRecomendaciones(req.body);
      res.status(201).json(Recomendaciones);
      res.render('views/Recomendaciones/index')
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }


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

  async getAllRecomendaciones(req, res) {
    try {
      
      if (!Recomendaciones || Recomendaciones.length === 0) {
        return res.status(404).json({ error: 'No se encontraron Recomendaciones' });
      }
      const recomendaciones = await RecomendacionesService.getAllRecomendaciones();
      res.render('Recomendaciones/index', { title: 'Recomendaciones', recomendaciones });
      
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }


  async updateRecomendaciones(req, res) {
    try {
      const Recomendaciones = await RecomendacionesService.updateRecomendaciones(req.params.id, req.body);
      if (!Recomendaciones) {
        return res.status(404).json({ error: 'Recomendación no encontrada' });
      }
      res.json(Recomendaciones);
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
