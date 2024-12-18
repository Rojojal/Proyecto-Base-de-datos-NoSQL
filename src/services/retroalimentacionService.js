// src/services/retroalimentacionService.js

const Retroalimentacion = require('../models/retroalimentacion');

class retroalimentacionService {


    async createRetroalimentacion(data) {
        const nuevaRetroalimentacion = new Retroalimentacion({
            fecha: data.fecha,
            tipo_feedback: data.tipo_feedback,
            comentario: data.comentario,
            valoracion: data.valoracion,
        });

        try {
            await nuevaRetroalimentacion.save();
        } catch (error) {
            throw new Error('Error al insertar retroalimentación: ' + error.message);
        }
    }


    async getRetroalimentacion(id) {
        try {
            return await Retroalimentacion.findById(id);
        } catch (error) {
            throw new Error('Error al obtener retroalimentación: ' + error.message);
        }
    }


    async updateRetroalimentacion(id, body) {
        try {
            const resultado = await Retroalimentacion.findByIdAndUpdate(
                id,
                {
                    fecha: body.fecha,
                    tipo_feedback: body.tipo_feedback,
                    comentario: body.comentario,
                    valoracion: body.valoracion,
                });

            return resultado;
        } catch (error) {
            throw new Error('Error al actualizar retroalimentación: ' + error.message);
        }
    }

 
    async deleteRetroalimentacion(id) {
        try {
            return await Retroalimentacion.findByIdAndDelete(id);
        } catch (error) {
            throw new Error('Error al eliminar retroalimentación: ' + error.message);
        }
    }

    async getAllRetroalimentaciones(queries) {
        let filtros = {};

        // Filtrar por tipo de feedback, si se proporciona
        if (queries?.tipo_feedback) {
            filtros.tipo_feedback = queries.tipo_feedback;
        }

        // Filtrar por rango de valoraciones, si se proporcionan
        if (queries?.valoracion_min && queries?.valoracion_max) {
            filtros.valoracion = { $gte: queries.valoracion_min, $lte: queries.valoracion_max };
        }

        try {
            return await Retroalimentacion.find(filtros);
        } catch (error) {
            throw new Error('Error al obtener retroalimentaciones: ' + error.message);
        }
    }

    async getAdvancedRetroalimentacion(filters) {
        let query = {};
    
        // Filtrar por tipo de retroalimentación
        if (filters.tipoFeedback) {
            query.tipo_feedback = filters.tipoFeedback;
        }
    
        // Filtrar por rango de valoraciones
        if (filters.valoracionMin && filters.valoracionMax) {
            query.valoracion = {
                $gte: filters.valoracionMin,
                $lte: filters.valoracionMax
            };
        }
    
        // Filtrar por rango de fechas
        if (filters.fechaInicio && filters.fechaFin) {
            query.fecha = {
                $gte: new Date(filters.fechaInicio),
                $lte: new Date(filters.fechaFin)
            };
        }
    
        try {
            return await Retroalimentacion.find(query);
        } catch (error) {
            throw new Error('Error en la búsqueda avanzada: ' + error.message);
        }
    }
    
    async getAdvancedSuenos(filters) {
        let query = {};
    
        // Filtrar por calidad de sueño
        if (filters.calidadSueno) {
            query.calidad_sueno = filters.calidadSueno;
        }
    
        // Filtrar por duración mínima
        if (filters.duracionMinima) {
            query.duracion_sueno = { $gte: parseInt(filters.duracionMinima) };
        }
    
        // Filtrar por rango de fechas
        if (filters.fechaInicio && filters.fechaFin) {
            query.fecha = {
                $gte: new Date(filters.fechaInicio),
                $lte: new Date(filters.fechaFin),
            };
        }
    
        try {
            return await Sueno.find(query);
        } catch (error) {
            throw new Error('Error en la búsqueda avanzada de Sueño: ' + error.message);
        }
    }
    
}

module.exports = new retroalimentacionService();
