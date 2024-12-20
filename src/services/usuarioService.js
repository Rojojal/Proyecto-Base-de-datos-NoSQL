// src/services/UsuariosService.js

const Usuarios = require('../models/usuario');
const bcrypt = require('bcrypt');

class UsuariosService {


    async createUsuario(data) {
        try {

            const contraseñaEncriptada = await bcrypt.hash(data.contraseña, 10)
            const nuevoUsuario = new Usuarios({
                nombre: data.nombre,
                contraseña: contraseñaEncriptada, // Encripta la contraseña
                edad: data.edad,
                genero: data.genero,
                email: data.email,
                ubicacion: data.ubicacion,
                objetivos_salud: data.objetivos_salud,
                pais: data.pais
            });


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


    async validPassword(id, contraseña) {
        try {
            console.log(id, contraseña)
            const usuario = await Usuarios.findById(id);
            if (!usuario) {
                throw new Error('Usuario no encontrado');
            }
            return await usuario.validPassword(contraseña);
        } catch (error) {
            throw new Error('Error al verificar la contraseña: ' + error.message);
        }
    }

    async getUsuarioByEmail(data) {

        try {
            // Buscar usuario en la base de datos por email
            const usuario = await Usuarios.findOne({ email });

            if (!usuario) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            // Devolver información del usuario
            return res.status(200).json(usuario);
        } catch (error) {
            console.error('Error al buscar usuario por email:', error.message);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    };




}

module.exports = new UsuariosService();
