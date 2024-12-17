// src/services/UsuariosService.js

const Usuarios = require('../models/usuario');
const bcrypt = require('bcrypt');

class UsuariosService {


    async createUsuario(data) {
        const nuevoUsuario = new Usuarios({
            nombre: data.nombre,
            contraseña: await bcrypt.hash(data.contraseña, 10), // Encripta la contraseña
            edad: data.edad,
            genero: data.genero,
            email: data.email,
            ubicacion: data.ubicacion,
            objetivos_salud: data.objetivos_salud,
            pais: data.pais
        });

        try {
            await nuevoUsuario.save();
        } catch (error) {
            throw new Error('Error al insertar usuario: ' + error.message);
        }
    }

    async getUsuario(id) {
        return await Usuarios.findById(id);
    }

    async updateUsuario(id, body) {
        try {
            const resultado = await Usuarios.findByIdAndUpdate(id, {
                nombre: body.nombre,
                contraseña: body.contraseña ? await bcrypt.hash(body.contraseña, 10) : undefined,
                edad: body.edad,
                genero: body.genero,
                email: body.email,
                fecha_registro: body.fecha_registro,
                ubicacion: body.ubicacion,
                objetivos_salud: body.objetivos_salud,
                pais: body.pais
            }); 

            return resultado;
        } catch (error) {
            console.log("Error al actualizar el usuario:", error);
        }
    }


    async deleteUsuario(id) {
        return await Usuarios.findByIdAndDelete(id);
    }

s
    async getAllUsuarios(queries) {
        let usuarios;
        try {
            // Filtrar por género, si se proporciona
            if (queries?.genero) {
                queries = { genero: queries.genero };
                return await Usuarios.find(queries);
            }

            // Filtrar por país, si se proporciona
            else if (queries?.pais) {
                queries = { pais: queries.pais };
                return await Usuarios.find(queries);
            } else {
                usuarios = await Usuarios.find({});
            }

            return usuarios;
        } catch (error) {
            throw new Error('Error al filtrar los usuarios: ' + error.message);
        }
    }

    // Verificar si la contraseña es correcta
    async validPassword(usuarioId, password) {
        try {
            const usuario = await Usuarios.findById(usuarioId);
            if (!usuario) {
                throw new Error('Usuario no encontrado');
            }
            return await usuario.validPassword(password);
        } catch (error) {
            throw new Error('Error al verificar la contraseña: ' + error.message);
        }
    }
}

module.exports = new UsuariosService();
