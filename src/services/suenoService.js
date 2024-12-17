// src/services/SuenoService.js

const Sueno = require('../models/sueno');

class suenoService {


    async createSueno(data) {
        const nuevoSueno = new Sueno({
            fecha: data.fecha,
            duracion_sueno: data.duracion_sueno,
            calidad_sueno: data.calidad_sueno,
            sugerencias_descanso: data.sugerencias_descanso,
        });

        try {
            await nuevoSueno.save();
        } catch (error) {
            throw new Error('Error al insertar sueño: ' + error.message);
        }
    }


    async getSueno(id) {
        try {
            return await Sueno.findById(id);
        } catch (error) {
            throw new Error('Error al obtener sueño: ' + error.message);
        }
    }

    async updateSueno(id, body) {
        try {
            const resultado = await Sueno.findByIdAndUpdate(id, {
                fecha: body.fecha,
                duracion_sueno: body.duracion_sueno,
                calidad_sueno: body.calidad_sueno,
                sugerencias_descanso: body.sugerencias_descanso,
            }); 

            return resultado;
        } catch (error) {
            throw new Error('Error al actualizar el sueño: ' + error.message);
        }
    }

    async deleteSueno(id) {
        try {
            return await Sueno.findByIdAndDelete(id);
        } catch (error) {
            throw new Error('Error al eliminar sueño: ' + error.message);
        }
    }

    async getAllSuenos(queries) {
        let suenos;

        try {
            // Filtrar por calidad de sueño, si se proporciona
            if (queries?.calidad_sueno) {
                queries = { calidad_sueno: queries.calidad_sueno };
                return await Sueno.find(queries);
            }

            // Filtrar por duración del sueño, si se proporciona
            else if (queries?.duracion_sueno) {
                queries = { duracion_sueno: { $gte: queries.duracion_sueno } }; 
                return await Sueno.find(queries);
            } else {
                suenos = await Sueno.find({});
            }

            return suenos;
        } catch (error) {
            throw new Error('Error al filtrar los registros de sueño: ' + error.message);
        }
    }
}

module.exports = new suenoService();
