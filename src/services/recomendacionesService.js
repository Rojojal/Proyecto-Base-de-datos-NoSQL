// src/services/RecomendacionesService.js

const Recomendaciones = require('../models/recomendaciones');

class RecomendacionesService {
    
    async createRecomendaciones(data) {
        const Recomendaciones = new Recomendaciones(data);
        await Recomendaciones.save();
        return Recomendaciones;
    }

   
    async getRecomendaciones(id) {
        return await Recomendaciones.findById(id);
    }


    async updateRecomendaciones(id, data) {
        return await Recomendaciones.findByIdAndUpdate(id, data, { new: true });
    }


    async deleteRecomendaciones(id) {
        return await Recomendaciones.findByIdAndDelete(id);
    }


    async getAllRecomendaciones(queries) {
        try {
            // Filtrar por tipo de recomendación, si se proporciona
            if (queries?.tipo_Recomendaciones) {
                queries = { tipo_Recomendaciones: queries.tipo_Recomendaciones };
                return await Recomendaciones.find(queries);
            }
            
            // Filtrar por nivel de prioridad, si se proporciona
            else if (queries?.nivel_prioridad) {
                queries = { nivel_prioridad: queries.nivel_prioridad };
                return await Recomendaciones.find(queries);
            }

            return await Recomendaciones.find(queries);
        } catch (error) {
            throw new Error('Error al filtrar las Recomendaciones: ' + error.message);
        }
    }
}

module.exports = new RecomendacionesService();
