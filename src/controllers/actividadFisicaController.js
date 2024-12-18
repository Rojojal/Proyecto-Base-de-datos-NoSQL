// src/controllers/actividadFisicaController.js
const actividadFisicaService = require('../services/actividadFisicaService');

class actividadFisicaController {
  /**
   * GET /
   * Mostrar todos los registros de actividad física
   */
  async getAllActividadFisica(req, res) {
    try {
      const registros = await actividadFisicaService.getAllActividadFisica(req.query);
      res.render('ActividadFisica/index', { title: 'Registros de Actividad Física', registros });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  /**
   * GET /create
   * Vista para crear un nuevo registro de actividad física
   */
  async viewCreateActividadFisica(req, res) {
    try {
      res.render('ActividadFisica/create', { title: 'Crear Registro de Actividad Física', registro: {} });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  /**
   * POST /
   * Crear un nuevo registro de actividad física
   */
  async createActividadFisica(req, res) {
    try {
      console.log('Datos recibidos:', req.body);
      await actividadFisicaService.createActividadFisica(req.body);
      res.redirect('/actividad-fisica');
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  /**
   * GET /:id
   * Vista para editar un registro de actividad física
   */
  async viewUpdateActividadFisica(req, res) {
    try {
      const registro = await actividadFisicaService.getActividadFisica(req.params.id, req.body);
      if (!registro) {
        return res.status(404).json({ error: 'Registro de actividad física no encontrado' });
      }
      res.render('ActividadFisica/edit', { title: 'Editar Registro de Actividad Física', registro });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  /**
   * PUT /:id
   * Actualizar un registro de actividad física
   */
  async updateActividadFisica(req, res) {
    try {
      const registro = await actividadFisicaService.updateActividadFisica(req.params.id, req.body);
      if (!registro) {
        return res.status(404).json({ error: 'Registro de actividad física no encontrado' });
      }
      res.redirect('/actividad-fisica');
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  /**
   * DELETE /:id
   * Eliminar un registro de actividad física
   */
  async deleteActividadFisica(req, res) {
    try {
      const registro = await actividadFisicaService.deleteActividadFisica(req.params.id);
      if (!registro) {
        return res.status(404).json({ error: 'Registro de actividad física no encontrado' });
      }
      res.redirect('/actividad-fisica');
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async searchActividadFisica(req, res) {
    try {
        const filters = req.query;
        const resultados = await actividadFisicaService.getAdvancedActividadFisica(filters);
        res.render('ActividadFisica/index', {
            title: 'Búsqueda Avanzada de Actividad Física',
            registros: resultados
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

}

module.exports = new actividadFisicaController();
