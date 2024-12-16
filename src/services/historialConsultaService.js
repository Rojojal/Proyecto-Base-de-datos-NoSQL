// src/services/historialConsultaService.js

const HistorialConsulta = require('../models/historialConsulta');

class historialConsultaService {

    async createHistorialConsulta(data) {
        const nuevoHistorial = new HistorialConsulta({
            fecha: data.fecha,
            tipo_consulta: data.tipo_consulta,
            especialista: data.especialista,
            resultado_consulta: data.resultado_consulta,
            recomendaciones: data.recomendaciones,
        });

        try {
            await nuevoHistorial.save();
        } catch (error) {
            throw new Error('Error al insertar historial de consulta: ' + error.message);
        }
    }


    async getHistorialConsulta(id) {
        return await HistorialConsulta.findById(id);
    }

    async updateHistorialConsulta(id, body) {
        try {
            const resultado = await HistorialConsulta.findByIdAndUpdate(id, {
                fecha: body.fecha,
                tipo_consulta: body.tipo_consulta,
                especialista: body.especialista,
                resultado_consulta: body.resultado_consulta,
                recomendaciones: body.recomendaciones,
            });
            return resultado;
        } catch (error) {
            console.log("Error al actualizar el historial de consulta:", error);
        }
    }


    async deleteHistorialConsulta(id) {
        return await HistorialConsulta.findByIdAndDelete(id);
    }


    async getAllHistorialConsulta(queries) {
        let historialConsultas;
        try {
            // Filtrar por tipo de consulta, si se proporciona
            if (queries?.tipo_consulta) {
                queries = { tipo_consulta: queries.tipo_consulta };
                return await HistorialConsulta.find(queries);
            }
            
            // Filtrar por especialista, si se proporciona
            else if (queries?.especialista) {
                queries = { especialista: queries.especialista };
                return await HistorialConsulta.find(queries);
            } else {
                historialConsultas = await HistorialConsulta.find({});
            }
            return historialConsultas;
        } catch (error) {
            throw new Error('Error al filtrar los historiales de consulta: ' + error.message);
        }
    }
}

module.exports = new historialConsultaService();
