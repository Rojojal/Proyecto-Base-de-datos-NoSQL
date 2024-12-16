// src/services/EmocionalService.js

const Emocional = require('../models/emocional');

class emocionalService {

    async createEmocional(data) {
        const nuevoEmocional = new Emocional({
            fecha: data.fecha,
            estado_animo: data.estado_animo,
            estres_nivel: data.estres_nivel,
            sugerencias_manejo_estres: data.sugerencias_manejo_estres,
        });

        try {
            await nuevoEmocional.save();
        } catch (error) {
            throw new Error('Error al insertar registro emocional: ' + error.message);
        }
    }

    // Obtener un registro emocional por ID
    async getEmocional(id) {
        return await Emocional.findById(id);
    }


    async updateEmocional(id, body) {
        try {
            const resultado = await Emocional.findByIdAndUpdate(id, {
                fecha: body.fecha,
                estado_animo: body.estado_animo,
                estres_nivel: body.estres_nivel,
                sugerencias_manejo_estres: body.sugerencias_manejo_estres,
            });
            return resultado;
        } catch (error) {
            console.log("Error al actualizar el registro emocional:", error);
        }
    }


    async deleteEmocional(id) {
        return await Emocional.findByIdAndDelete(id);
    }

 
    async getAllEmocional(queries) {
        let emocionales;
        try {
            // Filtrar por estado de ánimo, si se proporciona
            if (queries?.estado_animo) {
                queries = { estado_animo: queries.estado_animo };
                return await Emocional.find(queries);
            }

            // Filtrar por nivel de estrés, si se proporciona
            else if (queries?.estres_nivel) {
                queries = { estres_nivel: queries.estres_nivel };
                return await Emocional.find(queries);
            } else {
                emocionales = await Emocional.find({});
            }
            return emocionales;
        } catch (error) {
            throw new Error('Error al filtrar los registros emocionales: ' + error.message);
        }
    }
}

module.exports = new emocionalService();
