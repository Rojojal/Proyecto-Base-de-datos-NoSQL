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
}

module.exports = new retroalimentacionService();
