// src/services/RecomendacionesService.js

const Recomendaciones = require('../models/recomendaciones');

class RecomendacionesService {
    
    async createRecomendaciones(data) {
        const nuevaRecomendacion = new Recomendaciones({
            fecha: data.fecha,
            tipo_recomendacion: data.tipo_recomendacion,
            mensaje_recomendacion: data.mensaje_recomendacion,
            nivel_prioridad: data.nivel_prioridad,
           
        });

        try {
            await nuevaRecomendacion.save();
        } catch (error) {
            throw new Error('Error al insertar recomendacion: ' + error.message)
        }
    }

   
    async getRecomendaciones(id) {
        return await Recomendaciones.findById(id);
    }


    async updateRecomendaciones(id, body) {
        try {
            const resultado = await Recomendaciones.findByIdAndUpdate(id, {
            fecha: body.fecha,
            tipo_recomendacion: body.tipo_recomendacion,
            mensaje_recomendacion: body.mensaje_recomendacion,
            nivel_prioridad: body.nivel_prioridad,
          });
      
          return resultado;
        } catch (error) {
          console.log("Error al actualizar la recomendación:", error);
        }
    }
      


    async deleteRecomendaciones(id) {
        return await Recomendaciones.findByIdAndDelete(id);
    }


    async getAllRecomendaciones(queries) {
        let recomendaciones
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
            }else {
                recomendaciones = await Recomendaciones.find({});
            }
            return recomendaciones;
        } catch (error) {
            throw new Error('Error al filtrar las Recomendaciones: ' + error.message);
        }
    }
}

module.exports = new RecomendacionesService();
